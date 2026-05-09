"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full min-h-[var(--header-height)] flex items-center bg-beige-100/95 backdrop-blur-sm border-b border-beige-200/60">
      <div
        className="mx-auto w-full flex items-center justify-between gap-4 pl-4 pr-0 sm:pr-6"
        style={{ maxWidth: "84rem" }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 min-w-0 shrink-0"
          aria-label="MatruShakti Yog - Home"
        >
          <span className="flex shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-sage-100 text-sage-600">
            <Leaf className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
          </span>
          <span className="font-serif text-lg sm:text-xl font-medium text-charcoal hover:text-sage-600 transition-colors truncate">
            MatruShakti Yog
          </span>
        </Link>
        <nav className="flex items-center gap-3 sm:gap-6 shrink-0">
          <Link
            href="/courses"
            className="text-xs sm:text-sm text-slate-muted hover:text-charcoal transition-colors whitespace-nowrap"
          >
            Courses
          </Link>
          <Link
            href="/prenatal"
            className="text-xs sm:text-sm text-slate-muted hover:text-charcoal transition-colors whitespace-nowrap"
          >
            Prenatal
          </Link>
          <Link
            href="/postnatal"
            className="text-xs sm:text-sm text-slate-muted hover:text-charcoal transition-colors whitespace-nowrap"
          >
            Postnatal
          </Link>
          <Link
            href="/information-sessions"
            className="text-xs sm:text-sm text-slate-muted hover:text-charcoal transition-colors whitespace-nowrap"
          >
            Information
          </Link>
        </nav>
      </div>
    </header>
  );
}
