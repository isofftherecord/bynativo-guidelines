"use client";

import { useEffect, useId, useState } from "react";

const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$/i;

export type ShareTarget = {
  assetId: string;
  title: string;
  formatLabel: string;
};

export function ShareLogoModal({
  open,
  target,
  brandName,
  onClose,
}: {
  open: boolean;
  target: ShareTarget | null;
  brandName?: string;
  onClose: () => void;
}) {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"form" | "loading" | "ok" | "error">(
    "form",
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setEmail("");
      setStatus("form");
      setError("");
    }
  }, [open, target?.assetId]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !target) return null;

  const emailValid = emailRegex.test(email.trim());

  async function sendLink() {
    if (!target || !emailValid) return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/share-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          assetId: target.assetId,
          brandName,
        }),
      });
      const data = (await res.json()) as { error?: string; ok?: boolean };
      if (!res.ok) {
        setStatus("error");
        setError(data.error || "Could not send email");
        return;
      }
      setStatus("ok");
    } catch {
      setStatus("error");
      setError("Network error");
    }
  }

  return (
    <div className="share-modal" role="dialog" aria-modal="true" aria-labelledby={`${inputId}-title`}>
      <button type="button" className="share-modal__backdrop" aria-label="Close" onClick={onClose} />
      <div className="share-modal__panel">
        <button type="button" className="share-modal__close" onClick={onClose} aria-label="Close modal">
          ×
        </button>

        {status === "ok" ? (
          <div className="share-modal__success">
            <div className="share-modal__check" aria-hidden>
              ✓
            </div>
            <h2 id={`${inputId}-title`}>Link successfully sent!</h2>
            <p className="share-modal__powered">
              Powered by <strong>byNativo</strong>
            </p>
            <button type="button" className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <div className="share-modal__form">
            <h2 id={`${inputId}-title`}>Share logo file</h2>
            <p className="share-modal__meta">
              {target.title}
              <span> · {target.formatLabel}</span>
            </p>
            <label className="sr-only" htmlFor={inputId}>
              Send to this email
            </label>
            <input
              id={inputId}
              type="email"
              autoFocus
              placeholder="Send to this email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  void sendLink();
                }
              }}
            />
            {email !== "" && !emailValid ? (
              <p className="form-msg form-msg--error">
                Please enter a valid email address.
              </p>
            ) : null}
            {status === "error" && error ? (
              <p className="form-msg form-msg--error">{error}</p>
            ) : null}
            <button
              type="button"
              className="btn share-modal__send"
              disabled={!emailValid || status === "loading"}
              onClick={() => void sendLink()}
            >
              {status === "loading" ? "Sending…" : "Send link"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
