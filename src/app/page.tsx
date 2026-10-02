
"use client";

import { useEffect } from "react";

import Tutorial from "@/content/keploy-go.mdx";
import LearningChecklist from "@/components/learning-checklist";
import ThemeToggle from "@/components/theme-toggle";

const navigation = [
  { label: "What you'll build", href: "#what-youll-build" },
  { label: "Workflow", href: "#how-the-workflow-works" },
  { label: "Prerequisites", href: "#before-you-begin" },
  { label: "Application endpoints", href: "#the-application-endpoints" },
  { label: "Record traffic", href: "#record-real-traffic" },
  { label: "Test results", href: "#inspect-the-generated-tests" },
  { label: "Key takeaways", href: "#what-to-remember" },
];

const sectionIdMap: Record<string, string> = {
  "What you'll build": "what-youll-build",
  "How the workflow works": "how-the-workflow-works",
  "Before you begin": "before-you-begin",
  "The application endpoints": "the-application-endpoints",
  "Record real traffic": "record-real-traffic",
  "Inspect the generated tests": "inspect-the-generated-tests",
  "What to remember": "what-to-remember",
};

export default function Home() {
  useEffect(() => {
    const proseTargets = document.querySelectorAll(
      ".prose > h1, .prose > h2, .prose > h3, .prose > p, .prose > ul, .prose > ol, .prose > pre, .prose > table, .prose > blockquote, .prose > hr"
    );

    document.querySelectorAll(".prose h2, .prose h3").forEach((heading) => {
      const title = heading.textContent?.trim();
      if (!title) return;

      const mappedId = sectionIdMap[title];
      if (mappedId) {
        heading.id = mappedId;
      }
    });

    proseTargets.forEach((element) => {
      element.classList.add("scroll-reveal");
    });

    const elements = document.querySelectorAll(".scroll-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(255,155,120,0.25),_transparent_62%)]" />

      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 px-5 py-4 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--accent)_0%,_#ffd1c2_100%)] text-lg font-black text-slate-950 shadow-[0_16px_32px_rgba(255,155,120,0.28)]">
            K
          </div>

          <div>
            <p className="text-base font-black tracking-tight sm:text-lg">
              Keploy Learn
            </p>
            <p className="hidden text-xs text-[var(--muted)] sm:block">
              Learn by building
            </p>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <span className="hidden rounded-full border border-[var(--border)] bg-[var(--surface)]/80 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--muted)] md:inline-flex">
              Go · Docker · API testing
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section className="relative mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-6 sm:py-14 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-14">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
              In this tutorial
            </p>

            <nav aria-label="Tutorial sections" className="space-y-1.5">
              {navigation.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm text-[var(--muted)] transition-all duration-200 hover:-translate-x-1 hover:border-[var(--border)] hover:bg-[var(--surface)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[11px] font-semibold text-[var(--foreground)] transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent-strong)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-soft)]">
              <p className="text-sm font-semibold text-[var(--foreground)]">
                Learning goal
              </p>
              <p className="mt-2 text-xs leading-6 text-[var(--muted)]">
                Understand how real API traffic can become reusable regression
                tests.
              </p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[var(--border)]">
                <div className="h-full w-1/4 rounded-full bg-[linear-gradient(90deg,var(--accent),var(--accent-strong))]" />
              </div>
              <p className="mt-2 text-xs text-[var(--muted)]">
                Hands-on learning path
              </p>
            </div>
          </div>
        </aside>

        <article className="min-w-0 animate-page-enter">
          <div className="mb-7 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[rgba(255,155,120,0.12)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--foreground)]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent-strong)]" />
              Hands-on tutorial
            </span>
            <span className="text-xs text-[var(--muted)]">
              Go · Docker · Keploy
            </span>
          </div>

          <div className="scroll-reveal mb-10 rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)] sm:p-7">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
              Your practical guide
            </p>
            <h1 className="text-3xl font-black tracking-tight text-[var(--heading)] sm:text-4xl">
              From API requests to regression tests
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
              Follow a real Go URL-shortener experiment to learn how Keploy records
              API interactions, generates test cases, and helps detect unexpected
              changes.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#before-you-begin"
                className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent),var(--accent-strong))] px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_18px_30px_rgba(217,107,77,0.22)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Start tutorial
              </a>
              <a
                href="#what-youll-build"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2.5 text-sm font-semibold text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Quick overview
              </a>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Time", value: "15–20 min" },
                { label: "Prerequisites", value: "Go + Docker + Keploy" },
                { label: "Goal", value: "Capture & replay API traffic" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.28)] p-3.5"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="scroll-reveal prose max-w-none prose-headings:tracking-tight prose-h1:text-4xl prose-h1:font-bold prose-h2:mt-12 prose-h2:border-b prose-h2:border-[var(--border)] prose-h2:pb-3 prose-h2:text-[var(--foreground)] prose-h3:text-[var(--foreground)] prose-p:text-[var(--foreground)] prose-li:text-[var(--foreground)] prose-a:text-[var(--accent-strong)] prose-strong:text-[var(--foreground)] prose-code:text-[var(--accent-strong)] prose-pre:border prose-pre:border-[var(--border)] prose-pre:bg-[var(--surface)] prose-li:marker:text-[var(--accent-strong)]">
            <Tutorial />
          </div>

          <div className="scroll-reveal">
            <LearningChecklist />
          </div>

          <footer className="mt-12 border-t border-[var(--border)] py-6 text-center text-xs leading-6 text-[var(--muted)]">
            Keploy Learn · A hands-on guide to API regression testing
            <br />
            Built for developers who learn by doing.
          </footer>
        </article>
      </section>
    </main>
  );
}