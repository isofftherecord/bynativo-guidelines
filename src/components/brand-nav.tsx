import Link from "next/link";

const links = [
  { href: "logos", label: "Logos" },
  { href: "colors", label: "Colors" },
  { href: "typography", label: "Typography" },
] as const;

export function BrandNav({
  brandSlug,
  brandName,
  active,
}: {
  brandSlug: string;
  brandName: string;
  active: "logos" | "colors" | "typography";
}) {
  return (
    <header className="brand-nav">
      <div className="brand-nav__inner">
        <Link href="/" className="brand-nav__home">
          byNativo
        </Link>
        <Link href={`/b/${brandSlug}`} className="brand-nav__brand">
          {brandName}
        </Link>
        <nav className="brand-nav__links" aria-label="Brand sections">
          {links.map((link) => (
            <Link
              key={link.href}
              href={`/b/${brandSlug}/${link.href}`}
              className={
                active === link.href
                  ? "brand-nav__link is-active"
                  : "brand-nav__link"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
