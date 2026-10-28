import { defineField, defineType } from "sanity";

export const assetFile = defineType({
  name: "assetFile",
  title: "Asset file",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "reference",
      to: [{ type: "brand" }],
      description: "Required. If this appears empty, pick the brand before publishing.",
      // Keep visible when empty so create-from-reference drafts can be fixed.
      hidden: ({ value }) => Boolean(value),
      validation: (Rule) => Rule.required().error("Choose the brand for this file"),
    }),
    defineField({
      name: "file",
      title: "File",
      type: "file",
      options: { accept: ".ai,.eps,.pdf,.zip,.png,.svg,.ttf,.otf,.woff,.woff2" },
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
      description: "Optional fallback when file lives outside Sanity (CDN/R2).",
    }),
    defineField({
      name: "format",
      title: "Format label",
      type: "string",
      options: {
        list: [
          { title: "CMYK", value: "cmyk" },
          { title: "PMS", value: "pms" },
          { title: "RGB", value: "rgb" },
          { title: "PNG", value: "png" },
          { title: "SVG", value: "svg" },
          { title: "Font", value: "font" },
          { title: "ZIP", value: "zip" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "usageNotes",
      title: "Usage notes",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "format" },
  },
});
