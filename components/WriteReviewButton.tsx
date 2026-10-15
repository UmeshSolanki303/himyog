"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { PenLine } from "lucide-react";
import { GOOGLE_REVIEW_URL } from "@/lib/reviews-data";

// Pages that also render a fixed MobileEnrollBar along the bottom edge on
// small screens (lg:hidden) — this widget needs to sit above it there, or
// the two fixed-position elements overlap and the enroll button becomes
// unclickable. Keep in sync with every page that imports MobileEnrollBar.
function hasMobileEnrollBar(pathname: string | null): boolean {
  if (!pathname) return false;
  return (
    pathname === "/retreat" ||
    (pathname.startsWith("/courses/") && pathname !== "/courses")
  );
}

// A single, sitewide "Write a Review" entry point. Reviews are collected on
// Google directly (not through an on-site form) and curated onto the site
// manually from /admin/reviews, so every trigger just sends people there.
export function FloatingWriteReviewButton() {
  const shouldReduce = useReducedMotion();
  const pathname = usePathname();

  // The admin panel has its own UI and audience — a public review prompt
  // doesn't belong there.
  if (pathname?.startsWith("/admin")) return null;

  const clearsEnrollBar = hasMobileEnrollBar(pathname);

  return (
    <div
      className={`fixed right-5 sm:right-8 z-40 ${
        clearsEnrollBar ? "bottom-24 lg:bottom-8" : "bottom-6 sm:bottom-8"
      }`}
    >
      {!shouldReduce && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(184,64,112,0.35) 0%, transparent 70%)",
            filter: "blur(12px)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
      )}
      <motion.a
        href={GOOGLE_REVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={shouldReduce ? {} : { scale: 1.05, y: -2 }}
        whileTap={shouldReduce ? {} : { scale: 0.97 }}
        className="relative inline-flex items-center gap-2 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white px-4 py-3 sm:px-5 sm:py-3.5 text-sm font-semibold shadow-soft-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2"
      >
        <PenLine className="w-4 h-4 shrink-0" />
        <span className="hidden sm:inline">Write a Review</span>
        <span className="sm:hidden">Review</span>
      </motion.a>
    </div>
  );
}
