import { defineQuery } from "next-sanity";

export const brandsQuery = defineQuery(`
  *[_type == "brand" && published == true] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    tagline,
    heroMark,
    heroKicker,
    primaryColor,
    accentColor,
    backgroundColor,
    foregroundColor,
    logo
  }
`);

export const brandBySlugQuery = defineQuery(`
  *[_type == "brand" && slug.current == $slug && published == true][0] {
    _id,
    name,
    "slug": slug.current,
    tagline,
    heroMark,
    heroKicker,
    primaryColor,
    accentColor,
    backgroundColor,
    foregroundColor,
    logo
  }
`);

export const logosPageByBrandQuery = defineQuery(`
  *[_type == "logosPage" && brand->slug.current == $slug][0] {
    title,
    intro,
    sets[] {
      title,
      description,
      variants[] {
        label,
        background,
        "previewUrl": preview.asset->url,
        "cmyk": cmyk->{ _id, title, format, "url": coalesce(externalUrl, file.asset->url) },
        "pms": pms->{ _id, title, format, "url": coalesce(externalUrl, file.asset->url) },
        "rgb": rgb->{ _id, title, format, "url": coalesce(externalUrl, file.asset->url) },
        "png": png->{ _id, title, format, "url": coalesce(externalUrl, file.asset->url) }
      }
    },
    brandMarkLabel,
    brandMarkIntro,
    "brandMarkImageUrl": brandMarkImage.asset->url,
    brandMarkBackground,
    scalingLabel,
    scalingIntro,
    "scalingImageUrl": scalingImage.asset->url
  }
`);

export const colorsPageByBrandQuery = defineQuery(`
  *[_type == "colorsPage" && brand->slug.current == $slug][0] {
    title,
    intro,
    heroTitle,
    statement,
    proportionLabel,
    proportionIntro,
    proportions[] { hex, percent },
    combinationsLabel,
    combinationsIntro,
    combinations[] { outer, inner },
    secondaryTitle,
    secondaryIntro,
    "swatches": coalesce(swatches, [])[coalesce(group, "primary") != "secondary"]{
      name, hex, rgb, cmyk, pms, "group": "primary"
    } + coalesce(secondarySwatches, [])[]{
      name, hex, rgb, cmyk, pms, "group": "secondary"
    } + coalesce(swatches, [])[group == "secondary"]{
      name, hex, rgb, cmyk, pms, "group": "secondary"
    }
  }
`);

export const typographyPageByBrandQuery = defineQuery(`
  *[_type == "typographyPage" && brand->slug.current == $slug][0] {
    title,
    intro,
    spacingNotes,
    families[] {
      name,
      role,
      specimen,
      weights[] {
        name,
        weight,
        style,
        "url": coalesce(fileUrl, file.asset->url)
      }
    }
  }
`);

export const assetByIdQuery = defineQuery(`
  *[_type == "assetFile" && _id == $id][0] {
    _id,
    title,
    format,
    usageNotes,
    "url": coalesce(externalUrl, file.asset->url),
    "brandSlug": brand->slug.current
  }
`);
