import { defineArrayMember, defineField, defineType } from "sanity";

const swatch = defineArrayMember({
  type: "object",
  name: "swatch",
  title: "Swatch",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hex",
      title: "HEX",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "rgb", title: "RGB", type: "string" }),
    defineField({ name: "cmyk", title: "CMYK", type: "string" }),
    defineField({ name: "pms", title: "PMS", type: "string" }),
    defineField({
      name: "group",
      title: "Group",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
        ],
      },
      initialValue: "primary",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "hex" },
  },
});

export const colorsPage = defineType({
  name: "colorsPage",
  title: "Colors page",
  type: "document",
  fields: [
    defineField({
      name: "brand",
      title: "Brand",
      type: "reference",
      to: [{ type: "brand" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Colors",
    }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 4 }),
    defineField({
      name: "secondaryTitle",
      title: "Secondary section title",
      type: "string",
    }),
    defineField({
      name: "secondaryIntro",
      title: "Secondary section intro",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "swatches",
      title: "Swatches",
      type: "array",
      of: [swatch],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "brand.name" },
  },
});
