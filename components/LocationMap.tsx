"use client";

import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";

const ADDRESS = "14 Bigha, Muni Ki Reti, Rishikesh, Uttarakhand 249137, India";

// The verified pin for our actual Google Business listing (30.1160708,
// 78.2987611) — coordinates, not a text geocode, so the embed always lands
// on the exact place rather than Google's best guess at the address string.
const LAT = 30.1160708;
const LNG = 78.2987611;

// No API key needed — Google's long-standing "output=embed" URL renders a
// basic interactive map for a plain iframe, same mechanism Google itself
// used before the paid Maps Embed API existed.
const EMBED_SRC = `https://www.google.com/maps?q=${LAT},${LNG}&output=embed`;

// The actual verified listing URL — not a generic search link — so "Open in
// Google Maps" lands on our real Business Profile with its own reviews and
// photos attached.
const DIRECTIONS_URL =
  "https://www.google.com/maps/place//@30.1160708,78.2987611,17z/data=!3m1!4b1!4m3!3m2!1s0x39091746924f7bc5:0xde2148655cf60a6d!12e1";

interface LocationMapProps {
  title?: string;
  description?: string;
  className?: string;
}

export function LocationMap({
  title = "Find Us",
  description = "Based in Rishikesh, the yoga capital of the world.",
  className = "",
}: LocationMapProps) {
  return (
    <section className={`py-12 sm:py-20 w-full ${className}`}>
      <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "84rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-600 mb-3">
            Our Location
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal font-medium">
            {title}
          </h2>
          <p className="mt-3 text-slate-muted text-base max-w-xl mx-auto">
            {description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="rounded-3xl overflow-hidden border border-sage-100/80 shadow-soft-lg bg-white"
        >
          <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] bg-beige-100">
            <iframe
              src={EMBED_SRC}
              title="Matrushakti Yog location on Google Maps"
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 shrink-0 text-sage-500 mt-0.5" />
              <p className="text-sm text-charcoal-light leading-relaxed">
                {ADDRESS}
              </p>
            </div>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 shrink-0 rounded-xl bg-sage-600 hover:bg-sage-700 text-white px-5 py-2.5 text-sm font-semibold transition-colors"
            >
              Open in Google Maps
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
