"use client";

import { CopyButton } from "@/components/copy-button";
import { GuideHero, GuideNoteHead } from "@/components/guide-hero";
import type { ColorsPage } from "@/types/brand";

function isDark(hex: string, cutoff = 140) {
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
  return (r * 299 + g * 587 + b * 114) / 1000 < cutoff;
}

function ink(hex: string) {
  return isDark(hex, 186) ? "#fff" : "#161616";
}

function SwatchCard({
  swatch,
}: {
  swatch: { name: string; hex: string; rgb?: string; cmyk?: string; pms?: string };
}) {
  return (
    <article
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
  );
}

export function ColorsSection({
  page,
  heroMark,
  heroKicker,
}: {
  page: ColorsPage;
  heroMark?: string;
  heroKicker?: string;
}) {
  const primary = (page.swatches || []).filter(
    (s) => !s.group || s.group === "primary",
  );
  const secondary = (page.swatches || []).filter((s) => s.group === "secondary");
  const proportions = page.proportions || [];
  const combinations = page.combinations || [];
  return (
    <div className="guide-page">
      <GuideHero
        mark={heroMark}
        kicker={heroKicker}
        title={page.heroTitle || "Color"}
        statement={page.statement || page.intro}
      />

      <div className="guide-page__body">
        {primary.length ? (
          <section className="guide-note">
            <GuideNoteHead
              title={page.title || "Primary"}
              intro={
                page.intro && page.intro !== page.statement ? page.intro : undefined
              }
            />
            <div className="swatch-grid guide-note__content">
              {primary.map((swatch) => (
                <SwatchCard key={`${swatch.name}-${swatch.hex}`} swatch={swatch} />
              ))}
            </div>
          </section>
        ) : null}

        {secondary.length ? (
          <section className="guide-note">
            <GuideNoteHead
              title={page.secondaryTitle || "Secondary"}
              intro={page.secondaryIntro}
            />
            <div className="swatch-grid guide-note__content">
              {secondary.map((swatch) => (
                <SwatchCard key={`${swatch.name}-${swatch.hex}`} swatch={swatch} />
              ))}
            </div>
          </section>
        ) : null}

        {combinations.length ? (
          <section className="guide-note">
            <GuideNoteHead
              title={page.combinationsLabel || "Combinations"}
              intro={page.combinationsIntro}
            />
            <ul className="color-combos">
              {combinations.map((pair, index) => (
                <li
                  key={`${pair.outer}-${pair.inner}-${index}`}
                  style={{ background: pair.outer }}
                >
                  <span style={{ background: pair.inner }} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {proportions.length ? (
          <section className="guide-note">
            <GuideNoteHead
              title={page.proportionLabel || "Proportion"}
              intro={page.proportionIntro}
            />
            <div
              className="color-bar"
              role="img"
              aria-label={proportions
                .map((item) => `${item.percent}% ${item.hex}`)
                .join(", ")}
            >
              {proportions.map((item) => (
                <div
                  key={`${item.hex}-${item.percent}`}
                  className="color-bar__slice"
                  style={{
                    flexGrow: item.percent,
                    background: item.hex,
                    color: ink(item.hex),
                  }}
                >
                  <span>{item.percent}%</span>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
