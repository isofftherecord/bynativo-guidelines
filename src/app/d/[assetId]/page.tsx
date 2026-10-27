import { notFound } from "next/navigation";

import { DownloadClient } from "@/components/download-client";
import { getAsset } from "@/lib/brand-data";

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ assetId: string }>;
}) {
  const { assetId } = await params;
  const asset = await getAsset(decodeURIComponent(assetId));
  if (!asset?.url || asset.url === "#") notFound();

  return (
    <main className="download-page">
      <p className="eyebrow">byNativo</p>
      <h1>Preparing download</h1>
      <p className="lede">{asset.title}</p>
      <DownloadClient url={asset.url} title={asset.title} />
    </main>
  );
}
