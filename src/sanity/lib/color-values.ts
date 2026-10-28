export type DerivedColorValues = {
  hex: string;
  rgb: string;
  cmyk: string;
};

function expandHex(input: string) {
  const value = input.trim();
  const full = value.match(/^#([0-9A-Fa-f]{6})$/);
  if (full) return full[1];
  const short = value.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
  if (!short) return null;
  return `${short[1]}${short[1]}${short[2]}${short[2]}${short[3]}${short[3]}`;
}

/** RGB and CMYK strings in the same shape the guidelines pages display. */
export function colorValuesFromHex(input: string): DerivedColorValues | null {
  const digits = expandHex(input);
  if (!digits) return null;

  const r = parseInt(digits.slice(0, 2), 16);
  const g = parseInt(digits.slice(2, 4), 16);
  const b = parseInt(digits.slice(4, 6), 16);
  const r1 = r / 255;
  const g1 = g / 255;
  const b1 = b / 255;
  const k = 1 - Math.max(r1, g1, b1);
  const scale = 1 - k;
  const channel = (value: number) =>
    scale === 0 ? 0 : Math.round(((1 - value - k) / scale) * 100);

  return {
    hex: `#${digits.toUpperCase()}`,
    rgb: `${r}, ${g}, ${b}`,
    cmyk: `${channel(r1)}, ${channel(g1)}, ${channel(b1)}, ${Math.round(k * 100)}`,
  };
}
