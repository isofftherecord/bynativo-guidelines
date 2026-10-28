import type { Template } from "sanity";

const scoped = [
  { id: "logos-by-brand", title: "Logos page", schemaType: "logosPage" },
  { id: "colors-by-brand", title: "Colors page", schemaType: "colorsPage" },
  {
    id: "typography-by-brand",
    title: "Typography page",
    schemaType: "typographyPage",
  },
  { id: "files-by-brand", title: "Asset file", schemaType: "assetFile" },
] as const;

export const brandTemplates: Template<{ brandId: string }>[] = scoped.map(
  (template) => ({
    id: template.id,
    title: template.title,
    schemaType: template.schemaType,
    parameters: [{ name: "brandId", type: "string" }],
    value: (params: { brandId: string }) => ({
      brand: { _type: "reference", _ref: params.brandId },
    }),
  }),
);
