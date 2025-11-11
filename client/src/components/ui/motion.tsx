"use client";

// This file exports client-side-only motion components
// so that our server components can use them
import {
  motion,
  AnimatePresence,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";

export const MotionDiv = motion.div;
export const MotionSection = motion.section;
export const MotionH1 = motion.h1;
export const MotionH2 = motion.h2;
export const MotionP = motion.p;
export const MotionButton = motion.button;
export { AnimatePresence, type HTMLMotionProps, type Variants };
