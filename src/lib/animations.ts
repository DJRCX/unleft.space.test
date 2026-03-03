// Framer Motion animation presets — use with <motion.div {...scrollReveal}> etc.
// All variants respect prefers-reduced-motion via MotionConfig on parent.

export const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.3, ease: "easeInOut" },
};

export const scrollReveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

export const scrollRevealLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

export const scrollRevealRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

export const cardHover = {
  whileHover: {
    scale: 1.02,
    boxShadow: "0 0 24px rgba(192, 132, 252, 0.15)",
    transition: { duration: 0.2 },
  },
  whileTap: { scale: 0.98 },
};

export const staggerContainer = (delay = 0.05) => ({
  animate: {
    transition: { staggerChildren: delay },
  },
});

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};
