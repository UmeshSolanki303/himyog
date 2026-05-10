"use client";

import { motion } from "framer-motion";
import { Heart, Activity, Sun } from "lucide-react";
import { SectionReveal } from "./SectionReveal";

const benefits = [
  {
    icon: Heart,
    title: "Emotional Wellbeing",
    description:
      "Reduce stress and anxiety while building a deeper connection with your body and your baby. Gentle movement supports mental peace throughout pregnancy and beyond.",
  },
  {
    icon: Activity,
    title: "Physical Strength",
    description:
      "Ease back pain, improve posture, and support core recovery. Safe, adapted poses help you stay strong and comfortable during pregnancy and postpartum.",
  },
  {
    icon: Sun,
    title: "Balance & Energy",
    description:
      "Restore energy and find balance in daily life. Our classes focus on breathwork and mindful movement to leave you feeling refreshed and centered.",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24, scale: 0.93 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] },
  },
};

export function Benefits() {
  return (
    <SectionReveal
      as="section"
      className="py-12 sm:py-20 md:py-24 bg-beige-50 w-full"
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
            Benefits of Yoga During & After Pregnancy
          </h2>
          <p className="mt-3 sm:mt-4 text-slate-muted text-base sm:text-lg max-w-2xl mx-auto px-2">
            Evidence-based practices to support your body and mind at every
            step.
          </p>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={item}
              className="rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-8 shadow-soft hover:shadow-soft-lg transition-shadow duration-300 border border-beige-200/60"
            >
              <motion.div
                className="w-14 h-14 rounded-2xl bg-sage-100 flex items-center justify-center text-sage-600 mb-6"
                whileHover={{ rotate: 8, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <benefit.icon className="w-7 h-7" strokeWidth={1.5} />
              </motion.div>
              <h3 className="font-serif text-xl text-charcoal font-medium mb-3">
                {benefit.title}
              </h3>
              <p className="text-slate-muted leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionReveal>
  );
}
