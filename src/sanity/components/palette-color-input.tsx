"use client";

import { useEffect, useMemo, useState } from "react";
import { Flex, Select, Stack, Text } from "@sanity/ui";
import {
  set,
  unset,
  useClient,
  useFormValue,
  type StringInputProps,
} from "sanity";

type PaletteSwatch = {
  _key?: string;
  name?: string;
  hex?: string;
};

type BrandRef = {
  _ref?: string;
};

function hexKey(value: string) {
  const cleaned = value.trim().toUpperCase();
  const short = cleaned.match(/^#([0-9A-F])([0-9A-F])([0-9A-F])$/);
  if (short) return `#${short[1]}${short[1]}${short[2]}${short[2]}${short[3]}${short[3]}`;
  return cleaned;
}

function readSwatches(value: unknown): PaletteSwatch[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const swatches: PaletteSwatch[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const swatch = item as PaletteSwatch;
    if (typeof swatch.hex !== "string" || !swatch.hex.trim()) continue;
    const key = hexKey(swatch.hex);
    if (seen.has(key)) continue;
    seen.add(key);
    swatches.push(swatch);
  }
  return swatches;
}

function optionLabel(swatch: PaletteSwatch) {
  if (swatch.name) return `${swatch.name} (${swatch.hex})`;
  return swatch.hex || "";
}

export function PaletteColorInput(props: StringInputProps) {
  const client = useClient({ apiVersion: "2025-01-01" });
  const localPrimary = readSwatches(useFormValue(["swatches"]));
  const localSecondary = readSwatches(useFormValue(["secondarySwatches"]));
  const brand = useFormValue(["brand"]) as BrandRef | undefined;
  const [remotePrimary, setRemotePrimary] = useState<PaletteSwatch[]>([]);
  const [remoteSecondary, setRemoteSecondary] = useState<PaletteSwatch[]>([]);

  const hasLocal = localPrimary.length > 0 || localSecondary.length > 0;

  useEffect(() => {
    if (hasLocal || !brand?._ref) {
      setRemotePrimary([]);
      setRemoteSecondary([]);
      return;
    }

    let cancelled = false;
    client
      .fetch(
        `*[_type == "colorsPage" && brand._ref == $brandId][0]{
          swatches[]{ _key, name, hex, group },
          secondarySwatches[]{ _key, name, hex }
        }`,
        { brandId: brand._ref },
      )
      .then((doc) => {
        if (cancelled || !doc) return;
        const primary = readSwatches(
          (doc.swatches || []).filter(
            (item: PaletteSwatch & { group?: string }) =>
              item.group !== "secondary",
          ),
        );
        const secondary = [
          ...readSwatches(doc.secondarySwatches),
          ...readSwatches(
            (doc.swatches || []).filter(
              (item: PaletteSwatch & { group?: string }) =>
                item.group === "secondary",
            ),
          ),
        ];
        setRemotePrimary(primary);
        setRemoteSecondary(
          secondary.filter(
            (swatch) =>
              !primary.some(
                (item) => hexKey(item.hex || "") === hexKey(swatch.hex || ""),
              ),
          ),
        );
      })
      .catch(() => {
        if (!cancelled) {
          setRemotePrimary([]);
          setRemoteSecondary([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [brand?._ref, client, hasLocal]);

  const primary = hasLocal ? localPrimary : remotePrimary;
  const secondary = useMemo(
    () =>
      (hasLocal ? localSecondary : remoteSecondary).filter(
        (swatch) =>
          !primary.some(
            (item) => hexKey(item.hex || "") === hexKey(swatch.hex || ""),
          ),
      ),
    [hasLocal, localSecondary, primary, remoteSecondary],
  );
  const options = [...primary, ...secondary];
  const current = typeof props.value === "string" ? props.value : "";
  const currentKey = current ? hexKey(current) : "";
  const selected = options.find((swatch) => hexKey(swatch.hex || "") === currentKey);
  const selectValue = selected?.hex || "";

  return (
    <Stack gap={2}>
      {options.length === 0 ? (
        <Text size={1} muted>
          Add colors in the brand Colors page first.
        </Text>
      ) : (
        <Flex align="center" gap={2}>
          <span
            aria-hidden
            style={{
              width: 28,
              height: 28,
              flex: "0 0 28px",
              borderRadius: 4,
              background: selected?.hex || "#ffffff",
              border: "1px solid var(--card-border-color, #ccc)",
            }}
          />
          <div style={{ flex: 1 }}>
            <Select
              fontSize={1}
              padding={3}
              value={selectValue}
              onChange={(event) => {
                const next = event.currentTarget.value;
                props.onChange(next ? set(next) : unset());
              }}
            >
              <option value="">Select a color…</option>
              {primary.length ? (
                <optgroup label="Primary colors">
                  {primary.map((swatch) => (
                    <option key={swatch._key || swatch.hex} value={swatch.hex}>
                      {optionLabel(swatch)}
                    </option>
                  ))}
                </optgroup>
              ) : null}
              {secondary.length ? (
                <optgroup label="Secondary">
                  {secondary.map((swatch) => (
                    <option key={swatch._key || swatch.hex} value={swatch.hex}>
                      {optionLabel(swatch)}
                    </option>
                  ))}
                </optgroup>
              ) : null}
            </Select>
          </div>
        </Flex>
      )}
      {current && !selected ? (
        <Text size={1} muted>
          Current value {current} is not in the saved palette. Choose a color from the list.
        </Text>
      ) : null}
    </Stack>
  );
}
