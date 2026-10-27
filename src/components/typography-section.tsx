"use client";

import { useMemo, useState } from "react";

import type { TypographyPage } from "@/types/brand";

export function TypographySection({ page }: { page: TypographyPage }) {
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
    <div className="section-stack">
      <header className="section-hero">
        <h1>{page.title || "Typography"}</h1>
        {page.intro ? <p>{page.intro}</p> : null}
      </header>

      <div className="type-tester">
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
      </div>

      {page.spacingNotes ? (
        <p className="section-note">{page.spacingNotes}</p>
      ) : null}

      <div className="family-list">
        {families.map((f) => (
          <article key={f.name} className="family-card">
            <h2 style={{ fontFamily: `"${f.name}", system-ui, sans-serif` }}>
              {f.name}
            </h2>
            <p>{f.role}</p>
            <ul>
              {(f.weights || []).map((w) => (
                <li key={`${f.name}-${w.name}`}>
                  {w.name}
                  {w.weight ? ` · ${w.weight}` : ""}
                  {w.style === "italic" ? " italic" : ""}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
