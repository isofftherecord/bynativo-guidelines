import {
  getSeedBrand,
  getSeedBrands,
  getSeedAsset,
} from "@/data/seed-brands";
import { client } from "@/sanity/lib/client";
import {
  assetByIdQuery,
  brandBySlugQuery,
  brandsQuery,
  colorsPageByBrandQuery,
  logosPageByBrandQuery,
  typographyPageByBrandQuery,
} from "@/sanity/lib/queries";
import { useSeedFallback } from "@/sanity/env";
import type {
  BrandSummary,
  ColorsPage,
  LogosPage,
  TypographyPage,
} from "@/types/brand";

export async function listPublishedBrands(): Promise<BrandSummary[]> {
  if (useSeedFallback()) return getSeedBrands();
  try {
    return await client.fetch(brandsQuery);
  } catch {
    return getSeedBrands();
  }
}

export async function getBrand(slug: string): Promise<BrandSummary | null> {
  if (useSeedFallback()) return getSeedBrand(slug)?.brand ?? null;
  try {
    const brand = await client.fetch(brandBySlugQuery, { slug });
    return brand ?? getSeedBrand(slug)?.brand ?? null;
  } catch {
    return getSeedBrand(slug)?.brand ?? null;
  }
}

export async function getLogosPage(slug: string): Promise<LogosPage | null> {
  if (useSeedFallback()) return getSeedBrand(slug)?.logos ?? null;
  try {
    const page = await client.fetch(logosPageByBrandQuery, { slug });
    return page ?? getSeedBrand(slug)?.logos ?? null;
  } catch {
    return getSeedBrand(slug)?.logos ?? null;
  }
}

export async function getColorsPage(slug: string): Promise<ColorsPage | null> {
  if (useSeedFallback()) return getSeedBrand(slug)?.colors ?? null;
  try {
    const page = await client.fetch(colorsPageByBrandQuery, { slug });
    return page ?? getSeedBrand(slug)?.colors ?? null;
  } catch {
    return getSeedBrand(slug)?.colors ?? null;
  }
}

export async function getTypographyPage(
  slug: string,
): Promise<TypographyPage | null> {
  if (useSeedFallback()) return getSeedBrand(slug)?.typography ?? null;
  try {
    const page = await client.fetch(typographyPageByBrandQuery, { slug });
    return page ?? getSeedBrand(slug)?.typography ?? null;
  } catch {
    return getSeedBrand(slug)?.typography ?? null;
  }
}

export async function getAsset(id: string) {
  if (id.startsWith("seed-") || useSeedFallback()) {
    return getSeedAsset(id);
  }
  try {
    return await client.fetch(assetByIdQuery, { id });
  } catch {
    return getSeedAsset(id);
  }
}
