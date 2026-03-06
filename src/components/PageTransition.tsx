"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
