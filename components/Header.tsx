"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf } from "lucide-react";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/courses", label: "Courses" },
  { href: "/prenatal", label: "Prenatal" },
  { href: "/postnatal", label: "Postnatal" },
  { href: "/information-sessions", label: "Information" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className="relative pb-0.5 text-xs sm:text-sm whitespace-nowrap transition-colors text-slate-muted hover:text-charcoal"
    >
      {label}
      <motion.span
        className="absolute bottom-0 left-0 h-[1.5px] rounded-full bg-sage-500"
        initial={{ width: isActive ? "100%" : "0%" }}
        animate={{ width: isActive ? "100%" : "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </Link>
  );
}

export function Header() {
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(current > previous && current > 80);
  });

  return (
    <motion.header
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 w-full min-h-[var(--header-height)] flex items-center bg-beige-100/95 backdrop-blur-sm border-b border-beige-200/60">
      <div
        className="mx-auto w-full flex items-center justify-between gap-4 pl-4 pr-0 sm:pr-6"
        style={{ maxWidth: "84rem" }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 min-w-0 shrink-0"
          aria-label="MatruShakti Yog - Home"
        >
          <span className="flex shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-sage-100 text-sage-600">
            <Leaf className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
          </span>
          <span className="font-serif text-lg sm:text-xl font-medium text-charcoal hover:text-sage-600 transition-colors truncate">
            MatruShakti Yog
          </span>
        </Link>
        <nav className="flex items-center gap-3 sm:gap-6 shrink-0">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>
      </div>
      <motion.div
        style={{ scaleX, originX: 0 }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sage-400 via-peach-200 to-sage-600"
      />
    </motion.header>
  );
}
