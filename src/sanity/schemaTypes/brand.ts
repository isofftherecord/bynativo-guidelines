import { defineField, defineType } from "sanity";

export const brand = defineType({
  name: "brand",
  title: "Brand",
  type: "document",
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
      name: "primaryColor",
      title: "Primary color",
      type: "string",
      description: "Hex, e.g. #060000",
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/).warning(
          "Use a hex color like #060000",
        ),
    }),
    defineField({
      name: "accentColor",
      title: "Accent color",
      type: "string",
    }),
    defineField({
      name: "backgroundColor",
      title: "Background color",
      type: "string",
      initialValue: "#FFFFFF",
    }),
    defineField({
      name: "foregroundColor",
      title: "Foreground color",
      type: "string",
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
