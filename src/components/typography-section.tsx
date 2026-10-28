"use client";

import { useEffect, useMemo, useState } from "react";

import { GuideHero, GuideNoteHead } from "@/components/guide-hero";
import { downloadBlob } from "@/lib/download-blob";
import type { FontFamily, FontWeight, TypographyPage } from "@/types/brand";

import "./type-specimen.css";

const SPECIMEN_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

function canDownload(weight?: FontWeight | null) {
  return Boolean(weight?.url && weight.url !== "#");
}

function fontFormat(url: string) {
  const lower = url.toLowerCase();
  if (lower.includes(".woff2")) return "woff2";
  if (lower.includes(".woff")) return "woff";
  if (lower.includes(".otf")) return "opentype";
  if (lower.includes(".ttf")) return "truetype";
  return "woff2";
}

function useBrandFontFaces(families: FontFamily[]) {
  useEffect(() => {
    const rules = families.flatMap((family) =>
      (family.weights || [])
        .filter((weight) => canDownload(weight))
        .map((weight) => {
          const format = fontFormat(weight.url || "");
          return `@font-face{font-family:${JSON.stringify(family.name)};src:url(${JSON.stringify(weight.url)}) format(${JSON.stringify(format)});font-weight:${weight.weight || 400};font-style:${weight.style === "italic" ? "italic" : "normal"};font-display:swap;}`;
        }),
    );
    if (!rules.length) return;
    const style = document.createElement("style");
    style.setAttribute("data-brand-fonts", "true");
    style.textContent = rules.join("");
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, [families]);
}

function fontFileName(familyName: string, weight: FontWeight) {
  const weightLabel = weight.name.replace(/(\.[a-z0-9]+)$/i, "").trim();
  const base = `${familyName}-${weightLabel}`
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  let ext = "";
  try {
    const path = decodeURIComponent(new URL(weight.url || "").pathname);
    const match = path.match(/(\.[a-z0-9]+)$/i);
    if (match) ext = match[1].toLowerCase();
  } catch {
    /* ignore */
  }
  if (!ext) {
    const fromName = weight.name.match(/(\.[a-z0-9]+)$/i);
    ext = fromName ? fromName[1].toLowerCase() : ".woff2";
  }
  return `${base || familyName || "font"}${ext}`;
}

async function downloadFont(familyName: string, weight: FontWeight) {
  if (!weight.url || weight.url === "#") return;
  try {
    await downloadBlob(weight.url, fontFileName(familyName, weight));
  } catch {
    window.open(weight.url, "_blank", "noopener,noreferrer");
  }
}

function FontDownloadButton({
  familyName,
  weight,
  className,
}: {
  familyName: string;
  weight: FontWeight;
  className?: string;
}) {
  const [downloading, setDownloading] = useState(false);
  const available = canDownload(weight);

  return (
    <button
      type="button"
      className={className || "btn"}
      disabled={!available || downloading}
      onClick={() => {
        if (!available) return;
        setDownloading(true);
        void downloadFont(familyName, weight).finally(() => setDownloading(false));
      }}
    >
      {downloading
        ? "Downloading…"
        : available
          ? "Download"
          : "Download unavailable"}
    </button>
  );
}

export function TypographySection({
  page,
  heroMark,
  heroKicker,
}: {
  page: TypographyPage;
  heroMark?: string;
  heroKicker?: string;
}) {
  const families = page.families || [];
  const [familyIndex, setFamilyIndex] = useState(0);
  const [weightIndex, setWeightIndex] = useState(0);
  const [fontSize, setFontSize] = useState(56);
  const [lineHeight, setLineHeight] = useState(1.15);
  const [text, setText] = useState(
    families[0]?.specimen || "The quick brown fox jumps over the lazy dog.",
  );

  const family = families[familyIndex];
  const weight = family?.weights?.[weightIndex] || family?.weights?.[0];
  const specimens = families.filter(
    (item) => (item.specimen && item.specimen.trim()) || (item.weights || []).length,
  );

  useBrandFontFaces(families);

  const faceStyle = useMemo(
    () => ({
      fontFamily: `"${family?.name || "sans-serif"}", system-ui, sans-serif`,
      fontWeight: weight?.weight || 400,
      fontStyle: (weight?.style as "normal" | "italic") || "normal",
      fontSize: `${fontSize}px`,
      lineHeight,
    }),
    [family?.name, weight, fontSize, lineHeight],
  );

  return (
    <div className="guide-page">
      <GuideHero
        mark={heroMark}
        kicker={heroKicker}
        title={page.title || "Typography"}
        statement={page.intro}
      />

      <div className="guide-page__body">
        <section className="guide-note">
          <GuideNoteHead
            title="Type tester"
            intro="Try the brand typefaces at different sizes and weights."
          />
          <div className="type-tester guide-note__content">
            <div className="type-tester__controls">
              <label>
                Family
                <select
                  value={familyIndex}
                  onChange={(e) => {
                    setFamilyIndex(Number(e.target.value));
                    setWeightIndex(0);
                    const next = families[Number(e.target.value)];
                    if (next?.specimen) setText(next.specimen);
                  }}
                >
                  {families.map((f, i) => (
                    <option key={f.name} value={i}>
                      {f.name} ({f.role || "type"})
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Weight
                <select
                  value={weightIndex}
                  onChange={(e) => setWeightIndex(Number(e.target.value))}
                >
                  {(family?.weights || []).map((w, i) => (
                    <option key={`${w.name}-${i}`} value={i}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Size {fontSize}px
                <input
                  type="range"
                  min={16}
                  max={120}
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                />
              </label>
              <label>
                Line height {lineHeight.toFixed(2)}
                <input
                  type="range"
                  min={0.9}
                  max={2}
                  step={0.05}
                  value={lineHeight}
                  onChange={(e) => setLineHeight(Number(e.target.value))}
                />
              </label>
            </div>
            <div
              className="type-tester__canvas"
              contentEditable
              suppressContentEditableWarning
              style={faceStyle}
              onBlur={(e) => setText(e.currentTarget.textContent || "")}
            >
              {text}
            </div>
            {family && weight ? (
              <div className="type-tester__download">
                <FontDownloadButton familyName={family.name} weight={weight} />
                {canDownload(weight) ? (
                  <p className="type-tester__hint">
                    Selected: {family.name} · {weight.name}
                  </p>
                ) : (
                  <p className="type-tester__hint">
                    Upload this font file in Studio to enable download.
                  </p>
                )}
              </div>
            ) : null}
          </div>
        </section>

        {page.spacingNotes ? (
          <section className="guide-note">
            <GuideNoteHead title="Spacing" intro={page.spacingNotes} />
          </section>
        ) : null}

        {families.length ? (
          <section className="guide-note">
            <GuideNoteHead
              title="Families"
              intro="Approved typefaces and the weights available for each."
            />
            <div className="family-list guide-note__content">
              {families.map((f) => (
                <FamilyCard key={f.name} family={f} />
              ))}
            </div>
          </section>
        ) : null}

        {specimens.length ? (
          <section className="guide-note">
            <GuideNoteHead
              title="Specimen"
              intro="Character grid for each approved typeface."
            />
            <div className="type-specimen-list guide-note__content">
              {specimens.map((item) => {
                const primaryWeight =
                  item.weights?.find((w) => (w.weight || 0) >= 600) ||
                  item.weights?.find((w) => w.style !== "italic") ||
                  item.weights?.[0];
                return (
                  <article key={item.name} className="type-specimen">
                    <div className="type-specimen__meta">
                      <h3>{item.name}</h3>
                      {item.role ? <p>{item.role}</p> : null}
                    </div>
                    <div
                      className="type-specimen__grid"
                      role="img"
                      aria-label={`${item.name} character specimen A to Z and 0 to 9`}
                      style={{
                        fontFamily: `"${item.name}", system-ui, sans-serif`,
                        fontWeight: primaryWeight?.weight || 700,
                        fontStyle:
                          primaryWeight?.style === "italic" ? "italic" : "normal",
                      }}
                    >
                      {SPECIMEN_CHARS.map((char) => (
                        <span key={`${item.name}-${char}`}>{char}</span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}

function FamilyCard({ family }: { family: FontFamily }) {
  return (
    <article className="family-card">
      <h2 style={{ fontFamily: `"${family.name}", system-ui, sans-serif` }}>
        {family.name}
      </h2>
      <p>{family.role}</p>
      <ul className="family-card__weights">
        {(family.weights || []).map((w) => (
          <li key={`${family.name}-${w.name}`}>
            <span>
              {w.name}
              {w.weight ? ` · ${w.weight}` : ""}
              {w.style === "italic" ? " italic" : ""}
            </span>
            <FontDownloadButton
              familyName={family.name}
              weight={w}
              className="btn btn--ghost family-card__download"
            />
          </li>
        ))}
      </ul>
    </article>
  );
}
