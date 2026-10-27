/**
 * Seeds 801 Brickell + Core Wynwood into Sanity.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=... NEXT_PUBLIC_SANITY_PROJECT_ID=... npm run seed
 *
 * Requires a write token with create/update permissions.
 * Binary assets are referenced as placeholders — upload real files in Studio.
 */

import { createClient } from "@sanity/client";

import { seedBundles } from "../src/data/seed-brands";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || projectId === "placeholder") {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID before seeding.");
  process.exit(1);
}

if (!token) {
  console.error("Set SANITY_API_WRITE_TOKEN before seeding.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

async function upsert(doc: Record<string, unknown>) {
  const id = String(doc._id);
  await client.createOrReplace({ ...doc, _id: id } as {
    _id: string;
    _type: string;
  });
  console.log("upsert", id);
}

async function seedBrandBundle(
  bundle: (typeof seedBundles)[number],
) {
  const brandId = `brand-${bundle.brand.slug}`;
  await upsert({
    _id: brandId,
    _type: "brand",
    name: bundle.brand.name,
    slug: { _type: "slug", current: bundle.brand.slug },
    tagline: bundle.brand.tagline,
    primaryColor: bundle.brand.primaryColor,
    accentColor: bundle.brand.accentColor,
    backgroundColor: bundle.brand.backgroundColor,
    foregroundColor: bundle.brand.foregroundColor,
    published: true,
  });

  const assetIds: string[] = [];
  for (const set of bundle.logos.sets || []) {
    for (const variant of set.variants || []) {
      for (const key of ["cmyk", "pms", "rgb", "png"] as const) {
        const asset = variant[key];
        if (!asset) continue;
        const assetDocId = `asset-${asset._id}`;
        await upsert({
          _id: assetDocId,
          _type: "assetFile",
          title: asset.title,
          brand: { _type: "reference", _ref: brandId },
          format: asset.format,
          externalUrl: asset.url && asset.url !== "#" ? asset.url : undefined,
          usageNotes:
            "Placeholder from seed. Upload the production file in Studio and clear externalUrl if needed.",
        });
        assetIds.push(assetDocId);
      }
    }
  }

  await upsert({
    _id: `logos-${bundle.brand.slug}`,
    _type: "logosPage",
    brand: { _type: "reference", _ref: brandId },
    title: bundle.logos.title,
    intro: bundle.logos.intro,
    sets: (bundle.logos.sets || []).map((set) => ({
      _type: "logoSet",
      _key: set.title.toLowerCase().replace(/\s+/g, "-"),
      title: set.title,
      description: set.description,
      variants: (set.variants || []).map((variant, i) => ({
        _type: "logoVariant",
        _key: `${set.title}-${variant.label || i}`.toLowerCase().replace(/\s+/g, "-"),
        label: variant.label,
        background: variant.background,
        cmyk: variant.cmyk
          ? { _type: "reference", _ref: `asset-${variant.cmyk._id}` }
          : undefined,
        pms: variant.pms
          ? { _type: "reference", _ref: `asset-${variant.pms._id}` }
          : undefined,
        rgb: variant.rgb
          ? { _type: "reference", _ref: `asset-${variant.rgb._id}` }
          : undefined,
        png: variant.png
          ? { _type: "reference", _ref: `asset-${variant.png._id}` }
          : undefined,
      })),
    })),
  });

  await upsert({
    _id: `colors-${bundle.brand.slug}`,
    _type: "colorsPage",
    brand: { _type: "reference", _ref: brandId },
    title: bundle.colors.title,
    intro: bundle.colors.intro,
    secondaryTitle: bundle.colors.secondaryTitle,
    secondaryIntro: bundle.colors.secondaryIntro,
    swatches: (bundle.colors.swatches || []).map((s, i) => ({
      _type: "swatch",
      _key: `swatch-${i}-${s.name}`.toLowerCase().replace(/\s+/g, "-"),
      ...s,
    })),
  });

  await upsert({
    _id: `typography-${bundle.brand.slug}`,
    _type: "typographyPage",
    brand: { _type: "reference", _ref: brandId },
    title: bundle.typography.title,
    intro: bundle.typography.intro,
    spacingNotes: bundle.typography.spacingNotes,
    families: (bundle.typography.families || []).map((family, i) => ({
      _type: "fontFamily",
      _key: `family-${i}-${family.name}`.toLowerCase().replace(/\s+/g, "-"),
      name: family.name,
      role: family.role,
      specimen: family.specimen,
      weights: (family.weights || []).map((w, wi) => ({
        _type: "fontWeight",
        _key: `weight-${wi}-${w.name}`.toLowerCase().replace(/\s+/g, "-"),
        name: w.name,
        weight: w.weight,
        style: w.style,
        fileUrl: w.url || undefined,
      })),
    })),
  });

  console.log(`Seeded ${bundle.brand.name} (${assetIds.length} asset placeholders)`);
}

async function main() {
  for (const bundle of seedBundles) {
    await seedBrandBundle(bundle);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
