import Link from "next/link";
import { notFound } from "next/navigation";

import { BrandNav } from "@/components/brand-nav";
import { getBrand } from "@/lib/brand-data";

export default async function BrandHomePage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand: slug } = await params;
  const brand = await getBrand(slug);
  if (!brand) notFound();

  return (
    <>
      <BrandNav brandSlug={brand.slug} brandName={brand.name} active="logos" />
      <main className="brand-home">
        <p className="eyebrow">Brand guidelines</p>
        <h1>{brand.name}</h1>
        {brand.tagline ? <p className="lede">{brand.tagline}</p> : null}
        <div className="cta-row">
          <Link className="btn" href={`/b/${brand.slug}/logos`}>
            Logos
          </Link>
          <Link className="btn btn--ghost" href={`/b/${brand.slug}/colors`}>
            Colors
          </Link>
          <Link className="btn btn--ghost" href={`/b/${brand.slug}/typography`}>
            Typography
          </Link>
        </div>
      </main>
    </>
  );
}
