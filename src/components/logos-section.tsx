"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { GuideHero, GuideNoteHead } from "@/components/guide-hero";
import {
  ShareLogoModal,
  type ShareTarget,
} from "@/components/share-logo-modal";
import {
  downloadBlob,
  fileNameFromUrlOrTitle,
} from "@/lib/download-blob";
import type { DownloadAsset, LogosPage, LogoVariant } from "@/types/brand";

function scalingSrc(url: string | null | undefined, width: number) {
  if (!url) return undefined;
  const lower = url.toLowerCase();
  // Keep true vectors as-is; asking Sanity to resize SVG often rasterizes it.
  if (lower.includes(".svg") || lower.includes("/files/")) return url;
  try {
    const next = new URL(url);
    next.searchParams.set("w", String(Math.round(width * 2)));
    next.searchParams.set("q", "100");
    next.searchParams.set("fit", "max");
    return next.toString();
  } catch {
    return url;
  }
}

const formats = [
  {
    key: "cmyk" as const,
    label: "Vector (CMYK)",
    badge: "Hi Res",
    badgeTone: "hi" as const,
  },
  {
    key: "pms" as const,
    label: "Vector (PANTONE)",
    badge: "Hi Res",
    badgeTone: "hi" as const,
  },
  {
    key: "rgb" as const,
    label: "Vector (RGB)",
    badge: "Hi Res",
    badgeTone: "hi" as const,
  },
  {
    key: "png" as const,
    label: "PNG (HEX)",
    badge: "Low Res",
    badgeTone: "lo" as const,
  },
];

export function LogosSection({
  page,
  brandName,
  heroMark,
  heroKicker,
}: {
  page: LogosPage;
  brandName?: string;
  heroMark?: string;
  heroKicker?: string;
}) {
  const [shareTarget, setShareTarget] = useState<ShareTarget | null>(null);

  return (
    <div className="guide-page">
      <GuideHero
        mark={heroMark}
        kicker={heroKicker}
        title={page.title || "Logos"}
        statement={page.intro}
      />
      <div className="guide-page__body">
        {(page.sets || []).map((set) => (
          <LogoSetCarousel
            key={set.title}
            title={set.title}
            description={set.description}
            variants={set.variants || []}
            onShare={(asset, formatLabel) =>
              setShareTarget({
                assetId: asset._id,
                title: asset.title,
                formatLabel,
              })
            }
          />
        ))}

        {page.brandMarkLabel || page.brandMarkIntro || page.brandMarkImageUrl ? (
          <section className="guide-note">
            <GuideNoteHead
              title={page.brandMarkLabel || "Brand Mark"}
              intro={page.brandMarkIntro}
            />
            {page.brandMarkImageUrl ? (
              <div
                className="logo-mark guide-note__content"
                style={{ background: page.brandMarkBackground || "#fff" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={page.brandMarkImageUrl}
                  alt={page.brandMarkLabel || "Brand mark"}
                />
              </div>
            ) : null}
          </section>
        ) : null}

        {page.scalingLabel || page.scalingIntro || page.scalingImageUrl ? (
          <section className="guide-note">
            <GuideNoteHead
              title={page.scalingLabel || "Scaling"}
              intro={page.scalingIntro}
            />
            {page.scalingImageUrl ? (
              <div className="logo-scaling guide-note__content">
                {[120, 260, 480].map((width) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={width}
                    className="logo-scaling__item"
                    src={scalingSrc(page.scalingImageUrl, width)}
                    alt=""
                    width={width}
                    style={{ width }}
                  />
                ))}
              </div>
            ) : null}
          </section>
        ) : null}
      </div>
      <ShareLogoModal
        open={Boolean(shareTarget)}
        target={shareTarget}
        brandName={brandName}
        onClose={() => setShareTarget(null)}
      />
    </div>
  );
}

function LogoSetCarousel({
  title,
  description,
  variants,
  onShare,
}: {
  title: string;
  description?: string;
  variants: LogoVariant[];
  onShare: (asset: DownloadAsset, formatLabel: string) => void;
}) {
  const items = variants || [];
  const [index, setIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState<(typeof formats)[number]["key"]>("cmyk");
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");
  const active = items[index];

  if (!active) return null;

  const selectedFormat = formats.find((f) => f.key === selectedKey) || formats[0];
  const selectedAsset = active[selectedKey];
  const canDownload = Boolean(selectedAsset?.url && selectedAsset.url !== "#");

  async function onDownload() {
    if (!selectedAsset?.url || selectedAsset.url === "#") return;
    setDownloading(true);
    setDownloadError("");
    try {
      await downloadBlob(
        selectedAsset.url,
        fileNameFromUrlOrTitle(selectedAsset.url, selectedAsset.title),
      );
    } catch {
      // Fallback: open in new tab if CORS blocks blob fetch
      window.open(selectedAsset.url, "_blank", "noopener,noreferrer");
      setDownloadError("Opened in a new tab (direct download blocked by the host).");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <section className="guide-note logo-set">
      <GuideNoteHead title={title} intro={description} />

      <div className="logo-set__grid guide-note__content">
        <div
          className="logo-stage"
          style={{ background: active.background || "#111" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${title}-${index}-${active.previewUrl || active.label || "variant"}`}
              className="logo-stage__panel"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.28 }}
            >
              {active.previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="logo-stage__image"
                  src={active.previewUrl}
                  alt={active.label || title}
                />
              ) : (
                <span className="logo-stage__label">
                  {active.label || "Variant"}
                </span>
              )}
            </motion.div>
          </AnimatePresence>
          <div className="logo-stage__controls">
            <button
              type="button"
              aria-label="Previous logo"
              onClick={() => {
                setIndex((i) => (i - 1 + items.length) % items.length);
                setSelectedKey("cmyk");
                setDownloadError("");
              }}
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next logo"
              onClick={() => {
                setIndex((i) => (i + 1) % items.length);
                setSelectedKey("cmyk");
                setDownloadError("");
              }}
            >
              →
            </button>
          </div>
        </div>

        <div className="logo-files">
          <h3 className="logo-files__title">{title} files</h3>
          <div className="logo-format-list" role="radiogroup" aria-label="File format">
            {formats.map((f) => {
              const asset = active[f.key];
              const disabled = !asset;
              const checked = selectedKey === f.key;
              return (
                <div
                  key={f.key}
                  className={
                    disabled
                      ? "logo-format-row is-disabled"
                      : "logo-format-row"
                  }
                >
                  <label className="logo-format-row__main">
                    <input
                      type="radio"
                      name={`format-${title}`}
                      value={f.key}
                      disabled={disabled}
                      checked={checked}
                      onChange={() => {
                        setSelectedKey(f.key);
                        setDownloadError("");
                      }}
                    />
                    <span className="logo-format-row__label">{f.label}</span>
                    <span
                      className={
                        f.badgeTone === "hi"
                          ? "logo-badge logo-badge--hi"
                          : "logo-badge logo-badge--lo"
                      }
                    >
                      {f.badge}
                    </span>
                  </label>
                  <button
                    type="button"
                    className="logo-format-row__share"
                    disabled={disabled || !asset}
                    aria-label={`Share ${f.label}`}
                    title="Share logo file"
                    onClick={() => {
                      if (!asset) return;
                      onShare(asset, f.label);
                    }}
                  >
                    <ShareIcon />
                  </button>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className="btn logo-files__download"
            disabled={!canDownload || downloading}
            onClick={() => void onDownload()}
          >
            {downloading
              ? "Downloading…"
              : canDownload
                ? "Download"
                : "Publish logo files in Studio to download"}
          </button>
          {selectedAsset && canDownload ? (
            <p className="logo-files__hint">
              Selected: {selectedFormat.label} · {selectedAsset.title}
            </p>
          ) : null}
          {downloadError ? (
            <p className="form-msg">{downloadError}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M5 20h14v-2H5v2zm7-18-5.5 5.5 1.42 1.42L11 6.84V16h2V6.84l3.08 3.08 1.42-1.42L12 2z"
      />
    </svg>
  );
}
