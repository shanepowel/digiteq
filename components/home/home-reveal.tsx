"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type HomeRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function HomeReveal({ children, className = "", delay = 0 }: HomeRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
