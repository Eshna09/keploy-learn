"use client";

import { useState, type ComponentPropsWithoutRef, type ReactNode } from "react";

type CodeBlockProps = ComponentPropsWithoutRef<"pre"> & {
  children?: ReactNode;
};

function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractText).join("");
  }

  if (node && typeof node === "object" && "props" in node) {
    return extractText((node as { props?: { children?: ReactNode } }).props?.children);
  }

  return "";
}

export default function CopyCodeButton({ children, className, ...props }: CodeBlockProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const handleCopy = async () => {
    const text = extractText(children).trim();

    try {
      if (!text) {
        throw new Error("No code to copy");
      }

      await navigator.clipboard.writeText(text);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1800);
    } catch {
      setCopyState("error");
      window.setTimeout(() => setCopyState("idle"), 2200);
    }
  };

  const buttonLabel =
    copyState === "copied" ? "Copied" : copyState === "error" ? "Error" : "Copy";

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-3 top-3 z-10 rounded-lg border border-[var(--border)] bg-[var(--surface)]/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] shadow-sm transition hover:border-[var(--accent)] hover:text-[var(--accent-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
        aria-live="polite"
        aria-label={
          copyState === "copied"
            ? "Code copied to clipboard"
            : copyState === "error"
              ? "Copy failed"
              : "Copy code block"
        }
      >
        {buttonLabel}
      </button>

      <pre
        {...props}
        className={className ?? "relative overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"}
      >
        {children}
      </pre>

      {copyState !== "idle" && (
        <p className="mt-2 text-xs text-[var(--muted)]" aria-live="polite">
          {copyState === "copied"
            ? "Copied to clipboard."
            : "Copy failed. Select the code and copy it manually."}
        </p>
      )}
    </div>
  );
}
