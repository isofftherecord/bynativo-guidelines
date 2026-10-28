import type { StructureBuilder, StructureResolver } from "sanity/structure";

import { apiVersion } from "./env";

const singletons = [
  {
    title: "Logos",
    schemaType: "logosPage",
    templateId: "logos-by-brand",
    idPrefix: "logos",
  },
  {
    title: "Colors",
    schemaType: "colorsPage",
    templateId: "colors-by-brand",
    idPrefix: "colors",
  },
  {
    title: "Typography",
    schemaType: "typographyPage",
    templateId: "typography-by-brand",
    idPrefix: "typography",
  },
] as const;

type SanityClientLike = {
  fetch: <T>(query: string, params?: Record<string, unknown>) => Promise<T>;
};

async function singletonDocument(
  S: StructureBuilder,
  client: SanityClientLike,
  brandId: string,
  brandSlug: string | null,
  section: (typeof singletons)[number],
) {
  const existingId = await client.fetch<string | null>(
    `*[_type == $type && brand._ref == $brandId][0]._id`,
    { type: section.schemaType, brandId },
  );
  const documentId = existingId
    ? existingId.replace(/^drafts\./, "")
    : `${section.idPrefix}-${brandSlug || brandId}`;

  return S.document()
    .schemaType(section.schemaType)
    .documentId(documentId)
    .title(section.title)
    .initialValueTemplate(section.templateId, { brandId });
}

export const structure: StructureResolver = (S, context) =>
  S.documentTypeList("brand")
    .title("Brands")
    .child(async (documentId) => {
      const brandId = documentId.replace(/^drafts\./, "");
      const client = context.getClient({ apiVersion });
      const brand = await client.fetch<{
        name: string | null;
        slug: string | null;
      } | null>(`*[_id == $id || _id == $draftId][0]{ name, "slug": slug.current }`, {
        id: brandId,
        draftId: `drafts.${brandId}`,
      });

      const singletonItems = await Promise.all(
        singletons.map(async (section) =>
          S.listItem()
            .id(section.schemaType)
            .title(section.title)
            .schemaType(section.schemaType)
            .child(
              await singletonDocument(
                S,
                client,
                brandId,
                brand?.slug ?? null,
                section,
              ),
            ),
        ),
      );

      return S.list()
        .title(brand?.name || "Brand")
        .items([
          S.listItem()
            .id("settings")
            .title("Settings")
            .schemaType("brand")
            .child(S.document().schemaType("brand").documentId(brandId)),
          S.divider(),
          ...singletonItems,
          S.listItem()
            .id("assetFile")
            .title("Files")
            .schemaType("assetFile")
            .child(
              S.documentList()
                .id(`${brandId}-assetFile`)
                .title("Files")
                .schemaType("assetFile")
                .filter('_type == "assetFile" && brand._ref == $brandId')
                .params({ brandId })
                .initialValueTemplates([
                  S.initialValueTemplateItem("files-by-brand", { brandId }),
                ]),
            ),
        ]);
    });
