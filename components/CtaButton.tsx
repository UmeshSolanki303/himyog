"use client";

import { motion } from "framer-motion";
import { AnchorHTMLAttributes } from "react";

interface CtaButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  wrapperClassName?: string;
}

export function CtaButton({ children, className = "", wrapperClassName = "", ...props }: CtaButtonProps) {
  return (
    <div className={`relative inline-flex ${wrapperClassName}`}>
      <motion.span
        className="absolute inset-0 rounded-[inherit] bg-sage-400/30"
        animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <a className={`relative z-10 ${className}`} {...props}>
        {children}
      </a>
    </div>
  );
}
