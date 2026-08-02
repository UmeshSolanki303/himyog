"use client";

import { motion } from "framer-motion";
import { Mail, Instagram, Facebook } from "lucide-react";

const socialLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/_matrushakti_yog_/",
  },
  { icon: Facebook, label: "Facebook", href: "#" },
];

export function Footer() {
  return (
    <footer
      className="w-full py-10 sm:py-14"
      style={{
        background:
          "linear-gradient(160deg, #FEF9F0 0%, #FAF0D8 50%, #F5E8C4 100%)",
      }}
    >
      {/* Rose-maroon accent rule at the top */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-sage-500/40 to-transparent mb-10 sm:mb-14" />

      <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "84rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8"
        >
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-serif text-lg sm:text-xl text-charcoal font-semibold tracking-wide">
              Matrushakti Yog
            </p>
            <p className="text-charcoal-light/70 text-xs sm:text-sm mt-1 italic tracking-wide">
              Where Motherhood Meets Sacred Yoga
            </p>
          </div>

          {/* Contact + social */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
            <a
              href="mailto:matrushaktiyog@gmail.com"
              className="inline-flex items-center justify-center sm:justify-start gap-2 text-charcoal/75 hover:text-charcoal transition-colors text-sm sm:text-base break-all"
            >
              <Mail className="w-4 h-4 shrink-0 text-sage-500" />
              <span>matrushaktiyog@gmail.com</span>
            </a>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-charcoal/40 hover:text-sage-600 transition-colors p-1"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 pt-8 border-t border-charcoal/10 text-center text-charcoal/40 text-xs sm:text-sm"
        >
          <p>
            © {new Date().getFullYear()} Matrushakti Yog. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
