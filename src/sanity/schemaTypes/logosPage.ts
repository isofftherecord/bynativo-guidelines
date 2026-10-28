import { defineArrayMember, defineField, defineType } from "sanity";

import { PaletteColorInput } from "../components/palette-color-input";

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
      description: "Choose a color already saved in the brand Colors page.",
      components: { input: PaletteColorInput },
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
      description: "Create files under Brand → Files so the brand is set automatically.",
    }),
    defineField({
      name: "pms",
      title: "PMS file",
      type: "reference",
      to: [{ type: "assetFile" }],
      description: "Create files under Brand → Files so the brand is set automatically.",
    }),
    defineField({
      name: "rgb",
      title: "RGB file",
      type: "reference",
      to: [{ type: "assetFile" }],
      description: "Create files under Brand → Files so the brand is set automatically.",
    }),
    defineField({
      name: "png",
      title: "PNG file",
      type: "reference",
      to: [{ type: "assetFile" }],
      description: "Create files under Brand → Files so the brand is set automatically.",
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
  fieldsets: [
    { name: "cover", title: "Cover", options: { collapsible: true } },
    { name: "sets", title: "Logo sets" },
    { name: "brandMark", title: "Brand Mark" },
    { name: "scaling", title: "Scaling" },
  ],
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
      fieldset: "cover",
      initialValue: "Logos",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 4,
      fieldset: "cover",
    }),
    defineField({
      name: "sets",
      title: "Sets",
      type: "array",
      fieldset: "sets",
      of: [logoSet],
    }),
    defineField({
      name: "brandMarkLabel",
      title: "Title",
      type: "string",
      fieldset: "brandMark",
      initialValue: "Brand Mark",
    }),
    defineField({
      name: "brandMarkIntro",
      title: "Intro",
      type: "text",
      rows: 3,
      fieldset: "brandMark",
    }),
    defineField({
      name: "brandMarkImage",
      title: "Image",
      type: "image",
      fieldset: "brandMark",
      options: { hotspot: true },
    }),
    defineField({
      name: "brandMarkBackground",
      title: "Background",
      type: "string",
      fieldset: "brandMark",
      components: { input: PaletteColorInput },
      initialValue: "#FFFFFF",
    }),
    defineField({
      name: "scalingLabel",
      title: "Title",
      type: "string",
      fieldset: "scaling",
      initialValue: "Scaling",
    }),
    defineField({
      name: "scalingIntro",
      title: "Intro",
      type: "text",
      rows: 4,
      fieldset: "scaling",
    }),
    defineField({
      name: "scalingImage",
      title: "Image",
      type: "image",
      fieldset: "scaling",
      description: "Shown at small, medium, and large sizes.",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "brand.name" },
  },
});
