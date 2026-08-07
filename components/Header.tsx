"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { assetPath } from "@/lib/assetPath";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Heart,
  Flower2,
  Sparkles,
  Moon,
  Palmtree,
  Users,
  Brain,
} from "lucide-react";

// Order matches the school's official course listing.
const COURSE_LINKS = [
  {
    href: "/courses/preconception",
    label: "Preconception",
    tagline: "Prepare mind & body",
    icon: Heart,
  },
  {
    href: "/prenatal",
    label: "Prenatal",
    tagline: "Nurture your pregnancy",
    icon: Flower2,
  },
  {
    href: "/courses/garbhsamskar",
    label: "Garbhsamskar",
    tagline: "Sacred bonding rituals",
    icon: Sparkles,
  },
  {
    href: "/postnatal",
    label: "Postnatal",
    tagline: "Restore & recover",
    icon: Moon,
  },
  {
    href: "/courses/pregnancy-wellness",
    label: "Pregnancy Wellness Retreat",
    tagline: "Immersive getaway",
    icon: Palmtree,
  },
  {
    href: "/courses/ttc-course",
    label: "TTC Yoga",
    tagline: "Support your journey",
    icon: Users,
  },
  {
    href: "/courses/meditation",
    label: "Meditation",
    tagline: "Calm the mind",
    icon: Brain,
  },
];

const NAV_LINKS = [
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
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

function CoursesDropdown() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isActive =
    pathname === "/courses" ||
    pathname === "/prenatal" ||
    pathname === "/postnatal" ||
    COURSE_LINKS.some((c) => pathname === c.href);

  function openNow() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function closeSoon() {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  return (
    <div
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
    >
      <Link
        href="/courses"
        className={`relative pb-0.5 inline-flex items-center gap-1 text-xs sm:text-sm whitespace-nowrap transition-colors ${
          isActive ? "text-charcoal" : "text-slate-muted hover:text-charcoal"
        }`}
        aria-haspopup="true"
        aria-expanded={open}
      >
        Courses
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
        <motion.span
          className="absolute bottom-0 left-0 h-[1.5px] rounded-full bg-sage-500"
          initial={{ width: isActive ? "100%" : "0%" }}
          animate={{ width: isActive ? "100%" : "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </Link>

      <AnimatePresence>
        {open && (
          // Positioning lives on this static wrapper (not the animated child) because
          // Framer Motion writes its own inline `transform`, which would clobber the
          // Tailwind `-translate-x-1/2` centering class if it lived on the same element.
          <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 w-[21rem]">
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Little pointer arrow */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-l border-t border-sage-100 rounded-sm" />

            <div className="relative w-full rounded-2xl bg-white border border-sage-100 shadow-soft-lg overflow-hidden">
              {/* Decorative gradient header strip */}
              <div className="relative h-1.5 bg-gradient-to-r from-sage-400 via-gold-400 to-warm-sage-400" />

              <div className="py-2.5">
                {COURSE_LINKS.map((c, i) => {
                  const active = pathname === c.href;
                  const Icon = c.icon;
                  return (
                    <motion.div
                      key={c.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.18, delay: i * 0.035 }}
                    >
                      <Link
                        href={c.href}
                        className={`group flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl text-sm transition-all duration-200 ${
                          active
                            ? "text-sage-600 bg-sage-50"
                            : "text-charcoal-light hover:bg-gradient-to-r hover:from-sage-50 hover:to-beige-50 hover:text-charcoal hover:translate-x-0.5"
                        }`}
                      >
                        <span
                          className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 transition-all duration-200 ${
                            active
                              ? "bg-sage-100 text-sage-600"
                              : "bg-beige-100 text-sage-500 group-hover:bg-sage-100 group-hover:text-sage-600 group-hover:scale-110"
                          }`}
                        >
                          <Icon className="w-4 h-4" strokeWidth={2} />
                        </span>
                        <span className="flex flex-col min-w-0">
                          <span className="font-medium leading-tight truncate">
                            {c.label}
                          </span>
                          <span className="text-[11px] text-slate-soft leading-tight truncate">
                            {c.tagline}
                          </span>
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <div className="pt-2.5 pb-3 px-4 border-t border-beige-100 bg-beige-50/50">
                <Link
                  href="/courses"
                  className="group inline-flex items-center gap-1.5 text-xs font-semibold text-sage-600 hover:text-sage-700 transition-colors"
                >
                  View all courses
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LogoBadge() {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <span className="flex shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl items-center justify-center bg-gradient-to-br from-sage-100 to-sage-200 ring-2 ring-sage-300/50 shadow-soft">
        <span className="font-serif text-sage-700 text-base sm:text-lg font-bold select-none">
          MY
        </span>
      </span>
    );
  }

  return (
    <span className="flex shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl overflow-hidden bg-white ring-2 ring-sage-200/70 shadow-soft">
      <img
        src={assetPath("/images/logo-bk.png")}
        alt=""
        className="w-full h-full object-contain"
        style={{ mixBlendMode: "multiply" }}
        onError={() => setImgError(true)}
      />
    </span>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center w-5 h-5 gap-[5px]">
      <motion.span
        className="block w-5 h-[1.5px] bg-charcoal rounded-full origin-center"
        animate={{ rotate: open ? 45 : 0, y: open ? 6.5 : 0 }}
        transition={{ duration: 0.22 }}
      />
      <motion.span
        className="block w-5 h-[1.5px] bg-charcoal rounded-full"
        animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
        transition={{ duration: 0.18 }}
      />
      <motion.span
        className="block w-5 h-[1.5px] bg-charcoal rounded-full origin-center"
        animate={{ rotate: open ? -45 : 0, y: open ? -6.5 : 0 }}
        transition={{ duration: 0.22 }}
      />
    </div>
  );
}

export function Header() {
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (current > previous && current > 80) {
      setHidden(true);
      setMobileOpen(false);
    } else {
      setHidden(false);
    }
  });

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <motion.header
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 w-full"
    >
      {/* Main bar */}
      <div className="min-h-[var(--header-height)] flex items-center bg-sage-50/95 backdrop-blur-sm border-b border-sage-100/80">
        <div
          className="mx-auto w-full flex items-center justify-between gap-3 px-4 sm:px-6"
          style={{ maxWidth: "84rem" }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 min-w-0 shrink-0"
            aria-label="Matrushakti Yog - Home"
          >
            <LogoBadge />
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-sm sm:text-lg font-semibold text-charcoal hover:text-sage-600 transition-colors truncate leading-tight">
                Matrushakti Yog
              </span>
              <span className="text-[9px] sm:text-xs text-sage-600 tracking-wide hidden sm:block leading-tight">
                Where Motherhood Meets Sacred Yoga
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 shrink-0">
            <CoursesDropdown />
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl hover:bg-sage-100/60 transition-colors shrink-0"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>

        {/* Progress bar */}
        <motion.div
          style={{ scaleX, originX: 0 }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sage-500 via-gold-400 to-sage-600"
        />
      </div>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden bg-sage-50/98 backdrop-blur-md border-b border-sage-100 shadow-soft"
          >
            <div className="px-4 py-3 flex flex-col">
              <span className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-sage-500/80">
                Courses
              </span>
              {COURSE_LINKS.map((link, i) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.18, delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? "text-sage-600 bg-sage-100/60"
                          : "text-charcoal hover:bg-sage-100/40 hover:text-sage-700"
                      }`}
                    >
                      <span
                        className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 transition-colors ${
                          isActive
                            ? "bg-sage-100 text-sage-600"
                            : "bg-beige-100 text-sage-500"
                        }`}
                      >
                        <Icon className="w-4 h-4" strokeWidth={2} />
                      </span>
                      <span className="flex flex-col min-w-0">
                        <span className="truncate">{link.label}</span>
                        <span className="text-[11px] font-normal text-slate-soft truncate">
                          {link.tagline}
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
              <Link
                href="/courses"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-xs font-medium text-sage-600 hover:text-sage-700 transition-colors"
              >
                View all courses →
              </Link>

              <div className="my-2 h-px bg-beige-200" />

              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.18, delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-3.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? "text-sage-600 bg-sage-100/60"
                          : "text-charcoal hover:bg-sage-100/40 hover:text-sage-700"
                      }`}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-sage-500 shrink-0" />
                      )}
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
