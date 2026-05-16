"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { FloatingOrbs } from "./FloatingOrbs";
import { ScrollIndicator } from "./ScrollIndicator";

const HERO_GRADIENT = `
  radial-gradient(ellipse 80% 65% at 78% 50%, rgba(184, 64, 112, 0.14) 0%, transparent 55%),
  radial-gradient(ellipse 55% 50% at 12% 78%, rgba(212, 164, 40, 0.09) 0%, transparent 50%),
  radial-gradient(ellipse 65% 55% at 32% 8%,  rgba(240, 188, 204, 0.55) 0%, transparent 55%),
  radial-gradient(ellipse 45% 40% at 88% 90%, rgba(248, 212, 180, 0.25) 0%, transparent 50%),
  linear-gradient(145deg, #FDFAF8 0%, #FDF6F8 50%, #F5E8F0 100%)
`;

function HeroLogo() {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <div
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center"
          style={{
            background:
              "radial-gradient(circle, rgba(184,64,112,0.15) 0%, rgba(212,164,40,0.08) 60%, transparent 100%)",
          }}
        >
          <span className="text-6xl sm:text-7xl select-none">🪷</span>
        </div>
        <div className="text-center">
          <p className="font-serif text-2xl sm:text-3xl text-charcoal font-medium">
            Matrushakti Yog
          </p>
          <p className="text-sage-600 text-sm mt-1 tracking-wide">
            Where Motherhood Meets Sacred Yoga
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src="/images/logo-bk.png"
      alt="Matrushakti Yog"
      className="w-full h-full object-contain"
      style={{ mixBlendMode: "multiply" }}
      onError={() => setImgError(true)}
    />
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen min-h-[100dvh] flex flex-col md:flex-row items-stretch w-full overflow-hidden"
    >
      {/* Gradient background — no photo, uses logo colour palette */}
      <motion.div
        className="absolute inset-0 z-0"
        style={shouldReduce ? {} : { y: bgY }}
      >
        <div
          className="absolute inset-[-12%]"
          style={{ background: HERO_GRADIENT }}
          aria-hidden
        />
        {/* Soft vignette edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-beige-100/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-beige-50/65 via-transparent to-transparent" />
      </motion.div>

      {/* Floating orbs layer */}
      <div className="absolute inset-0 z-[1]">
        <FloatingOrbs />
      </div>

      {/* Left: content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center pt-8 pb-6 sm:py-12 px-5 sm:px-6 lg:px-12 xl:px-16">
        <div className="w-full max-w-lg mx-auto md:mx-0">
          {/* Decorative brand line */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center gap-3 mb-4 sm:mb-5"
          >
            <motion.span
              className="h-[1.5px] bg-sage-500 shrink-0"
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
            <span className="text-sage-600 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em]">
              Prenatal &amp; Postnatal Yoga
            </span>
          </motion.div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.13] tracking-tight text-left">
            {/* Per-line curtain reveal */}
            <span className="block overflow-hidden">
              <motion.span
                className="block text-charcoal"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.65, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Nurturing Your
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block text-charcoal"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.65, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Journey
              </motion.span>
            </span>
            <span className="block overflow-hidden mt-1">
              <motion.span
                className="text-shimmer italic block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.65, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Through Motherhood
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.62,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="mt-4 sm:mt-5 text-base sm:text-lg text-charcoal/70 font-sans leading-relaxed text-left max-w-md"
          >
            Find balance, strength, and peace with prenatal and postnatal yoga
            designed for every stage of your journey.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.78,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <motion.a
              href="#prenatal"
              whileHover={shouldReduce ? {} : { scale: 1.03, y: -2 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
              className="inline-flex items-center justify-center rounded-2xl bg-sage-600 text-white px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold shadow-soft hover:bg-sage-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2"
            >
              Start Your Journey
            </motion.a>
            <motion.a
              href="#postnatal"
              whileHover={shouldReduce ? {} : { scale: 1.02 }}
              className="inline-flex items-center justify-center rounded-2xl border-2 border-sage-300/80 text-sage-700 bg-white/60 backdrop-blur-sm px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-medium hover:bg-white/90 hover:border-sage-400 transition-all duration-300"
            >
              Postnatal Classes
            </motion.a>
          </motion.div>

          {/* Trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5"
          >
            {["Safe for all trimesters", "Expert-led", "Community-centred"].map(
              (item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-muted"
                >
                  <span className="text-gold-500 text-[10px]">✦</span>
                  {item}
                </span>
              )
            )}
          </motion.div>
        </div>
      </div>

      {/* Right: logo showcase with breathing rings */}
      <div className="relative z-10 w-full md:w-[48%] lg:w-[52%] flex items-center justify-center p-4 sm:p-6 lg:p-8 h-[52vw] sm:h-[46vw] md:h-auto">
        {!shouldReduce && (
          <>
            {/* Outer breathing ring — rose */}
            <motion.div
              className="absolute w-[72%] max-w-[480px] aspect-square rounded-full border border-sage-400/25"
              animate={{ scale: [1, 1.07, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              aria-hidden
            />
            {/* Middle ring — gold */}
            <motion.div
              className="absolute w-[60%] max-w-[400px] aspect-square rounded-full border border-gold-400/30"
              animate={{ scale: [1, 1.09, 1], opacity: [0.15, 0.45, 0.15] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              aria-hidden
            />
            {/* Inner ring — rose */}
            <motion.div
              className="absolute w-[48%] max-w-[320px] aspect-square rounded-full border border-sage-300/20"
              animate={{ scale: [1, 1.11, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              aria-hidden
            />
            {/* Rose glow blob */}
            <motion.div
              className="absolute w-[66%] max-w-[440px] aspect-square rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(184,64,112,0.12) 0%, transparent 70%)",
                filter: "blur(36px)",
              }}
              animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              aria-hidden
            />
            {/* Gold glow blob */}
            <motion.div
              className="absolute w-[40%] max-w-[240px] aspect-square rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(212,164,40,0.10) 0%, transparent 70%)",
                filter: "blur(28px)",
              }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
              aria-hidden
            />
          </>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.18,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="relative w-full max-w-[200px] sm:max-w-[340px] md:max-w-[440px] lg:max-w-[560px] aspect-square"
        >
          <HeroLogo />
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
