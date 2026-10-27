"use client";

import { useEffect, useState } from "react";

import {
  downloadBlob,
  fileNameFromUrlOrTitle,
} from "@/lib/download-blob";

/** Equivalent of legacy `files.php`: auto-download on load. */
export function DownloadClient({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await downloadBlob(url, fileNameFromUrlOrTitle(url, title));
        if (!cancelled) setStatus("done");
      } catch {
        if (!cancelled) {
          setStatus("error");
          window.location.href = url;
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [url, title]);

  return (
    <div className="download-page__status">
      {status === "loading" ? <p>Your download should start automatically…</p> : null}
      {status === "done" ? <p>Download started. You can close this tab.</p> : null}
      {status === "error" ? (
        <p>
          Opening file directly…{" "}
          <a className="btn" href={url}>
            Download manually
          </a>
        </p>
      ) : (
        <a className="btn btn--ghost" href={url}>
          Download manually
        </a>
      )}
    </div>
  );
}
