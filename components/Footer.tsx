"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

const ADDRESS = "14 Bigha, Muni Ki Reti, Rishikesh, Uttarakhand 249137, India";
const PHONE_DISPLAY = "+91 93899 53873";
const PHONE_TEL = "+919389953873";
const EMAIL = "matrushaktiyog@gmail.com";

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
          className="flex flex-col xl:flex-row items-center justify-between gap-6 xl:gap-8"
        >
          {/* Brand */}
          <div className="text-center xl:text-left shrink-0">
            <p className="font-serif text-lg sm:text-xl text-charcoal font-semibold tracking-wide">
              Matrushakti Yog
            </p>
            <p className="text-charcoal-light/70 text-xs sm:text-sm mt-1 italic tracking-wide">
              Where Motherhood Meets Sacred Yoga
            </p>
          </div>

          {/* Contact + social */}
          <div className="flex flex-col xl:flex-row items-center justify-center gap-4 xl:gap-6 text-center xl:text-left">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center xl:justify-start gap-2 text-charcoal/75 hover:text-charcoal transition-colors text-sm sm:text-base"
            >
              <MapPin className="w-4 h-4 shrink-0 text-sage-500" />
              <span>{ADDRESS}</span>
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center justify-center xl:justify-start gap-2 text-charcoal/75 hover:text-charcoal transition-colors text-sm sm:text-base"
            >
              <Phone className="w-4 h-4 shrink-0 text-sage-500" />
              <span>{PHONE_DISPLAY}</span>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center xl:justify-start gap-2 text-charcoal/75 hover:text-charcoal transition-colors text-sm sm:text-base break-all"
            >
              <Mail className="w-4 h-4 shrink-0 text-sage-500" />
              <span>{EMAIL}</span>
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
