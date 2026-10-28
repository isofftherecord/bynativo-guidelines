import { notFound } from "next/navigation";

import { BrandNav } from "@/components/brand-nav";
import { ColorsSection } from "@/components/colors-section";
import { getBrand, getColorsPage } from "@/lib/brand-data";

export default async function ColorsRoute({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand: slug } = await params;
  const [brand, page] = await Promise.all([
    getBrand(slug),
    getColorsPage(slug),
  ]);
  if (!brand || !page) notFound();

  return (
    <>
      <BrandNav brandSlug={brand.slug} brandName={brand.name} active="colors" />
      <main>
        <ColorsSection
          page={page}
          heroMark={brand.heroMark || brand.name.slice(0, 2).toUpperCase()}
          heroKicker={brand.heroKicker}
        />
      </main>
    </>
  );
}
