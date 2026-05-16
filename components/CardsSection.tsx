"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionReveal } from "./SectionReveal";

const cards = [
  {
    title: "Prenatal Yoga",
    description:
      "Safe, gentle yoga for every trimester. Ease discomfort, build strength, and prepare your body and mind for birth.",
    href: "/prenatal",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
  },
  {
    title: "Postnatal Yoga",
    description:
      "Recover and rebuild with pelvic floor and core focus. Baby-and-me classes so you can bond while you move.",
    href: "/postnatal",
    image:
      "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=600&q=80",
  },
  {
    title: "Information Sessions",
    description:
      "Expert-led sessions on pregnancy, birth, and postpartum. Tips, guidance, and support for every stage.",
    href: "/information-sessions",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=80",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14 },
  },
};

// Cards slide from: left, bottom, right
const item = {
  hidden: (i: number) => ({
    opacity: 0,
    x: i === 0 ? -36 : i === 2 ? 36 : 0,
    y: i === 1 ? 28 : 0,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const imgVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.06,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const tintVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.4 } },
};

export function CardsSection() {
  const shouldReduce = useReducedMotion();

  return (
    <SectionReveal
      as="section"
      className="py-12 sm:py-20 md:py-24 bg-white w-full"
      delay={0}
    >
      <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "84rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-charcoal font-medium">
            Our Programs
          </h2>
          <p className="mt-3 sm:mt-4 text-slate-muted text-base sm:text-lg max-w-2xl mx-auto px-2">
            Join live classes and find support for every stage of your journey.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.href}
              variants={item}
              custom={index}
              whileHover={
                shouldReduce ? {} : { y: -8, transition: { duration: 0.3 } }
              }
            >
              <Link
                href={card.href}
                className="group block h-full rounded-3xl overflow-hidden bg-beige-50 border border-beige-200/60 shadow-soft hover:shadow-soft-lg hover:border-sage-200 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${card.image})` }}
                    variants={imgVariants}
                    aria-hidden
                  />
                  <motion.div
                    className="absolute inset-0 bg-sage-500/12"
                    variants={tintVariants}
                    aria-hidden
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/90 via-charcoal-dark/40 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6">
                    <p className="text-beige-100 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                      {card.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-peach-200 font-medium text-sm">
                      Learn more
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="font-serif text-lg sm:text-xl text-charcoal font-medium">
                    {card.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionReveal>
  );
}
