const floatingBadges = [
  { label: "Record", className: "left-2 top-10" },
  { label: "Replay", className: "right-6 top-12" },
  { label: "Detect", className: "left-8 bottom-10" },
  { label: "Ship", className: "right-10 bottom-14" },
];

export default function HeroVisual() {
  return (
    <div className="relative isolate overflow-hidden rounded-[30px] border border-[var(--border)] bg-[linear-gradient(135deg,rgba(255,155,120,0.14),rgba(255,255,255,0.04))] p-4 shadow-[var(--shadow-soft)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,155,120,0.25),_transparent_58%)]" />

      <div className="relative flex h-[330px] items-center justify-center">
        <div className="hero-orbit hero-orbit-outer" />
        <div className="hero-orbit hero-orbit-middle" />
        <div className="hero-orbit hero-orbit-inner" />

        <div className="hero-core">
          <div className="hero-core-inner">K</div>
        </div>

        {floatingBadges.map((badge) => (
          <div
            key={badge.label}
            className={`hero-pill ${badge.className}`}
            aria-label={badge.label}
          >
            {badge.label}
          </div>
        ))}

        <div className="hero-stat hero-stat-top">
          <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
            2x faster
          </span>
          <strong className="mt-2 text-xl font-black text-[var(--heading)]">
            96%
          </strong>
        </div>

        <div className="hero-stat hero-stat-bottom">
          <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
            captured
          </span>
          <strong className="mt-2 text-xl font-black text-[var(--heading)]">
            120+
          </strong>
        </div>
      </div>
    </div>
  );
}
