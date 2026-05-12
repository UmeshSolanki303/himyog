"use client";

import { motion, useReducedMotion } from "framer-motion";

const orbs = [
  { id: 0, w: 480, h: 380, left: "-8%",  top: "10%", color: "#7a8b62", opacity: 0.09, dur: 15, delay: 0 },
  { id: 1, w: 320, h: 320, left: "68%",  top: "55%", color: "#eca48d", opacity: 0.07, dur: 12, delay: 2.5 },
  { id: 2, w: 220, h: 220, left: "82%",  top: "4%",  color: "#d4dcc9", opacity: 0.13, dur: 10, delay: 1.5 },
  { id: 3, w: 160, h: 160, left: "38%",  top: "72%", color: "#7a8b62", opacity: 0.07, dur: 14, delay: 5 },
  { id: 4, w: 280, h: 280, left: "48%",  top: "18%", color: "#f9ddd4", opacity: 0.06, dur: 17, delay: 2 },
];

export function FloatingOrbs() {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.w,
            height: orb.h,
            left: orb.left,
            top: orb.top,
            backgroundColor: orb.color,
            opacity: orb.opacity,
            filter: "blur(65px)",
          }}
          animate={{
            y: [0, -22, 10, 0],
            x: [0, 14, -9, 0],
            scale: [1, 1.08, 0.94, 1],
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
