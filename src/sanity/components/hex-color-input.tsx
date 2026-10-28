"use client";

import { Flex } from "@sanity/ui";
import { set, unset, type StringInputProps } from "sanity";

function toPickerValue(value: string) {
  if (/^#[0-9A-Fa-f]{6}$/.test(value)) return value;
  const short = value.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
  if (short) return `#${short[1]}${short[1]}${short[2]}${short[2]}${short[3]}${short[3]}`;
  return "#000000";
}

export function HexColorInput(props: StringInputProps) {
  const current = typeof props.value === "string" ? props.value.trim() : "";

  return (
    <Flex align="center" gap={2}>
      <input
        type="color"
        aria-label={props.schemaType.title || "Color"}
        value={toPickerValue(current)}
        onChange={(event) => {
          const next = event.currentTarget.value;
          props.onChange(next ? set(next) : unset());
        }}
        style={{
          width: 36,
          height: 36,
          padding: 0,
          border: "1px solid var(--card-border-color, #ccc)",
          borderRadius: 4,
          background: "transparent",
          cursor: "pointer",
        }}
      />
      <div style={{ flex: 1 }}>{props.renderDefault(props)}</div>
    </Flex>
  );
}
