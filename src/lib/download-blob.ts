/** Client-side forced download (same idea as the Angular `.downloadClick` handler). */
export async function downloadBlob(fileUrl: string, fileName: string) {
  const resp = await fetch(fileUrl);
  if (!resp.ok) throw new Error("Download failed");
  const blob = await resp.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = fileName || "logo-file";
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
}

export function fileNameFromUrlOrTitle(url: string, title: string) {
  try {
    const path = decodeURIComponent(new URL(url).pathname);
    const base = path.split("/").pop() || "";
    if (base && !base.includes("?")) return base;
  } catch {
    /* ignore */
  }
  const cleaned = title.replace(/\s+/g, "_");
  return cleaned.includes(".") ? cleaned : `${cleaned}.bin`;
}
