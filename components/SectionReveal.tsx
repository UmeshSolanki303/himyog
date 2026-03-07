"use client";

import { motion } from "framer-motion";

const defaultVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "section" | "div";
  id?: string;
}

export function SectionReveal({
  children,
  className = "",
  delay = 0,
  as: Component = "section",
  id,
}: SectionRevealProps) {
  const MotionTag = Component === "section" ? motion.section : motion.div;
  return (
    <MotionTag
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={defaultVariants}
      custom={delay}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
