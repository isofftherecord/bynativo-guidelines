import { notFound } from "next/navigation";

import { getBrand } from "@/lib/brand-data";

export default async function BrandLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ brand: string }>;
}) {
  const { brand: slug } = await params;
  const brand = await getBrand(slug);
  if (!brand) notFound();

  const style = {
    ["--brand-bg" as string]: brand.backgroundColor || "#ffffff",
    ["--brand-fg" as string]: brand.foregroundColor || "#111111",
    ["--brand-primary" as string]: brand.primaryColor || "#111111",
    ["--brand-accent" as string]: brand.accentColor || "#3834FF",
  };

  return (
    <div className="brand-shell" style={style}>
      {children}
    </div>
  );
}
