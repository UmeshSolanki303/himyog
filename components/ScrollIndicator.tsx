"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.8 }}
      aria-hidden="true"
    >
      <span className="text-[10px] text-charcoal/35 uppercase tracking-[0.18em] font-medium">
        scroll
      </span>
      <motion.div
        animate={
          shouldReduce ? {} : { y: [0, 5, 0], opacity: [0.35, 0.7, 0.35] }
        }
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="text-charcoal/35"
      >
        <ChevronDown className="w-5 h-5" strokeWidth={1.5} />
      </motion.div>
    </motion.div>
  );
}
