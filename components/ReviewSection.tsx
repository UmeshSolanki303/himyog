"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, X } from "lucide-react";
import { SectionReveal } from "./SectionReveal";

interface Review {
  quote: string;
  name: string;
  context: string;
  stars: number;
}

const row1: Review[] = [
  {
    quote: `To Himani Ma'am 🙏
I just wanted to take a moment to express my deepest gratitude to you. You have been truly incredible, and in ways you may not even realize, you have helped me grow and heal during a time when I needed it the most.Your guidance, calm presence, and positive energy have brought so much peace and strength into my life. Even without knowing everything I was going through, you made a difference that I will always carry with me.
I also humbly seek your blessings for something very important in my life. Your blessings mean a lot to me, and I truly believe in your positive energy.
Thank you once again for being such a beautiful soul and an inspiring teacher.
With heartfelt gratitude,`,
    name: "Himakshi Vyas",
    context: "Prenatal-Postnatal TTC",
    stars: 5,
  },
  // {
  //   quote:
  //     "The postnatal sessions helped me rediscover my body after birth. I recovered faster and felt genuinely empowered as a new mother.",
  //   name: "Divya Krishnamurthy",
  //   context: "Postnatal Recovery",
  //   stars: 5,
  // },
  // {
  //   quote:
  //     "I attended the information sessions and they were incredible — evidence-based, compassionate, and exactly what I needed in my first trimester.",
  //   name: "Meera Joshi",
  //   context: "Information Sessions",
  //   stars: 5,
  // },
  // {
  //   quote:
  //     "The baby-and-me classes were so special. A beautiful way to bond with my little one while taking care of myself in the fourth trimester.",
  //   name: "Kavya Nair",
  //   context: "Baby & Me Classes",
  //   stars: 5,
  // },
  // {
  //   quote:
  //     "As a first-time mum, I was nervous about prenatal yoga. The instructor made everything feel safe, joyful, and welcoming from day one.",
  //   name: "Anika Sharma",
  //   context: "Prenatal Yoga · 1st Trimester",
  //   stars: 5,
  // },
];

const row2: Review[] = [];
// [
//   {
//     quote:
//       "The pelvic floor work in the postnatal classes was life-changing. I wish every new mother knew about these resources.",
//     name: "Ritika Venugopal",
//     context: "Postnatal Recovery",
//     stars: 5,
//   },
//   {
//     quote:
//       "I joined in my third trimester and immediately felt at home. The breathwork alone was worth it for my birth preparation.",
//     name: "Preeti Subramaniam",
//     context: "Prenatal Yoga · 3rd Trimester",
//     stars: 5,
//   },
//   {
//     quote:
//       "Matrushakti Yog is more than a yoga class — it's a community of mothers who truly understand and support each other.",
//     name: "Lakshmi Iyer",
//     context: "Prenatal & Postnatal",
//     stars: 5,
//   },
//   {
//     quote:
//       "The consultants and instructors work together seamlessly. I felt supported by an entire caring team, not just one teacher.",
//     name: "Swati Desai",
//     context: "Holistic Programme",
//     stars: 5,
//   },
//   {
//     quote:
//       "After a difficult first birth, I was anxious about my second pregnancy. These classes gave me back my confidence and peace.",
//     name: "Deepa Menon",
//     context: "Prenatal Yoga",
//     stars: 5,
//   },
// ];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
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
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-72 sm:w-80 rounded-2xl bg-white p-5 sm:p-6 border border-sage-100 shadow-soft mx-2 text-left hover:shadow-soft-lg hover:border-sage-200 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      <StarRating count={review.stars} />
      <p className="mt-3 text-charcoal-light text-sm leading-relaxed italic line-clamp-4">
        &ldquo;{review.quote}&rdquo;
      </p>
      <div className="mt-4 pt-3 border-t border-beige-200/80">
        <p className="font-medium text-charcoal text-sm">{review.name}</p>
        <p className="text-slate-muted text-xs mt-0.5">{review.context}</p>
      </div>
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
        {reviews.map((review, i) => (
          <ReviewCard
            key={i}
            review={review}
            onClick={() => onCardClick(review)}
          />
        ))}
      </div>
    </div>
  );
}

function ReviewModal({
  review,
  onClose,
}: {
  review: Review;
  onClose: () => void;
}) {
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
        className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-soft-lg"
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

        <StarRating count={review.stars} />

        <p className="mt-5 text-charcoal-light text-base sm:text-lg leading-relaxed italic">
          &ldquo;{review.quote}&rdquo;
        </p>

        <div className="mt-6 pt-5 border-t border-beige-200 flex items-center gap-3">
          {/* Avatar initial */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center shrink-0">
            <span className="font-serif text-sage-700 font-semibold text-sm">
              {review.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-semibold text-charcoal text-sm">{review.name}</p>
            <p className="text-slate-muted text-xs mt-0.5">{review.context}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ReviewSection() {
  const shouldReduce = useReducedMotion();
  const [selected, setSelected] = useState<Review | null>(null);

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
              What Mothers Say
            </h2>
            <p className="mt-3 sm:mt-4 text-slate-muted text-base sm:text-lg max-w-2xl mx-auto">
              Stories from mothers who found strength, calm, and community with
              us.
            </p>
            <p className="mt-2 text-slate-muted/70 text-xs sm:text-sm">
              Drag to scroll · Click any card to read in full
            </p>
          </motion.div>
        </div>

        {/* Rows */}
        {shouldReduce ? (
          /* Static grid for reduced-motion */
          <div
            className="mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            style={{ maxWidth: "84rem" }}
          >
            {[...row1, ...row2].slice(0, 6).map((review, i) => (
              <ReviewCard
                key={i}
                review={review}
                onClick={() => setSelected(review)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <ScrollRow reviews={row1} onCardClick={setSelected} />
            {/* <ScrollRow reviews={row2} onCardClick={setSelected} /> */}
          </div>
        )}
      </SectionReveal>

      {/* Popup */}
      <AnimatePresence>
        {selected && (
          <ReviewModal review={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
