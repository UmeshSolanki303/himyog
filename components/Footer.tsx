"use client";

import { motion } from "framer-motion";
import { Mail, Instagram, Facebook } from "lucide-react";

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal-dark text-beige-100 py-10 sm:py-14 w-full">
      <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "84rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8"
        >
          <div className="text-center md:text-left">
            <p className="font-serif text-lg sm:text-xl text-white font-medium">
              MatruShakti Yog
            </p>
            <p className="text-beige-300 text-xs sm:text-sm mt-1">
              Prenatal & Postnatal Health & Yoga
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
            <a
              href="mailto:matrushaktiyog@gmail.com"
              className="inline-flex items-center justify-center sm:justify-start gap-2 text-beige-200 hover:text-white transition-colors text-sm sm:text-base break-all"
            >
              <Mail className="w-5 h-5 shrink-0" />
              <span>matrushaktiyog@gmail.com</span>
            </a>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-beige-300 hover:text-white transition-colors p-1"
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
          className="mt-10 pt-8 border-t border-charcoal/60 text-center text-slate-soft text-sm"
        >
          <p>
            © {new Date().getFullYear()} MatruShaktiYog. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
