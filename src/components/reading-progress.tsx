
"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const root = document.documentElement;
      const scrollableHeight = root.scrollHeight - window.innerHeight;
      const nextProgress =
        scrollableHeight <= 0
          ? 0
          : (window.scrollY / scrollableHeight) * 100;

      setProgress(Math.min(100, Math.max(0, nextProgress)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    window.addEventListener("orientationchange", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      window.removeEventListener("orientationchange", updateProgress);
    };
  }, []);

  const percentage = Math.round(progress);

  return (
    <div
      className="fixed left-0 top-0 z-[60] h-1.5 w-full bg-transparent"
      role="progressbar"
      aria-label="Page reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percentage}
      aria-valuetext={`${percentage}% read`}
    >
      <div
        className="h-full bg-[linear-gradient(90deg,var(--accent),var(--accent-strong))] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}