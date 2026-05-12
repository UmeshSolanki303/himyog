"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "./SectionReveal";

interface ClassSectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  imagePlaceholder: string;
  reverse?: boolean;
  formUrl?: string;
  formLabel?: string;
  ctaText?: string;
}

function AnimatedPlaceholder({ label, reverse }: { label: string; reverse: boolean }) {
  const shouldReduce = useReducedMotion();
  const accent = reverse ? "rgba(236,164,141,0.18)" : "rgba(122,139,98,0.18)";
  const ring = reverse ? "border-peach-300/40" : "border-sage-300/40";
  const ringInner = reverse ? "border-peach-400/25" : "border-sage-400/25";

  return (
    <div
      className="w-full h-full relative flex items-center justify-center overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 40% 50%, ${accent} 0%, transparent 70%), linear-gradient(135deg, #f0ede8 0%, #e8ebe4 100%)`,
      }}
    >
      {/* Decorative breathing rings */}
      {!shouldReduce && (
        <>
          <motion.div
            className={`absolute w-48 h-48 rounded-full border ${ring}`}
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <motion.div
            className={`absolute w-32 h-32 rounded-full border ${ringInner}`}
            animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            aria-hidden
          />
          <motion.div
            className="absolute w-16 h-16 rounded-full bg-sage-200/30"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            aria-hidden
          />
        </>
      )}
      <p className="relative text-slate-soft/70 text-sm text-center px-6 leading-relaxed">
        {label}
      </p>
    </div>
  );
}

export function ClassSection({
  id,
  title,
  subtitle,
  description,
  bullets,
  imagePlaceholder,
  reverse = false,
  formUrl = "#",
  formLabel = "Register via Google Form",
  ctaText = "Open registration form",
}: ClassSectionProps) {
  const shouldReduce = useReducedMotion();

  return (
    <SectionReveal
      as="section"
      id={id}
      className={`py-12 sm:py-20 md:py-24 w-full ${reverse ? "bg-beige-50" : "bg-white"}`}
    >
      <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "84rem" }}>
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center ${
            reverse ? "lg:flex-row-reverse" : ""
          }`}
        >
          <motion.div
            initial={{ opacity: 0, x: reverse ? 28 : -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={reverse ? "lg:order-2" : ""}
          >
            <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl bg-beige-200 overflow-hidden shadow-soft">
              <AnimatedPlaceholder label={imagePlaceholder} reverse={reverse} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={reverse ? "lg:order-1" : ""}
          >
            <p className="text-sage-600 font-medium uppercase tracking-wider text-sm mb-2">
              {subtitle}
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-charcoal font-medium mb-3 sm:mb-4">
              {title}
            </h2>
            <p className="text-slate-muted text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
              {description}
            </p>
            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-sm sm:text-base">
              {bullets.map((bullet, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + i * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="flex items-start gap-3 text-charcoal-light"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sage-400 shrink-0" />
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={shouldReduce ? {} : { scale: 1.03, y: -2 }}
                whileTap={shouldReduce ? {} : { scale: 0.97 }}
                className="inline-flex items-center justify-center rounded-2xl bg-sage-500 text-white px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-medium shadow-soft hover:bg-sage-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2"
              >
                {formLabel}
              </motion.a>
              <span className="text-sm text-slate-muted self-center">
                {ctaText}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionReveal>
  );
}
