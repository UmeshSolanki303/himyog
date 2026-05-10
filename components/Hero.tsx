"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, Variants } from "framer-motion";

const LINE_ONE = ["Nurturing", "Your", "Journey"];
const LINE_TWO = ["Through", "Motherhood"];

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      delay: i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const HERO_BG =
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&q=80";
const HERO_RIGHT_IMAGE =
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? ["0%", "0%"] : ["0%", "30%"]
  );

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen min-h-[100dvh] flex flex-col md:flex-row items-stretch w-full overflow-hidden"
    >
      {/* Soft background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 scale-110 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})`, y: bgY }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-dark/40 via-beige-100/50 to-beige-100/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-beige-100/90 via-transparent to-transparent md:to-beige-100/30" />
      </div>

      {/* Left: content aligned top-left */}
      <div className="relative z-10 flex-1 flex flex-col justify-start pt-8 sm:pt-12 lg:pt-16 pb-12 px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="max-w-xl">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight drop-shadow-sm text-left">
            <span className="block text-charcoal">
              {LINE_ONE.map((word, i) => (
                <motion.span
                  key={word}
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="block text-sage-700">
              {LINE_TWO.map((word, i) => (
                <motion.span
                  key={word}
                  custom={LINE_ONE.length + i}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: (LINE_ONE.length + LINE_TWO.length) * 0.1 + 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-charcoal-light font-sans leading-relaxed text-left max-w-lg"
          >
            Find balance, strength, and peace with prenatal and postnatal yoga
            designed for every stage of your journey.
          </motion.p>
        </div>
      </div>

      {/* Right: stock image */}
      <div className="relative z-10 w-full md:w-[45%] lg:w-[50%] flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-lg aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-soft-lg border border-beige-200/60 bg-beige-200"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_RIGHT_IMAGE})` }}
            role="img"
            aria-label="Prenatal yoga"
          />
        </motion.div>
      </div>
    </section>
  );
}
