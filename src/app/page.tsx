import Link from "next/link";

import { listPublishedBrands } from "@/lib/brand-data";
import { useSeedFallback } from "@/sanity/env";

export default async function HomePage() {
  const brands = await listPublishedBrands();
  const seeded = useSeedFallback();

  return (
    <main className="hub">
      <div className="hub__glow" aria-hidden />
      <div className="hub__content">
        <p className="eyebrow">byNativo</p>
        <h1>Brand guidelines</h1>
        <p className="lede">
          Multi-brand identity sites for agency clients — logos, color systems,
          and typography in one place.
        </p>
        {seeded ? (
          <p className="hub__hint">
            Running on local seed data. Set{" "}
            <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and run{" "}
            <code>npm run seed</code> to connect Sanity.
          </p>
        ) : null}
        <ul className="brand-list">
          {brands.map((brand) => (
            <li key={brand._id}>
              <Link href={`/b/${brand.slug}`}>
                <span className="brand-list__name">{brand.name}</span>
                {brand.tagline ? (
                  <span className="brand-list__tag">{brand.tagline}</span>
                ) : null}
                <span
                  className="brand-list__swatch"
                  style={{ background: brand.accentColor || brand.primaryColor }}
                />
              </Link>
            </li>
          ))}
        </ul>
        <p className="hub__studio">
          Editors: <Link href="/studio">Open Sanity Studio</Link>
        </p>
      </div>
    </main>
  );
}
