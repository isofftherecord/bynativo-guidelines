"use client";

import { CopyButton } from "@/components/copy-button";
import type { ColorsPage } from "@/types/brand";

function isDark(hex: string) {
  const cleaned = hex.replace("#", "");
  const full =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((c) => c + c)
          .join("")
      : cleaned;
  if (full.length !== 6) return false;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 140;
}

export function ColorsSection({ page }: { page: ColorsPage }) {
  const primary = (page.swatches || []).filter(
    (s) => !s.group || s.group === "primary",
  );
  const secondary = (page.swatches || []).filter((s) => s.group === "secondary");

  return (
    <div className="section-stack">
      <header className="section-hero">
        <h1>{page.title || "Colors"}</h1>
        {page.intro ? <p>{page.intro}</p> : null}
      </header>
      <div className="swatch-grid">
        {primary.map((swatch) => (
          <article
            key={`${swatch.name}-${swatch.hex}`}
            className="swatch"
            style={{
              background: swatch.hex,
              color: isDark(swatch.hex) ? "#fff" : "#111",
            }}
          >
            <h3>{swatch.name}</h3>
            <dl>
              <div>
                <dt>HEX</dt>
                <dd>
                  {swatch.hex} <CopyButton value={swatch.hex} label="Copy" />
                </dd>
              </div>
              {swatch.rgb ? (
                <div>
                  <dt>RGB</dt>
                  <dd>{swatch.rgb}</dd>
                </div>
              ) : null}
              {swatch.cmyk ? (
                <div>
                  <dt>CMYK</dt>
                  <dd>{swatch.cmyk}</dd>
                </div>
              ) : null}
              {swatch.pms ? (
                <div>
                  <dt>PMS</dt>
                  <dd>{swatch.pms}</dd>
                </div>
              ) : null}
            </dl>
          </article>
        ))}
      </div>
      {secondary.length ? (
        <section className="section-block">
          <h2>{page.secondaryTitle || "Supporting"}</h2>
          {page.secondaryIntro ? <p>{page.secondaryIntro}</p> : null}
          <div className="swatch-grid swatch-grid--compact">
            {secondary.map((swatch) => (
              <article
                key={`${swatch.name}-${swatch.hex}`}
                className="swatch"
                style={{
                  background: swatch.hex,
                  color: isDark(swatch.hex) ? "#fff" : "#111",
                }}
              >
                <h3>{swatch.name}</h3>
                <p>
                  {swatch.hex} <CopyButton value={swatch.hex} />
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
