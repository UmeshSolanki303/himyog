"use client";

import { motion } from "framer-motion";

export interface GalleryItem {
  src: string;
  alt: string;
  caption?: string;
  description?: string;
}

interface GallerySectionProps {
  title: string;
  items: GalleryItem[];
  className?: string;
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const card = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function GallerySection({
  title,
  items,
  className = "",
}: GallerySectionProps) {
  return (
    <section
      className={`py-14 sm:py-20 w-full overflow-hidden ${className}`}
      aria-label="Gallery"
    >
      <div className=" mx-auto px-4 sm:px-6" style={{ maxWidth: "84rem" }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal font-medium text-center mb-10 sm:mb-14 max-w-2xl mx-auto"
        >
          {title}
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {items.map((item, index) => (
            <motion.article
              key={item.src + index}
              variants={card}
              className="group relative"
            >
              <motion.div
                className="relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden bg-beige-200 shadow-soft border border-beige-200/80"
                whileHover={{
                  y: -8,
                  boxShadow:
                    "0 20px 50px -12px rgba(122, 139, 98, 0.2), 0 8px 24px -4px rgba(0, 0, 0, 0.08)",
                  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.src})` }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  aria-hidden
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/80 via-charcoal-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  aria-hidden
                />
                <div className="absolute inset-0 flex items-end p-4 sm:p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  {item.description && item.description.length > 0 ? (
                    <p className="text-beige-100 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                      {item.description}
                    </p>
                  ) : (
                    <p className="text-beige-100 text-sm sm:text-base font-medium drop-shadow-md">
                      {item.caption}
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
