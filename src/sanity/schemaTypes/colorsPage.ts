import { defineArrayMember, defineField, defineType } from "sanity";

import { HexColorInput } from "../components/hex-color-input";
import { PaletteColorInput } from "../components/palette-color-input";
import { SwatchInput } from "../components/swatch-input";

const swatch = defineArrayMember({
  type: "object",
  name: "swatch",
  title: "Swatch",
  components: { input: SwatchInput },
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
      description: "RGB and CMYK fill in from this value. You can still edit them.",
      components: { input: HexColorInput },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rgb",
      title: "RGB",
      type: "string",
      description: "Filled from HEX. Edit it if you need a different value.",
    }),
    defineField({
      name: "cmyk",
      title: "CMYK",
      type: "string",
      description: "Filled from HEX. Edit it if the print spec differs.",
    }),
    defineField({
      name: "pms",
      title: "PMS",
      type: "string",
      description: "Pantone code, entered by hand. It cannot be calculated from HEX.",
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
  fieldsets: [
    { name: "cover", title: "Cover", options: { collapsible: true } },
    { name: "primary", title: "Primary colors" },
    { name: "secondary", title: "Secondary" },
    { name: "combinations", title: "Combinations" },
    { name: "proportion", title: "Proportion" },
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
      name: "heroTitle",
      title: "Hero title",
      type: "string",
      fieldset: "cover",
      description: "Large word on the color cover.",
      initialValue: "Color",
    }),
    defineField({
      name: "statement",
      title: "Statement",
      type: "text",
      rows: 4,
      fieldset: "cover",
      description: "Large text under the color cover.",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      fieldset: "primary",
      initialValue: "Primary",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 4,
      fieldset: "primary",
    }),
    defineField({
      name: "swatches",
      title: "Colors",
      type: "array",
      fieldset: "primary",
      of: [swatch],
    }),
    defineField({
      name: "secondaryTitle",
      title: "Title",
      type: "string",
      fieldset: "secondary",
      initialValue: "Secondary",
    }),
    defineField({
      name: "secondaryIntro",
      title: "Intro",
      type: "text",
      rows: 3,
      fieldset: "secondary",
    }),
    defineField({
      name: "secondarySwatches",
      title: "Colors",
      type: "array",
      fieldset: "secondary",
      of: [swatch],
    }),
    defineField({
      name: "combinationsLabel",
      title: "Title",
      type: "string",
      fieldset: "combinations",
      initialValue: "Combinations",
    }),
    defineField({
      name: "combinationsIntro",
      title: "Intro",
      type: "text",
      rows: 3,
      fieldset: "combinations",
    }),
    defineField({
      name: "combinations",
      title: "Pairs",
      type: "array",
      fieldset: "combinations",
      of: [
        defineArrayMember({
          type: "object",
          name: "colorPair",
          title: "Pair",
          fields: [
            defineField({
              name: "outer",
              title: "Outer",
              type: "string",
              description: "Choose a color already saved in the palette.",
              components: { input: PaletteColorInput },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "inner",
              title: "Inner",
              type: "string",
              description: "Choose a color already saved in the palette.",
              components: { input: PaletteColorInput },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "outer", subtitle: "inner" },
          },
        }),
      ],
    }),
    defineField({
      name: "proportionLabel",
      title: "Title",
      type: "string",
      fieldset: "proportion",
      initialValue: "Proportion",
    }),
    defineField({
      name: "proportionIntro",
      title: "Intro",
      type: "text",
      rows: 3,
      fieldset: "proportion",
    }),
    defineField({
      name: "proportions",
      title: "Shares",
      type: "array",
      fieldset: "proportion",
      of: [
        defineArrayMember({
          type: "object",
          name: "colorShare",
          title: "Share",
          fields: [
            defineField({
              name: "hex",
              title: "Color",
              type: "string",
              description: "Choose a color already saved in the palette.",
              components: { input: PaletteColorInput },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "percent",
              title: "Percent",
              type: "number",
              validation: (Rule) => Rule.required().min(1).max(100),
            }),
          ],
          preview: {
            select: { title: "percent", subtitle: "hex" },
            prepare: ({ title, subtitle }) => ({
              title: title ? `${title}%` : "Share",
              subtitle,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "brand.name" },
  },
});
