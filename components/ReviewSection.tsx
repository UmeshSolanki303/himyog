"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { Star, ChevronLeft, ChevronRight, X, ArrowRight, PenLine, Sparkles, MapPin, Quote } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { WriteReviewModal } from "./WriteReviewModal";
import { useReviews } from "@/lib/useReviews";
import { COURSE_META, reviewerLabel, formatLocation, type Review } from "@/lib/reviews-data";

const HOMEPAGE_REVIEW_COUNT = 8;

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < count ? "fill-gold-400 text-gold-400" : "fill-beige-200 text-beige-200"}`}
        />
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  onClick,
}: {
  review: Review;
  onClick: () => void;
}) {
  const meta = COURSE_META[review.courseSlug];
  const label = reviewerLabel(review.courseSlug);

  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-72 sm:w-80 rounded-2xl bg-white p-5 sm:p-6 border border-sage-100 shadow-soft mx-2 text-left hover:shadow-soft-lg hover:border-sage-200 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-sage-200 via-sage-400 to-sage-600 flex items-center justify-center">
            <span className="text-white text-xs font-serif font-semibold select-none">
              {review.initials}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-medium text-charcoal text-sm leading-tight truncate">{review.name}</p>
            <p className="text-slate-soft text-[11px] mt-0.5">{label} · {review.city ?? review.state}</p>
          </div>
        </div>
        <span className={`shrink-0 text-[10px] font-semibold px-2 py-1 rounded-full ${meta.badge}`}>
          {meta.title}
        </span>
      </div>

      <StarRating count={review.rating} />

      <p className="mt-3 text-charcoal-light text-sm leading-relaxed italic line-clamp-4 flex-1">
        &ldquo;{review.text}&rdquo;
      </p>
    </button>
  );
}

function ScrollRow({
  reviews,
  onCardClick,
}: {
  reviews: Review[];
  onCardClick: (r: Review) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
    el.style.cursor = "grabbing";
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    el.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5;
  }, []);

  const stopDrag = useCallback(() => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  }, []);

  return (
    <div className="relative group">
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 border border-beige-200 shadow-soft flex items-center justify-center hover:bg-white hover:border-sage-300 hover:shadow-soft-lg transition-all opacity-0 group-hover:opacity-100"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-4 h-4 text-charcoal-light" />
      </button>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 border border-beige-200 shadow-soft flex items-center justify-center hover:bg-white hover:border-sage-300 hover:shadow-soft-lg transition-all opacity-0 group-hover:opacity-100"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-4 h-4 text-charcoal-light" />
      </button>

      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-beige-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-beige-50 to-transparent z-10 pointer-events-none" />

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide py-2 px-4 cursor-grab select-none"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onClick={() => onCardClick(review)}
          />
        ))}
      </div>
    </div>
  );
}

function ReviewDetailModal({
  review,
  onClose,
}: {
  review: Review;
  onClose: () => void;
}) {
  const label = reviewerLabel(review.courseSlug);
  const meta = COURSE_META[review.courseSlug];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm" />

      {/* Card */}
      <motion.div
        className="relative bg-white rounded-3xl p-8 max-w-md w-full max-h-[85vh] overflow-y-auto shadow-soft-lg"
        initial={{ scale: 0.92, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 24, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-slate-muted hover:text-charcoal hover:bg-beige-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <span className={`inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full ${meta.badge}`}>
          {meta.title}
        </span>

        <div className="mt-3">
          <StarRating count={review.rating} />
        </div>

        <p className="mt-5 text-charcoal-light text-base sm:text-lg leading-relaxed italic whitespace-pre-line">
          &ldquo;{review.text}&rdquo;
        </p>

        <div className="mt-6 pt-5 border-t border-beige-200 flex items-center gap-3">
          {/* Avatar initial */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center shrink-0">
            <span className="font-serif text-sage-700 font-semibold text-sm">
              {review.initials}
            </span>
          </div>
          <div>
            <p className="font-semibold text-charcoal text-sm">{review.name}</p>
            <div className="flex items-center gap-1 text-slate-muted text-xs mt-0.5">
              <MapPin className="w-3 h-3 shrink-0" />
              <span>{formatLocation(review)} · {label}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Write-a-review widget ──────────────────────────────────────────────────
const WIDGET_TILT_RANGE = 7;

function WriteReviewWidget({ onOpen, reviews }: { onOpen: () => void; reviews: Review[] }) {
  const shouldReduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // Pointer-driven 3D tilt — subtle, spring-smoothed, disabled for reduced motion.
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const springCfg = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [WIDGET_TILT_RANGE, -WIDGET_TILT_RANGE]), springCfg);
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-WIDGET_TILT_RANGE, WIDGET_TILT_RANGE]), springCfg);
  const glowX = useTransform(pointerX, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(pointerY, [0, 1], ["0%", "100%"]);

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduce) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((e.clientX - rect.left) / rect.width);
    pointerY.set((e.clientY - rect.top) / rect.height);
  };

  const resetPointer = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  const spotlight = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(320px circle at ${x} ${y}, rgba(255,255,255,0.5), transparent 70%)`,
  );

  const avatarSample = reviews.slice(0, 4);
  const communitySize = reviews.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ perspective: 1200 }}
      className="relative"
    >
      {/* Rotating conic-gradient border ring */}
      {!shouldReduce && (
        <div className="absolute inset-0 rounded-[2rem] overflow-hidden" aria-hidden>
          <div className="absolute -inset-[60%] animate-spin-slow bg-[conic-gradient(from_0deg,#CB6490_0%,#D4A428_25%,#F0B488_50%,#88BA70_75%,#CB6490_100%)] opacity-70" />
        </div>
      )}

      <motion.div
        ref={cardRef}
        onMouseMove={handlePointerMove}
        onMouseLeave={resetPointer}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative m-[2px] overflow-hidden rounded-[calc(2rem-2px)] border border-sage-200/60 bg-gradient-to-br from-white via-sage-50/70 to-gold-50/50 p-6 sm:p-9 shadow-soft-lg"
      >
        {/* Pointer spotlight */}
        {!shouldReduce && (
          <motion.div
            className="pointer-events-none absolute inset-0 mix-blend-overlay"
            style={{ background: spotlight }}
            aria-hidden
          />
        )}

        {/* Giant decorative quote mark */}
        <Quote
          className="pointer-events-none absolute -top-4 right-4 sm:right-8 w-24 h-24 sm:w-32 sm:h-32 text-sage-900/[0.05] rotate-6"
          strokeWidth={0.5}
          fill="currentColor"
          aria-hidden
        />

        <div className="relative flex flex-col sm:flex-row items-center sm:items-center gap-6 sm:gap-10">
          <div className="flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-gold-600 text-xs font-semibold uppercase tracking-[0.14em]">
              {!shouldReduce ? (
                <motion.span
                  animate={{ rotate: [0, 15, -10, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </motion.span>
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              Share your journey
            </div>
            <h3 className="mt-2 font-serif text-xl sm:text-2xl md:text-[1.75rem] text-charcoal font-medium leading-snug">
              Been a mother or student{" "}
              <span className="text-shimmer italic">with us?</span>
            </h3>
            <p className="mt-1.5 text-slate-muted text-sm sm:text-base max-w-md">
              Your story could be the reassurance someone else needs today. It only takes a minute.
            </p>

            {/* Social proof avatar stack */}
            {avatarSample.length > 0 && (
              <div className="mt-4 flex items-center justify-center sm:justify-start gap-3">
                <div className="flex -space-x-2.5">
                  {avatarSample.map((r) => (
                    <div
                      key={r.id}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-sage-200 via-sage-400 to-sage-600 border-2 border-white flex items-center justify-center shadow-sm"
                      title={r.name}
                    >
                      <span className="text-white text-[10px] font-serif font-semibold select-none">
                        {r.initials}
                      </span>
                    </div>
                  ))}
                  {communitySize > avatarSample.length && (
                    <div className="w-8 h-8 rounded-full bg-beige-200 border-2 border-white flex items-center justify-center shadow-sm">
                      <span className="text-charcoal text-[10px] font-semibold select-none">
                        +{communitySize - avatarSample.length}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-xs text-slate-soft">
                  {communitySize}+ stories shared so far
                </span>
              </div>
            )}
          </div>

          <div className="relative shrink-0" style={{ transform: "translateZ(40px)" }}>
            {!shouldReduce && (
              <motion.span
                className="absolute inset-0 rounded-2xl bg-sage-400/40"
                animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              />
            )}
            <motion.button
              onClick={onOpen}
              whileHover={shouldReduce ? {} : { scale: 1.04, y: -2 }}
              whileTap={shouldReduce ? {} : { scale: 0.96 }}
              className="group relative inline-flex items-center gap-2 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white px-6 py-3.5 text-sm font-semibold shadow-soft-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2"
            >
              <PenLine className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:-rotate-12" />
              Write a Review
              <ArrowRight className="w-4 h-4 shrink-0 -mr-1 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ReviewSection() {
  const shouldReduce = useReducedMotion();
  const { reviews, addReview } = useReviews();
  const [selected, setSelected] = useState<Review | null>(null);
  const [writeOpen, setWriteOpen] = useState(false);

  const featured = useMemo(() => {
    return [...reviews]
      .sort((a, b) => {
        if (b.rating !== a.rating) return b.rating - a.rating;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
      .slice(0, HOMEPAGE_REVIEW_COUNT);
  }, [reviews]);

  return (
    <>
      <SectionReveal
        as="section"
        id="reviews"
        className="py-12 sm:py-20 md:py-24 bg-beige-50 overflow-hidden w-full"
        delay={0}
      >
        {/* Section header */}
        <div
          className="mx-auto px-4 sm:px-6 mb-10 sm:mb-14"
          style={{ maxWidth: "84rem" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-[1.5px] w-8 bg-gradient-to-r from-transparent to-sage-300" />
              <span className="text-sage-600 text-xs font-medium uppercase tracking-[0.15em]">
                Testimonials
              </span>
              <span className="h-[1.5px] w-8 bg-gradient-to-l from-transparent to-sage-300" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-charcoal font-medium">
              What Our Students Say
            </h2>
            <p className="mt-3 sm:mt-4 text-slate-muted text-base sm:text-lg max-w-2xl mx-auto">
              Stories from the mothers and students who found strength, calm, and
              community with us.
            </p>
            <p className="mt-2 text-slate-muted/70 text-xs sm:text-sm">
              Drag to scroll · Click any card to read in full
            </p>
          </motion.div>
        </div>

        {/* Rows */}
        {featured.length > 0 && (
          shouldReduce ? (
            /* Static grid for reduced-motion */
            <div
              className="mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              style={{ maxWidth: "84rem" }}
            >
              {featured.slice(0, 6).map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onClick={() => setSelected(review)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <ScrollRow reviews={featured} onCardClick={setSelected} />
            </div>
          )
        )}

        {/* CTAs: view all + write review widget */}
        <div
          className="mx-auto px-4 sm:px-6 mt-10 sm:mt-14 flex flex-col gap-6"
          style={{ maxWidth: "84rem" }}
        >
          <div className="flex justify-center">
            <Link
              href="/reviews"
              className="group inline-flex items-center gap-2 rounded-2xl bg-white border border-sage-200 text-sage-700 px-6 py-3 text-sm font-semibold shadow-soft hover:bg-sage-50 hover:border-sage-300 transition-all duration-200"
            >
              View All Reviews
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <WriteReviewWidget onOpen={() => setWriteOpen(true)} reviews={featured} />
        </div>
      </SectionReveal>

      {/* Popup */}
      <AnimatePresence>
        {selected && (
          <ReviewDetailModal review={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>

      {/* Write review modal */}
      <WriteReviewModal
        open={writeOpen}
        onClose={() => setWriteOpen(false)}
        onSubmitted={(review) => {
          addReview(review);
        }}
      />
    </>
  );
}
