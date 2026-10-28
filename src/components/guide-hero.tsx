export function GuideHero({
  mark,
  kicker = "Brand Guidelines",
  title,
  color,
  statement,
}: {
  mark?: string;
  kicker?: string;
  title: string;
  color?: string;
  statement?: string;
}) {
  return (
    <header className="guide-hero">
      <div
        className="guide-hero__cover"
        style={{ background: color || "var(--brand-accent)" }}
      >
        <div className="guide-hero__meta">
          {mark ? <span>{mark}</span> : <span />}
          {kicker ? <span>{kicker}</span> : null}
        </div>
        <h1>{title}</h1>
      </div>
      {statement ? <p className="guide-hero__statement">{statement}</p> : null}
    </header>
  );
}

export function GuideNoteHead({
  title,
  intro,
}: {
  title: string;
  intro?: string;
}) {
  return (
    <div className="guide-note__head">
      <h2>{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </div>
  );
}
