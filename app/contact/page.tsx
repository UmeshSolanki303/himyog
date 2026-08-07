"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  ArrowLeft,
  Send,
  CheckCircle2,
  Loader2,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { courses } from "@/lib/courses";

// ─── Background gradient matching hero ──────────────────────────────────────
const CONTACT_GRADIENT = `
  radial-gradient(ellipse 70% 60% at 10% 20%, rgba(240, 188, 204, 0.45) 0%, transparent 55%),
  radial-gradient(ellipse 60% 50% at 90% 70%, rgba(184, 64, 112, 0.10) 0%, transparent 55%),
  radial-gradient(ellipse 50% 45% at 60% 5%,  rgba(248, 212, 180, 0.30) 0%, transparent 55%),
  radial-gradient(ellipse 40% 35% at 20% 90%, rgba(212, 164, 40, 0.08) 0%, transparent 50%),
  linear-gradient(145deg, #FDFAF8 0%, #FDF6F8 50%, #F5E8F0 100%)
`;

// ─── Floating orbs ───────────────────────────────────────────────────────────
const orbs = [
  {
    w: 400,
    h: 320,
    left: "-5%",
    top: "5%",
    color: "#B84070",
    opacity: 0.07,
    dur: 16,
    delay: 0,
  },
  {
    w: 280,
    h: 280,
    left: "70%",
    top: "60%",
    color: "#D4A428",
    opacity: 0.07,
    dur: 13,
    delay: 2,
  },
  {
    w: 200,
    h: 200,
    left: "85%",
    top: "8%",
    color: "#F0BCCC",
    opacity: 0.11,
    dur: 11,
    delay: 1,
  },
  {
    w: 160,
    h: 160,
    left: "40%",
    top: "80%",
    color: "#9C2458",
    opacity: 0.05,
    dur: 15,
    delay: 4,
  },
];

function FloatingOrbs() {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return null;
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.w,
            height: orb.h,
            left: orb.left,
            top: orb.top,
            backgroundColor: orb.color,
            opacity: orb.opacity,
            filter: "blur(70px)",
          }}
          animate={{
            y: [0, -18, 10, 0],
            x: [0, 12, -8, 0],
            scale: [1, 1.07, 0.95, 1],
          }}
          transition={{
            duration: orb.dur,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Contact info items ───────────────────────────────────────────────────────
const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "matrushaktiyog@gmail.com",
    href: "mailto:matrushaktiyog@gmail.com",
    color: "from-sage-100 to-sage-50",
    iconColor: "text-sage-600",
  },
  {
    icon: Phone,
    label: "WhatsApp / Call",
    value: "+91 9389953873",
    href: "tel:+91XXXXXXXXXX",
    color: "from-warm-sage-100 to-warm-sage-50",
    iconColor: "text-warm-sage-500",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Online · India-wide",
    href: null,
    color: "from-gold-100 to-gold-50",
    iconColor: "text-gold-500",
  },
];

const socialLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/_matrushakti_yog_",
  },
  { icon: Facebook, label: "Facebook", href: "#" },
];

const courseOptions = [
  ...courses.map((c) => c.title),
  "Other / General Enquiry",
];

// ─── Form field components ────────────────────────────────────────────────────
function FloatingLabel({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-[0.12em] text-sage-600"
      >
        {label}
        {required && <span className="text-sage-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border border-sage-100 bg-white/80 px-4 py-3.5 text-charcoal text-sm placeholder:text-slate-soft focus:outline-none focus:ring-2 focus:ring-sage-400/60 focus:border-sage-300 transition-all duration-200 backdrop-blur-sm";

// ─── Contact form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const shouldReduce = useReducedMotion();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", course: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative rounded-3xl bg-white/70 border border-sage-100/80 shadow-soft-lg backdrop-blur-md p-6 sm:p-8 lg:p-10"
    >
      {/* Decorative corner accent */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 100% 0%, rgba(184,64,112,0.06) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col items-center justify-center text-center py-16 gap-6"
          >
            {/* Pulsing success ring */}
            <div className="relative">
              {!shouldReduce && (
                <>
                  <motion.div
                    className="absolute inset-[-16px] rounded-full border border-sage-300/40"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    aria-hidden
                  />
                  <motion.div
                    className="absolute inset-[-8px] rounded-full border border-sage-300/30"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{
                      duration: 2.5,
                      delay: 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    aria-hidden
                  />
                </>
              )}
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center">
                <CheckCircle2
                  className="w-10 h-10 text-sage-600"
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium">
                Message Received
              </h3>
              <p className="mt-3 text-slate-muted text-base leading-relaxed max-w-xs mx-auto">
                Thank you for reaching out. We&apos;ll get back to you within 24
                hours.
              </p>
            </div>
            <div className="flex items-center gap-2 text-gold-500 text-sm">
              <Sparkles className="w-4 h-4" />
              <span className="italic font-medium">Namaste 🙏</span>
            </div>
            <button
              onClick={() => setStatus("idle")}
              className="mt-2 text-sage-600 hover:text-sage-700 text-sm font-medium underline underline-offset-4 transition-colors"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            {/* Form header */}
            <div className="mb-2">
              <div className="flex items-center gap-3 mb-1">
                <span className="h-[1.5px] w-6 bg-sage-400" />
                <span className="text-sage-600 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em]">
                  Get in touch
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium leading-snug">
                Start Your Journey
              </h2>
              <p className="mt-1.5 text-slate-muted text-sm leading-relaxed">
                Fill in the form below and we&apos;ll reach out to guide you to
                the right class.
              </p>
            </div>

            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FloatingLabel id="name" label="Your name" required>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Priya Sharma"
                  className={inputClass}
                />
              </FloatingLabel>
              <FloatingLabel id="email" label="Email address" required>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@email.com"
                  className={inputClass}
                />
              </FloatingLabel>
            </div>

            {/* Phone + Course row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FloatingLabel id="phone" label="WhatsApp / Phone">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className={inputClass}
                />
              </FloatingLabel>
              <FloatingLabel id="course" label="Interested in">
                <div className="relative">
                  <select
                    id="course"
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                  >
                    <option value="">Select a class…</option>
                    {courseOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-soft pointer-events-none" />
                </div>
              </FloatingLabel>
            </div>

            {/* Message */}
            <FloatingLabel id="message" label="Your message" required>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell us where you are in your journey — trimester, weeks postpartum, any questions or concerns…"
                className={`${inputClass} resize-none`}
              />
            </FloatingLabel>

            {/* Error banner */}
            <AnimatePresence>
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3"
                >
                  Something went wrong. Please email us directly at{" "}
                  <a
                    href="mailto:matrushaktiyog@gmail.com"
                    className="underline"
                  >
                    matrushaktiyog@gmail.com
                  </a>
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileHover={shouldReduce ? {} : { scale: 1.02, y: -2 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
              className="mt-1 inline-flex items-center justify-center gap-2.5 rounded-2xl bg-sage-600 text-white px-8 py-4 text-sm font-semibold shadow-soft hover:bg-sage-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </motion.button>

            <p className="text-xs text-slate-soft text-center">
              We typically reply within 24 hours · Your details are never shared
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Instructor card ──────────────────────────────────────────────────────────
function InstructorCard({ shouldReduce }: { shouldReduce: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.65,
        delay: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="rounded-3xl bg-white/60 border border-sage-100/80 shadow-soft backdrop-blur-sm p-6 sm:p-7 flex items-start gap-5"
    >
      {/* Avatar with breathing rings */}
      <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20">
        {!shouldReduce && (
          <>
            <motion.div
              className="absolute inset-[-6px] rounded-full border border-sage-300/40"
              animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              aria-hidden
            />
            <motion.div
              className="absolute inset-[-2px] rounded-full border border-gold-300/50"
              animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{
                duration: 4,
                delay: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              aria-hidden
            />
          </>
        )}
        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-sage-200 via-sage-400 to-sage-600 flex items-center justify-center overflow-hidden">
          <span className="text-white font-serif text-2xl sm:text-3xl font-medium select-none">
            HD
          </span>
        </div>
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-500 mb-1">
          Himani Dwivedi
        </p>
        <h3 className="font-serif text-lg sm:text-xl text-charcoal font-medium leading-tight">
          Founder & Lead Instructor
        </h3>
        <p className="text-sage-600 text-xs sm:text-sm font-medium mt-0.5">
          RYT-500 · Pre/Postnatal Specialist
        </p>
        <p className="text-slate-muted text-xs sm:text-sm leading-relaxed mt-2.5 line-clamp-3">
          Over a decade weaving yoga into the journey of motherhood — blending
          ancient yogic wisdom with modern prenatal & postnatal science.
        </p>
      </div>
    </motion.div>
  );
}

// ─── Contact info card ────────────────────────────────────────────────────────
function InfoCard({
  icon: Icon,
  label,
  value,
  href,
  color,
  iconColor,
  index,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string | null;
  color: string;
  iconColor: string;
  index: number;
}) {
  const shouldReduce = useReducedMotion();

  const inner = (
    <motion.div
      initial={{ opacity: 0, x: -18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.55,
        delay: 0.6 + index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={shouldReduce ? {} : { x: 4, transition: { duration: 0.2 } }}
      className="flex items-center gap-4 rounded-2xl bg-white/60 border border-sage-100/70 shadow-soft backdrop-blur-sm px-5 py-4 group transition-all duration-200 hover:border-sage-200 hover:shadow-soft-lg"
    >
      <div
        className={`shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}
      >
        <Icon className={`w-5 h-5 ${iconColor}`} strokeWidth={1.5} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-soft mb-0.5">
          {label}
        </p>
        <p className="text-charcoal text-sm font-medium truncate">{value}</p>
      </div>
    </motion.div>
  );

  if (href) {
    return <a href={href}>{inner}</a>;
  }
  return inner;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const shouldReduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <main>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden w-full"
      >
        <motion.div
          className="absolute inset-0 z-0"
          style={shouldReduce ? {} : { y: bgY }}
        >
          <div
            className="absolute inset-[-10%]"
            style={{ background: CONTACT_GRADIENT }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-beige-100/60" />
        </motion.div>

        <FloatingOrbs />

        {/* Decorative breathing rings — desktop only */}
        {!shouldReduce && (
          <div
            className="absolute right-[-6rem] top-[-4rem] w-[480px] h-[480px] hidden lg:block pointer-events-none"
            aria-hidden
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border border-sage-300/20"
                animate={{
                  scale: [1, 1.08 + i * 0.04, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 4 + i * 0.7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 1.2,
                }}
              />
            ))}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(184,64,112,0.08) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
          </div>
        )}

        <div
          className="relative z-10 mx-auto px-4 sm:px-6 pt-8 pb-10 sm:pt-12 sm:pb-16"
          style={{ maxWidth: "84rem" }}
        >
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-700 text-xs sm:text-sm font-medium mb-8 sm:mb-10 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              Back to home
            </Link>
          </motion.div>

          {/* Gradient rule */}
          <motion.div
            className="h-[2px] rounded-full bg-gradient-to-r from-sage-500 via-sage-400 to-transparent mb-6"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{ width: "4rem" }}
          />

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="text-sage-600 text-[11px] font-semibold uppercase tracking-[0.2em]">
              Contact Us
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="font-serif text-3xl sm:text-5xl md:text-[3.5rem] font-semibold text-charcoal leading-[1.08] tracking-tight"
          >
            Connect with{" "}
            <span className="text-shimmer italic">Your Instructor</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.35,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="mt-5 flex items-stretch gap-4 max-w-2xl"
          >
            <div className="w-[3px] shrink-0 rounded-full bg-gradient-to-b from-sage-500 to-sage-200" />
            <p className="text-charcoal/70 text-base sm:text-lg leading-relaxed">
              Whether you&apos;re expecting, recently postpartum, or simply
              curious — we&apos;re here to listen, guide, and welcome you into
              our community.
            </p>
          </motion.div>

          {/* Dot markers */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-7 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-sage-500" />
            <span className="w-2 h-2 rounded-full bg-gold-400/70" />
            <span className="w-2 h-2 rounded-full bg-peach-300/80" />
            <span className="ml-2 h-px w-16 bg-beige-300" />
          </motion.div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section
        className="w-full pb-20 sm:pb-28"
        style={{
          background:
            "linear-gradient(180deg, #FDF6F8 0%, #FAF5EF 60%, #F5EAE0 100%)",
        }}
      >
        <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "84rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.45fr] gap-8 lg:gap-14 items-start">
            {/* ─ Left column: info ─ */}
            <div className="flex flex-col gap-5 lg:sticky lg:top-28">
              <InstructorCard shouldReduce={!!shouldReduce} />

              {/* Contact info cards */}
              <div className="flex flex-col gap-3">
                {contactItems.map((item, i) => (
                  <InfoCard key={item.label} {...item} index={i} />
                ))}
              </div>

              {/* Social + tagline */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.95,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="rounded-2xl bg-gradient-to-br from-sage-50/80 to-peach-50/60 border border-sage-100/70 px-6 py-5 flex flex-col items-center text-center gap-3"
              >
                <p className="font-serif text-charcoal text-base sm:text-lg italic">
                  &ldquo;Every mother&apos;s journey is sacred.&rdquo;
                </p>
                <div className="h-px w-10 bg-sage-300/60" />
                <div className="flex gap-4">
                  {socialLinks.map(({ icon: Icon, label, href }) => (
                    <motion.a
                      key={label}
                      href={href}
                      aria-label={label}
                      whileHover={shouldReduce ? {} : { scale: 1.15, y: -2 }}
                      className="w-9 h-9 rounded-xl bg-white/80 border border-sage-100 flex items-center justify-center text-charcoal/50 hover:text-sage-600 hover:border-sage-200 transition-colors shadow-soft"
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
                <p className="text-xs text-slate-soft">
                  Follow us on social media
                </p>
              </motion.div>

              {/* Response promise */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.05 }}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-warm-sage-50/60 border border-warm-sage-100/60"
              >
                <span className="text-warm-sage-400 text-xl shrink-0">🌿</span>
                <p className="text-warm-sage-600 text-xs sm:text-sm leading-relaxed">
                  <span className="font-semibold">
                    We respond within 24 hours.
                  </span>{" "}
                  Free consultation available for all first-time enquiries.
                </p>
              </motion.div>
            </div>

            {/* ─ Right column: form ─ */}
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
