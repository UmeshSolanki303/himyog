"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ContentSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function ContentSection({
  title,
  children,
  className = "",
}: ContentSectionProps) {
  return (
    <section className={`py-12 sm:py-16 w-full ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-2xl sm:text-3xl text-charcoal font-medium mb-8"
          >
            {title}
          </motion.h2>
        )}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="prose prose-lg max-w-none text-charcoal-light"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export function ContentImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "center 0.6"],
  });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0% 35% 0% 35% round 24px)", "inset(0% 0% 0% 0% round 12px)"]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <figure ref={ref} className="my-10">
      <motion.div
        style={{ clipPath, opacity }}
        className="aspect-video bg-beige-200 overflow-hidden"
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${src})` }}
          role="img"
          aria-label={alt}
        />
      </motion.div>
      {caption && (
        <motion.figcaption
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-3 text-sm text-slate-muted text-center"
        >
          {caption}
        </motion.figcaption>
      )}
    </figure>
  );
}

export function ContentVideo({ src, title }: { src?: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-10"
    >
      <div className="aspect-video rounded-2xl overflow-hidden bg-charcoal-dark flex items-center justify-center">
        {src ? (
          <iframe
            src={src}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="text-beige-300 text-center p-8">
            <p className="font-medium">Video placeholder</p>
            <p className="text-sm mt-2">
              Add your YouTube/Vimeo embed URL in the page component.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
