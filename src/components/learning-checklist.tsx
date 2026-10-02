
"use client";

import { useMemo, useState } from "react";

const tasks = [
  {
    label: "I have Go, Docker, and the Keploy CLI ready in my terminal.",
    id: "before-you-begin",
  },
  {
    label: "I know what the sample app is doing and which endpoints it exposes.",
    id: "the-application-endpoints",
  },
  {
    label: "I can record real API traffic with Keploy and send a request to the app.",
    id: "record-real-traffic",
  },
  {
    label: "I can find the generated test files and explain the test report.",
    id: "inspect-the-generated-tests",
  },
  {
    label: "I know how to troubleshoot common Docker, port, and CLI problems.",
    id: "what-to-remember",
  },
];

export default function LearningChecklist() {
  const [completed, setCompleted] = useState<boolean[]>(tasks.map(() => false));

  const count = completed.filter(Boolean).length;
  const nextIncomplete = useMemo(
    () => tasks.findIndex((task, index) => !completed[index]),
    [completed],
  );

  const jumpToNextIncomplete = () => {
    if (nextIncomplete === -1) return;

    const target = document.getElementById(tasks[nextIncomplete].id);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="mt-14 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)] sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
            Learning checklist
          </p>
          <h2 className="mt-2 text-xl font-black text-[var(--heading)]">
            Tutorial complete?
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={jumpToNextIncomplete}
            disabled={nextIncomplete === -1}
            className="rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1.5 text-xs font-semibold text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            Next incomplete step
          </button>
          <button
            type="button"
            onClick={() => setCompleted(tasks.map(() => false))}
            className="rounded-full border border-[var(--border)] bg-transparent px-3 py-1.5 text-xs font-semibold text-[var(--muted)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            Reset
          </button>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
        Check each item when you feel confident about it. Use the next-step button to jump back to the first thing you still need to finish.
      </p>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-[var(--border)]">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),var(--accent-strong))] transition-all duration-300"
          style={{ width: `${(count / tasks.length) * 100}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-[var(--muted)]" aria-live="polite">
        {count} of {tasks.length} learning goals completed
      </p>

      <div className="mt-5 space-y-4">
        {tasks.map((task, index) => (
          <label
            key={task.id}
            className="flex cursor-pointer items-start gap-3 rounded-xl border border-transparent px-2 py-1.5 text-sm leading-6 transition-colors duration-200 hover:border-[var(--border)] hover:bg-[var(--surface-strong)]"
          >
            <input
              type="checkbox"
              checked={completed[index]}
              onChange={(event) => {
                setCompleted((previous) =>
                  previous.map((value, i) =>
                    i === index ? event.target.checked : value,
                  ),
                );
              }}
              className="mt-1 h-4 w-4 accent-[var(--accent-strong)]"
            />
            <span
              className={
                completed[index]
                  ? "text-[var(--muted)] line-through"
                  : "text-[var(--foreground)]"
              }
            >
              {task.label}
            </span>
          </label>
        ))}
      </div>

      {count === tasks.length && (
        <p className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
          🎉 Great work! You completed all the learning goals.
        </p>
      )}
    </section>
  );
}
