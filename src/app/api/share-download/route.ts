import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import { getAsset } from "@/lib/brand-data";

const bodySchema = z.object({
  email: z.string().email(),
  assetId: z.string().min(1),
  brandName: z.string().optional(),
});

const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(key: string, limit = 8, windowMs = 60_000) {
  const now = Date.now();
  const current = hits.get(key);
  if (!current || current.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (current.count >= limit) return false;
  current.count += 1;
  return true;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Try again shortly." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email or asset" }, { status: 400 });
  }

  const { email, assetId, brandName } = parsed.data;
  const asset = await getAsset(assetId);
  if (!asset?.url || asset.url === "#") {
    return NextResponse.json(
      { error: "Asset not available for sharing yet" },
      { status: 404 },
    );
  }

  const origin = new URL(request.url).origin;
  // Same pattern as legacy mail.php → files.php intermediary
  const downloadPage = `${origin}/d/${encodeURIComponent(assetId)}`;
  const title = asset.title || "Brand asset";
  const brand = brandName || "byNativo";
  const subject = brand;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || "byNativo <onboarding@resend.dev>";

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[share-download] dry-run", {
        email,
        assetId,
        downloadPage,
        fileUrl: asset.url,
      });
      return NextResponse.json({
        ok: true,
        dryRun: true,
        downloadPage,
        message: "RESEND_API_KEY missing — logged only in development",
      });
    }
    return NextResponse.json(
      { error: "Email service is not configured" },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: email,
    subject,
    html: `
      <html>
        <head><title>Share logo file</title></head>
        <body>
          <p>You’ve just received the logo files for ${brand} from byNativo.
          Click the link below to download the assets. Enjoy
          <a href="${downloadPage}">Download file</a></p>
        </body>
      </html>
    `,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message || "Failed to send email" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, title });
}
