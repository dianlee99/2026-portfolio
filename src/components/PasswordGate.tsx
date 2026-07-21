"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * Lightweight client-side gate for confidential case studies.
 *
 * NOTE: This is deterrence, not real security — the content still ships to
 * the browser. For truly sensitive work, keep it out of the repo and gate at
 * the server/edge instead (see /src/middleware.ts note in the README).
 * For recruiter-facing portfolios this is the common, good-enough pattern.
 *
 * Change the shared password here:
 */
const PASSWORD = "dianlee";
const STORAGE_KEY = "dl_unlocked";

function GateForm({
  title,
  value,
  error,
  onChange,
  onSubmit,
}: {
  title: string;
  value: string;
  error: boolean;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="w-full max-w-sm">
      <h1 className="text-title font-semibold">{title}</h1>
      <p className="mt-3 text-ink-soft">
        This case study contains confidential work. Enter the password, or
        email me and I&apos;ll walk you through it.
      </p>

      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3">
        <input
          type="password"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Password"
          className={`w-full rounded-md border bg-transparent px-4 py-2.5 outline-none transition-colors ${
            error ? "border-ink" : "border-line focus:border-ink"
          }`}
          autoFocus
        />
        <button
          type="submit"
          className="rounded-md bg-ink px-4 py-2.5 text-paper transition-opacity hover:opacity-90"
        >
          Unlock
        </button>
      </form>

      {error && (
        <p className="mt-3 text-sm text-ink-soft">
          Incorrect password. Try again or reach out.
        </p>
      )}

      <a
        href="mailto:dianlee99@gmail.com"
        className="link-underline mt-6 inline-block text-sm text-ink-faint"
      >
        Request access
      </a>
    </div>
  );
}

export function PasswordGate({
  title,
  children,
  layout = "page",
}: {
  title: string;
  children: ReactNode;
  layout?: "page" | "overlay";
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") {
      setUnlocked(true);
    }
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (unlocked) return <>{children}</>;

  const form = (
    <GateForm
      title={title}
      value={value}
      error={error}
      onChange={(next) => {
        setValue(next);
        setError(false);
      }}
      onSubmit={submit}
    />
  );

  if (layout === "overlay") {
    return (
      <div className="flex min-h-[calc(100dvh-3.25rem)] items-center justify-center px-6 py-12">
        {form}
      </div>
    );
  }

  return (
    <motion.div
      className="mx-auto max-w-[900px] px-6 pt-24 md:pt-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {form}
    </motion.div>
  );
}
