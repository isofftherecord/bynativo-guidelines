export type BrandSummary = {
  _id: string;
  name: string;
  slug: string;
  tagline?: string;
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
};

export type ColorSwatch = {
  name: string;
  hex: string;
  rgb?: string;
  cmyk?: string;
  pms?: string;
  group?: "primary" | "secondary" | string;
};

export type ColorsPage = {
  title?: string;
  intro?: string;
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
