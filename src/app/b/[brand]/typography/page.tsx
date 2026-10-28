import { notFound } from "next/navigation";

import { BrandNav } from "@/components/brand-nav";
import { TypographySection } from "@/components/typography-section";
import { getBrand, getTypographyPage } from "@/lib/brand-data";

export default async function TypographyRoute({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand: slug } = await params;
  const [brand, page] = await Promise.all([
    getBrand(slug),
    getTypographyPage(slug),
  ]);
  if (!brand || !page) notFound();

  return (
    <>
      <BrandNav
        brandSlug={brand.slug}
        brandName={brand.name}
        active="typography"
      />
      <main>
        <TypographySection
          page={page}
          heroMark={brand.heroMark || brand.name.slice(0, 2).toUpperCase()}
          heroKicker={brand.heroKicker}
        />
      </main>
    </>
  );
}
