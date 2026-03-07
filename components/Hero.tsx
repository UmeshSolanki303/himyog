"use client";

import { motion } from "framer-motion";

const HERO_BG =
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&q=80";
const HERO_RIGHT_IMAGE =
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen min-h-[100dvh] flex flex-col md:flex-row items-stretch w-full overflow-hidden"
    >
      {/* Soft background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-dark/40 via-beige-100/50 to-beige-100/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-beige-100/90 via-transparent to-transparent md:to-beige-100/30" />
      </div>

      {/* Left: content aligned top-left */}
      <div className="relative z-10 flex-1 flex flex-col justify-start pt-8 sm:pt-12 lg:pt-16 pb-12 px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-charcoal drop-shadow-sm text-left"
          >
            <span className="text-charcoal">Nurturing Your Journey</span>
            <br />
            <span className="text-sage-700">Through Motherhood</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.25,
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
