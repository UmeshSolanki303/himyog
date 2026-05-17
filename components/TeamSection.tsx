"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Award } from "lucide-react";
import { SectionReveal } from "./SectionReveal";

interface TeamMember {
  name: string;
  role: string;
  credentials: string;
  bio: string;
  image: string;
  initials: string;
}

const team: TeamMember[] = [
  {
    name: "Founder Name",
    role: "Founder & Lead Yoga Instructor",
    credentials: "RYT-500 · Pre/Postnatal Specialist",
    bio: "With over a decade of experience weaving yoga into the journey of motherhood, she founded Matrushakti Yog to create a sacred, nurturing space for every mother. Her teaching blends ancient yogic wisdom with modern prenatal and postnatal science.",
    image: "/images/team/dummy.png",
    initials: "FN",
  },
  {
    name: "Consultant Name",
    role: "Prenatal Health Consultant",
    credentials: "MSc Physiotherapy · Pelvic Health Specialist",
    bio: "A specialist in prenatal physiotherapy and pelvic health, she guides mothers through safe, effective movement practices that support the body's natural changes during pregnancy and postpartum recovery.",
    image: "/images/team/dummy.png",
    initials: "CN",
  },
  {
    name: "Consultant Name",
    role: "Postnatal Wellness Expert",
    credentials: "Registered Nutritionist · Lactation Counselor",
    bio: "Passionate about supporting mothers through the fourth trimester, she offers personalised nutrition guidance and lactation support that helps families thrive in the precious early months of parenthood.",
    image: "/images/team/dummy.png",
    initials: "CN",
  },
];

function ProfileAvatar({
  name,
  image,
  initials,
}: {
  name: string;
  image: string;
  initials: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-24 h-24 sm:w-28 sm:h-28">
      {/* Spinning gold decorative ring */}
      <motion.div
        className="absolute inset-[-7px] rounded-full border border-gold-300/60"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        aria-hidden
      />
      {/* Static rose ring */}
      <div className="absolute inset-[-2px] rounded-full border-2 border-sage-200/70" />
      {/* Avatar */}
      <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-sage-200 to-sage-500">
        {!imgError ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white font-serif text-2xl sm:text-3xl font-medium select-none">
              {initials}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function TeamCard({
  person,
  shouldReduce,
}: {
  person: TeamMember;
  shouldReduce: boolean;
}) {
  return (
    <motion.div
      whileHover={shouldReduce ? {} : { y: -6, transition: { duration: 0.3 } }}
      className="h-full rounded-3xl bg-white border border-sage-100/80 shadow-soft hover:shadow-soft-lg hover:border-sage-200 transition-all duration-300 p-6 sm:p-8 flex flex-col items-center text-center"
    >
      <ProfileAvatar
        name={person.name}
        image={person.image}
        initials={person.initials}
      />

      <h3 className="mt-5 font-serif text-xl text-charcoal font-medium">
        {person.name}
      </h3>
      <p className="text-sage-600 font-medium text-sm mt-1">{person.role}</p>

      <div className="flex items-center gap-1.5 mt-2 text-warm-sage-500 text-xs">
        <Award className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
        <span>{person.credentials}</span>
      </div>

      {/* Decorative divider */}
      <div className="w-14 h-[1.5px] bg-gradient-to-r from-transparent via-sage-200 to-transparent my-5" />

      <p className="text-slate-muted leading-relaxed text-sm">{person.bio}</p>
    </motion.div>
  );
}

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function TeamSection() {
  const shouldReduce = useReducedMotion();

  return (
    <SectionReveal
      as="section"
      id="team"
      className="py-12 sm:py-20 md:py-24 bg-gradient-to-b from-beige-100 via-white to-beige-50 w-full"
      delay={0}
    >
      <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "84rem" }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-[1.5px] w-8 bg-gradient-to-r from-transparent to-sage-300" />
            <span className="text-sage-600 text-xs font-medium uppercase tracking-[0.15em]">
              Our Team
            </span>
            <span className="h-[1.5px] w-8 bg-gradient-to-l from-transparent to-sage-300" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-charcoal font-medium">
            Founders &amp; Consultants
          </h2>
          <p className="mt-3 sm:mt-4 text-slate-muted text-base sm:text-lg max-w-2xl mx-auto px-2">
            A dedicated team of specialists guiding you through every stage of
            your motherhood journey.
          </p>
        </motion.div>

        {/* Mobile / tablet: horizontal scroll with snap */}
        <div className="lg:hidden -mx-4 sm:-mx-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-5 px-4 sm:px-6 pb-4">
            {team.map((person, i) => (
              <motion.div
                key={`${person.name}-${i}`}
                variants={cardItem}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="flex-shrink-0 w-72 sm:w-80"
              >
                <TeamCard person={person} shouldReduce={!!shouldReduce} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: 3-column grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="hidden lg:grid grid-cols-3 gap-6 xl:gap-8"
        >
          {team.map((person, i) => (
            <motion.div key={`${person.name}-${i}`} variants={cardItem}>
              <TeamCard person={person} shouldReduce={!!shouldReduce} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionReveal>
  );
}
