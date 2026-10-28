export type BrandSummary = {
  _id: string;
  name: string;
  slug: string;
  tagline?: string;
  heroMark?: string;
  heroKicker?: string;
  primaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  foregroundColor?: string;
  logo?: unknown;
};

export type DownloadAsset = {
  _id: string;
  title: string;
  format?: string;
  url?: string | null;
};

export type LogoVariant = {
  label?: string;
  background?: string;
  preview?: unknown;
  previewUrl?: string | null;
  cmyk?: DownloadAsset | null;
  pms?: DownloadAsset | null;
  rgb?: DownloadAsset | null;
  png?: DownloadAsset | null;
};

export type LogoSet = {
  title: string;
  description?: string;
  variants?: LogoVariant[];
};

export type LogosPage = {
  title?: string;
  intro?: string;
  sets?: LogoSet[];
  brandMarkLabel?: string;
  brandMarkIntro?: string;
  brandMarkImageUrl?: string | null;
  brandMarkBackground?: string;
  scalingLabel?: string;
  scalingIntro?: string;
  scalingImageUrl?: string | null;
};

export type ColorSwatch = {
  name: string;
  hex: string;
  rgb?: string;
  cmyk?: string;
  pms?: string;
  group?: "primary" | "secondary" | string;
};

export type ColorShare = {
  hex: string;
  percent: number;
};

export type ColorPair = {
  outer: string;
  inner: string;
};

export type ColorsPage = {
  title?: string;
  intro?: string;
  heroTitle?: string;
  statement?: string;
  proportionLabel?: string;
  proportionIntro?: string;
  proportions?: ColorShare[];
  combinationsLabel?: string;
  combinationsIntro?: string;
  combinations?: ColorPair[];
  secondaryTitle?: string;
  secondaryIntro?: string;
  swatches?: ColorSwatch[];
};

export type FontWeight = {
  name: string;
  weight?: number;
  style?: string;
  url?: string | null;
};

export type FontFamily = {
  name: string;
  role?: string;
  specimen?: string;
  weights?: FontWeight[];
};

export type TypographyPage = {
  title?: string;
  intro?: string;
  spacingNotes?: string;
  families?: FontFamily[];
};
