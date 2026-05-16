"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface PageHeroProps {
  title: string;
  description: string;
  imageSrc?: string;
}

export function PageHero({ title, description }: PageHeroProps) {
  return (
    <header className="relative w-full bg-beige-100 border-b border-beige-200/80 overflow-hidden">
      {/* Subtle radial accents matching the brand palette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 65% 100% at 95% 50%, rgba(184,64,112,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 45% 70% at 0% 100%, rgba(212,164,40,0.05) 0%, transparent 55%)
          `,
        }}
        aria-hidden
      />

      <div
        className="relative z-10 mx-auto px-4 sm:px-6 pt-8 pb-10 sm:pt-12 sm:pb-16"
        style={{ maxWidth: "84rem" }}
      >
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-700 text-xs sm:text-sm font-medium mb-8 sm:mb-10 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            Back to home
          </Link>
        </motion.div>

        {/* Decorative top rule */}
        <motion.div
          className="h-[2px] rounded-full bg-gradient-to-r from-sage-500 via-sage-400 to-transparent mb-6"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ width: "4rem" }}
        />

        {/* Page title — Playfair Display, large editorial weight */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-semibold text-charcoal leading-[1.08] tracking-tight"
        >
          {title}
        </motion.h1>

        {/* Description with left accent bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-6 flex items-stretch gap-4 max-w-2xl"
        >
          <div className="w-[3px] shrink-0 rounded-full bg-gradient-to-b from-sage-500 to-sage-200" />
          <p className="text-charcoal-light text-base sm:text-lg leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Decorative marker row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.48 }}
          className="mt-8 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-sage-500" />
          <span className="w-2 h-2 rounded-full bg-gold-400/70" />
          <span className="w-2 h-2 rounded-full bg-peach-300/80" />
          <span className="ml-2 h-px w-16 bg-beige-300" />
        </motion.div>
      </div>
    </header>
  );
}
