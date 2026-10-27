import type {
  BrandSummary,
  ColorsPage,
  LogosPage,
  TypographyPage,
} from "@/types/brand";

type SeedBrandBundle = {
  brand: BrandSummary;
  logos: LogosPage;
  colors: ColorsPage;
  typography: TypographyPage;
};

const coreLogos: LogosPage = {
  title: "Logos",
  intro:
    "Our primary lockups are designed for clarity across print and digital. Choose the format that matches your production workflow.",
  sets: [
    {
      title: "Primary lockup",
      description: "Horizontal wordmark for most applications.",
      variants: [
        {
          label: "Black",
          background: "#CECAC7",
          cmyk: {
            _id: "seed-core-logo-h-black-cmyk",
            title: "Core Horizontal Black CMYK",
            format: "cmyk",
            url: "#",
          },
          rgb: {
            _id: "seed-core-logo-h-black-rgb",
            title: "Core Horizontal Black RGB",
            format: "rgb",
            url: "#",
          },
          png: {
            _id: "seed-core-logo-h-black-png",
            title: "Core Horizontal Black PNG",
            format: "png",
            url: "#",
          },
        },
        {
          label: "White",
          background: "#060000",
          cmyk: {
            _id: "seed-core-logo-h-white-cmyk",
            title: "Core Horizontal White CMYK",
            format: "cmyk",
            url: "#",
          },
          rgb: {
            _id: "seed-core-logo-h-white-rgb",
            title: "Core Horizontal White RGB",
            format: "rgb",
            url: "#",
          },
          png: {
            _id: "seed-core-logo-h-white-png",
            title: "Core Horizontal White PNG",
            format: "png",
            url: "#",
          },
        },
        {
          label: "Ash",
          background: "#060000",
          cmyk: {
            _id: "seed-core-logo-h-ash-cmyk",
            title: "Core Horizontal Ash CMYK",
            format: "cmyk",
            url: "#",
          },
          rgb: {
            _id: "seed-core-logo-h-ash-rgb",
            title: "Core Horizontal Ash RGB",
            format: "rgb",
            url: "#",
          },
          png: {
            _id: "seed-core-logo-h-ash-png",
            title: "Core Horizontal Ash PNG",
            format: "png",
            url: "#",
          },
        },
      ],
    },
    {
      title: "Alternative lockup",
      description: "Use when vertical space is constrained or stacked layouts fit better.",
      variants: [
        {
          label: "Black",
          background: "#CECAC7",
          png: {
            _id: "seed-core-logo-v-black-png",
            title: "Core Vertical Black PNG",
            format: "png",
            url: "#",
          },
        },
        {
          label: "White",
          background: "#060000",
          png: {
            _id: "seed-core-logo-v-white-png",
            title: "Core Vertical White PNG",
            format: "png",
            url: "#",
          },
        },
      ],
    },
  ],
};

const coreColors: ColorsPage = {
  title: "Colors",
  intro:
    "Our primary brand colors reflect the industrial texture of Wynwood — ash, rich black, and a sharp lime accent.",
  secondaryTitle: "Supporting tones",
  secondaryIntro: "Use supporting whites and neutrals for large surfaces and UI chrome.",
  swatches: [
    {
      name: "Ash Gray",
      hex: "#CECAC7",
      rgb: "206, 202, 199",
      cmyk: "0, 2, 3, 19",
      group: "primary",
    },
    {
      name: "Rich Black",
      hex: "#060000",
      rgb: "6, 0, 0",
      cmyk: "0, 100, 100, 98",
      group: "primary",
    },
    {
      name: "Lime",
      hex: "#B6FF1A",
      rgb: "182, 255, 26",
      cmyk: "29, 0, 90, 0",
      group: "primary",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      rgb: "255, 255, 255",
      cmyk: "0, 0, 0, 0",
      group: "secondary",
    },
  ],
};

const coreTypography: TypographyPage = {
  title: "Typography",
  intro:
    "Core Wynwood pairs a condensed display face with a clean humanist sans for body and UI.",
  spacingNotes: "Keep generous line-height on display sizes; tighten tracking only on all-caps labels.",
  families: [
    {
      name: "Bison",
      role: "primary",
      specimen: "Core Wynwood — built for the neighborhood.",
      weights: [
        { name: "Bold", weight: 700, style: "normal" },
        { name: "Regular", weight: 400, style: "normal" },
      ],
    },
    {
      name: "Lato",
      role: "secondary",
      specimen:
        "Our primary brand colors reflect the industrial texture of the neighborhood while staying sharp in digital environments.",
      weights: [
        { name: "Regular", weight: 400, style: "normal" },
        { name: "Bold", weight: 700, style: "normal" },
        { name: "Italic", weight: 400, style: "italic" },
      ],
    },
  ],
};

const brickellLogos: LogosPage = {
  title: "Logos",
  intro:
    "801 Brickell logo files are available in CMYK, PMS, RGB, and PNG. Select the format that matches your production needs.",
  sets: [
    {
      title: "Horizontal",
      description: "Primary lockup for signage, decks, and web headers.",
      variants: [
        {
          label: "Black",
          background: "#F2F2F2",
          cmyk: {
            _id: "seed-801-h-black-cmyk",
            title: "801 Horizontal Black CMYK",
            format: "cmyk",
            url: "#",
          },
          pms: {
            _id: "seed-801-h-black-pms",
            title: "801 Horizontal Black PMS",
            format: "pms",
            url: "#",
          },
          rgb: {
            _id: "seed-801-h-black-rgb",
            title: "801 Horizontal Black RGB",
            format: "rgb",
            url: "#",
          },
          png: {
            _id: "seed-801-h-black-png",
            title: "801 Horizontal Black PNG",
            format: "png",
            url: "#",
          },
        },
        {
          label: "Grey",
          background: "#111111",
          png: {
            _id: "seed-801-h-grey-png",
            title: "801 Horizontal Grey PNG",
            format: "png",
            url: "#",
          },
        },
        {
          label: "White",
          background: "#111111",
          png: {
            _id: "seed-801-h-white-png",
            title: "801 Horizontal White PNG",
            format: "png",
            url: "#",
          },
        },
      ],
    },
    {
      title: "Vertical",
      description: "Stacked mark for square and portrait applications.",
      variants: [
        {
          label: "Black",
          background: "#F2F2F2",
          png: {
            _id: "seed-801-v-black-png",
            title: "801 Vertical Black PNG",
            format: "png",
            url: "#",
          },
        },
        {
          label: "White",
          background: "#111111",
          png: {
            _id: "seed-801-v-white-png",
            title: "801 Vertical White PNG",
            format: "png",
            url: "#",
          },
        },
      ],
    },
  ],
};

const brickellColors: ColorsPage = {
  title: "Colors",
  intro: "A restrained palette built for Miami Brickell — black, cool grey, and bright accent moments.",
  secondaryTitle: "Neutrals",
  secondaryIntro: "Use neutrals for large fields and supporting UI.",
  swatches: [
    {
      name: "Brickell Black",
      hex: "#111111",
      rgb: "17, 17, 17",
      cmyk: "0, 0, 0, 93",
      group: "primary",
    },
    {
      name: "Cool Grey",
      hex: "#8A8A8A",
      rgb: "138, 138, 138",
      cmyk: "0, 0, 0, 46",
      pms: "Cool Gray 5 C",
      group: "primary",
    },
    {
      name: "Signal Blue",
      hex: "#3834FF",
      rgb: "56, 52, 255",
      cmyk: "78, 80, 0, 0",
      group: "primary",
    },
    {
      name: "Paper",
      hex: "#F5F5F5",
      rgb: "245, 245, 245",
      cmyk: "0, 0, 0, 4",
      group: "secondary",
    },
  ],
};

const brickellTypography: TypographyPage = {
  title: "Typography",
  intro: "Kanit carries headlines; IBM Plex Sans supports body and interface text.",
  spacingNotes: "Prefer open tracking on small caps labels; keep body at 1.45–1.6 line-height.",
  families: [
    {
      name: "Kanit",
      role: "primary",
      specimen: "801 Brickell — address as identity.",
      weights: [
        { name: "Light", weight: 300, style: "normal" },
        { name: "Regular", weight: 400, style: "normal" },
        { name: "SemiBold", weight: 600, style: "normal" },
        { name: "Bold", weight: 700, style: "normal" },
      ],
    },
    {
      name: "IBM Plex Sans",
      role: "secondary",
      specimen:
        "Clear wayfinding, hospitality, and digital experiences share one typographic system.",
      weights: [
        { name: "Regular", weight: 400, style: "normal" },
        { name: "Medium", weight: 500, style: "normal" },
        { name: "Bold", weight: 700, style: "normal" },
      ],
    },
    {
      name: "IBM Plex Mono",
      role: "mono",
      specimen: "HEX · RGB · CMYK · PMS",
      weights: [{ name: "Regular", weight: 400, style: "normal" }],
    },
  ],
};

export const seedBundles: SeedBrandBundle[] = [
  {
    brand: {
      _id: "seed-brand-801",
      name: "801 Brickell",
      slug: "801",
      tagline: "Address as identity",
      primaryColor: "#111111",
      accentColor: "#3834FF",
      backgroundColor: "#FFFFFF",
      foregroundColor: "#111111",
    },
    logos: brickellLogos,
    colors: brickellColors,
    typography: brickellTypography,
  },
  {
    brand: {
      _id: "seed-brand-core",
      name: "Core Wynwood",
      slug: "core-wynwood",
      tagline: "Industrial sharpness for Wynwood",
      primaryColor: "#060000",
      accentColor: "#B6FF1A",
      backgroundColor: "#CECAC7",
      foregroundColor: "#060000",
    },
    logos: coreLogos,
    colors: coreColors,
    typography: coreTypography,
  },
];

export function getSeedBrands(): BrandSummary[] {
  return seedBundles.map((b) => b.brand);
}

export function getSeedBrand(slug: string): SeedBrandBundle | undefined {
  return seedBundles.find((b) => b.brand.slug === slug);
}

export function getSeedAsset(id: string) {
  for (const bundle of seedBundles) {
    for (const set of bundle.logos.sets || []) {
      for (const variant of set.variants || []) {
        for (const key of ["cmyk", "pms", "rgb", "png"] as const) {
          const asset = variant[key];
          if (asset?._id === id) {
            return { ...asset, brandSlug: bundle.brand.slug };
          }
        }
      }
    }
  }
  return null;
}
