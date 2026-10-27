import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Brands")
        .schemaType("brand")
        .child(S.documentTypeList("brand").title("Brands")),
      S.divider(),
      S.listItem()
        .title("Logos pages")
        .schemaType("logosPage")
        .child(S.documentTypeList("logosPage").title("Logos pages")),
      S.listItem()
        .title("Colors pages")
        .schemaType("colorsPage")
        .child(S.documentTypeList("colorsPage").title("Colors pages")),
      S.listItem()
        .title("Typography pages")
        .schemaType("typographyPage")
        .child(S.documentTypeList("typographyPage").title("Typography pages")),
      S.listItem()
        .title("Asset files")
        .schemaType("assetFile")
        .child(S.documentTypeList("assetFile").title("Asset files")),
    ]);
