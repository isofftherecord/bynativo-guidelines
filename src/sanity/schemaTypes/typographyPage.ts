import { defineArrayMember, defineField, defineType } from "sanity";

const fontWeight = defineArrayMember({
  type: "object",
  name: "fontWeight",
  title: "Font weight",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "weight",
      title: "CSS weight",
      type: "number",
      initialValue: 400,
    }),
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      options: {
        list: [
          { title: "Normal", value: "normal" },
          { title: "Italic", value: "italic" },
        ],
      },
      initialValue: "normal",
    }),
    defineField({
      name: "file",
      title: "Font file",
      type: "file",
      options: { accept: ".ttf,.otf,.woff,.woff2" },
    }),
    defineField({
      name: "fileUrl",
      title: "Font URL (fallback)",
      type: "url",
    }),
  ],
});

const fontFamily = defineArrayMember({
  type: "object",
  name: "fontFamily",
  title: "Font family",
  fields: [
    defineField({
      name: "name",
      title: "Family name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Mono", value: "mono" },
        ],
      },
      initialValue: "primary",
    }),
    defineField({
      name: "specimen",
      title: "Specimen text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "weights",
      title: "Weights",
      type: "array",
      of: [fontWeight],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role" },
  },
});

export const typographyPage = defineType({
  name: "typographyPage",
  title: "Typography page",
  type: "document",
  fields: [
    defineField({
      name: "brand",
      title: "Brand",
      type: "reference",
      to: [{ type: "brand" }],
      hidden: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Typography",
    }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 4 }),
    defineField({
      name: "spacingNotes",
      title: "Spacing notes",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "families",
      title: "Font families",
      type: "array",
      of: [fontFamily],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "brand.name" },
  },
});
