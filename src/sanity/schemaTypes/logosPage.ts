import { defineArrayMember, defineField, defineType } from "sanity";

const logoVariant = defineArrayMember({
  type: "object",
  name: "logoVariant",
  title: "Logo variant",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({
      name: "background",
      title: "Preview background",
      type: "string",
      description: "Hex background for carousel preview",
      initialValue: "#060000",
    }),
    defineField({
      name: "preview",
      title: "Preview image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "cmyk",
      title: "CMYK file",
      type: "reference",
      to: [{ type: "assetFile" }],
    }),
    defineField({
      name: "pms",
      title: "PMS file",
      type: "reference",
      to: [{ type: "assetFile" }],
    }),
    defineField({
      name: "rgb",
      title: "RGB file",
      type: "reference",
      to: [{ type: "assetFile" }],
    }),
    defineField({
      name: "png",
      title: "PNG file",
      type: "reference",
      to: [{ type: "assetFile" }],
    }),
  ],
  preview: {
    select: { title: "label", media: "preview" },
  },
});

const logoSet = defineArrayMember({
  type: "object",
  name: "logoSet",
  title: "Logo set",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "variants",
      title: "Variants",
      type: "array",
      of: [logoVariant],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});

export const logosPage = defineType({
  name: "logosPage",
  title: "Logos page",
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
      initialValue: "Logos",
    }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 4 }),
    defineField({
      name: "sets",
      title: "Logo sets",
      type: "array",
      of: [logoSet],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "brand.name" },
  },
});
