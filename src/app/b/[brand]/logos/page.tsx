import { notFound } from "next/navigation";

import { BrandNav } from "@/components/brand-nav";
import { LogosSection } from "@/components/logos-section";
import { getBrand, getLogosPage } from "@/lib/brand-data";

export default async function LogosPage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand: slug } = await params;
  const [brand, page] = await Promise.all([getBrand(slug), getLogosPage(slug)]);
  if (!brand || !page) notFound();

  return (
    <>
      <BrandNav brandSlug={brand.slug} brandName={brand.name} active="logos" />
      <main>
        <LogosSection
          page={page}
          brandName={brand.name}
          heroMark={brand.heroMark || brand.name.slice(0, 2).toUpperCase()}
          heroKicker={brand.heroKicker}
        />
      </main>
    </>
  );
}
