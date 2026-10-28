import { defineField, defineType } from "sanity";

import { HexColorInput } from "../components/hex-color-input";

export const brand = defineType({
  name: "brand",
  title: "Brand",
  type: "document",
  fieldsets: [
    { name: "cover", title: "Cover", options: { collapsible: true } },
    { name: "colors", title: "Colors", options: { collapsible: true } },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Brand mark",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroMark",
      title: "Hero mark",
      type: "string",
      fieldset: "cover",
      description:
        "Small label at the top left of every page cover, e.g. S2.",
    }),
    defineField({
      name: "heroKicker",
      title: "Hero kicker",
      type: "string",
      fieldset: "cover",
      description:
        "Small label at the top right of every page cover, e.g. Brand Guidelines.",
      initialValue: "Brand Guidelines",
    }),
    defineField({
      name: "primaryColor",
      title: "Primary color",
      type: "string",
      fieldset: "colors",
      components: { input: HexColorInput },
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/).warning(
          "Use a hex color like #060000",
        ),
    }),
    defineField({
      name: "accentColor",
      title: "Accent color",
      type: "string",
      fieldset: "colors",
      components: { input: HexColorInput },
      description: "Used for page covers and accent UI across the guidelines.",
    }),
    defineField({
      name: "backgroundColor",
      title: "Background color",
      type: "string",
      fieldset: "colors",
      components: { input: HexColorInput },
      initialValue: "#FFFFFF",
    }),
    defineField({
      name: "foregroundColor",
      title: "Foreground color",
      type: "string",
      fieldset: "colors",
      components: { input: HexColorInput },
      initialValue: "#060000",
    }),
    defineField({
      name: "customDomain",
      title: "Custom domain (phase 2)",
      type: "string",
      description: "e.g. guidelines.801brickell.com",
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "slug.current", media: "logo" },
  },
});
