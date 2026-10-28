"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  FormCallbacksProvider,
  PatchEvent,
  set,
  useFormCallbacks,
  type ObjectInputProps,
} from "sanity";

import { colorValuesFromHex } from "../lib/color-values";

function isHexSet(patch: { type: string; path: readonly unknown[] }) {
  return patch.type === "set" && patch.path.length === 1 && patch.path[0] === "hex";
}

type SwatchValue = {
  hex?: string;
  rgb?: string;
  cmyk?: string;
};

export function SwatchInput(props: ObjectInputProps) {
  const callbacks = useFormCallbacks();
  const value = props.value as SwatchValue | undefined;
  const filledKey = useRef<string | null>(null);

  const onChange = useCallback(
    (event: PatchEvent) => {
      const patches = PatchEvent.from(event).patches;
      const hexPatch = patches.find(isHexSet);
      const derived =
        hexPatch && "value" in hexPatch && typeof hexPatch.value === "string"
          ? colorValuesFromHex(hexPatch.value)
          : null;

      if (!derived) {
        callbacks.onChange(event);
        return;
      }

      callbacks.onChange(
        PatchEvent.from([
          ...patches.map((patch) => (isHexSet(patch) ? set(derived.hex, ["hex"]) : patch)),
          set(derived.rgb, ["rgb"]),
          set(derived.cmyk, ["cmyk"]),
        ]),
      );
    },
    [callbacks],
  );

  useEffect(() => {
    const derived = value?.hex ? colorValuesFromHex(value.hex) : null;
    if (!derived) return;
    const missingRgb = !value?.rgb;
    const missingCmyk = !value?.cmyk;
    if (!missingRgb && !missingCmyk) return;

    const key = `${derived.hex}|${missingRgb}|${missingCmyk}`;
    if (filledKey.current === key) return;
    filledKey.current = key;

    callbacks.onChange(
      PatchEvent.from([
        ...(missingRgb ? [set(derived.rgb, ["rgb"])] : []),
        ...(missingCmyk ? [set(derived.cmyk, ["cmyk"])] : []),
      ]),
    );
  }, [callbacks, value?.cmyk, value?.hex, value?.rgb]);

  return (
    <FormCallbacksProvider {...callbacks} onChange={onChange}>
      {props.renderDefault(props)}
    </FormCallbacksProvider>
  );
}
