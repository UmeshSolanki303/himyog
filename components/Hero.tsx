"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { FloatingOrbs } from "./FloatingOrbs";
import { ScrollIndicator } from "./ScrollIndicator";

const HERO_BG =
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&q=80";
const HERO_RIGHT_IMAGE =
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen min-h-[100dvh] flex flex-col md:flex-row items-stretch w-full overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={shouldReduce ? {} : { y: bgY }}
      >
        <div
          className="absolute inset-[-12%] bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-dark/40 via-beige-100/50 to-beige-100/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-beige-100/90 via-transparent to-transparent md:to-beige-100/30" />
      </motion.div>

      {/* Floating orbs layer */}
      <div className="absolute inset-0 z-[1]">
        <FloatingOrbs />
      </div>

      {/* Left: content */}
      <div className="relative z-10 flex-1 flex flex-col justify-start pt-8 sm:pt-12 lg:pt-16 pb-12 px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="max-w-xl">
          {/* Decorative brand line */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center gap-3 mb-5 sm:mb-6"
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
            <span className="text-sage-600 text-xs sm:text-sm font-medium uppercase tracking-[0.15em]">
              Prenatal &amp; Postnatal Yoga
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-charcoal drop-shadow-sm text-left"
          >
            <span className="text-charcoal">Nurturing Your Journey</span>
            <br />
            <span className="text-shimmer">Through Motherhood</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.28,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-charcoal-light font-sans leading-relaxed text-left max-w-lg"
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
              delay: 0.48,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <motion.a
              href="#prenatal"
              whileHover={shouldReduce ? {} : { scale: 1.03, y: -2 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
              className="inline-flex items-center justify-center rounded-2xl bg-sage-500 text-white px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-medium shadow-soft hover:bg-sage-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2"
            >
              Start Your Journey
            </motion.a>
            <motion.a
              href="#postnatal"
              whileHover={shouldReduce ? {} : { scale: 1.02 }}
              className="inline-flex items-center justify-center rounded-2xl border border-sage-300/70 text-sage-700 bg-white/50 backdrop-blur-sm px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-medium hover:bg-sage-50/80 transition-colors duration-300"
            >
              Postnatal Classes
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Right: image with breathing rings */}
      <div className="relative z-10 w-full md:w-[45%] lg:w-[50%] flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {!shouldReduce && (
          <>
            {/* Outer breathing ring */}
            <motion.div
              className="absolute w-[62%] max-w-[360px] aspect-square rounded-full border border-sage-400/20"
              animate={{ scale: [1, 1.07, 1], opacity: [0.25, 0.55, 0.25] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              aria-hidden
            />
            {/* Inner breathing ring */}
            <motion.div
              className="absolute w-[50%] max-w-[290px] aspect-square rounded-full border border-sage-400/15"
              animate={{ scale: [1, 1.09, 1], opacity: [0.15, 0.4, 0.15] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              aria-hidden
            />
            {/* Soft glow blob behind image */}
            <motion.div
              className="absolute w-[58%] max-w-[340px] aspect-square rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(122,139,98,0.14) 0%, transparent 70%)",
                filter: "blur(32px)",
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
          </>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.18,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="relative w-full max-w-lg aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-soft-lg border border-beige-200/60 bg-beige-200"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_RIGHT_IMAGE})` }}
            role="img"
            aria-label="Prenatal yoga"
          />
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
