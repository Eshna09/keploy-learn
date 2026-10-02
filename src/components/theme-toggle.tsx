
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle color theme"
        className="h-10 w-10 rounded-xl border border-[var(--border)]"
      >
        ◐
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="flex h-10 items-center gap-2 rounded-xl border border-[var(--border)] px-3 text-sm transition-all duration-200 hover:scale-105 hover:bg-black/5 dark:hover:bg-white/10"
    >
      <span aria-hidden="true">{isDark ? "☀️" : "🌙"}</span>
      <span>{isDark ? "Light mode" : "Dark mode"}</span>
    </button>
  );
}
