import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface SectionTransitionProps {
  children: ReactNode;
  index: number;
}

export default function SectionTransition({ children, index }: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // More dramatic 3D parallax with perspective tilt
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [8, 0, 0, -8]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.92, 1, 1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [80, 0, 0, -80]);

  // Subtle blur effect on entry/exit
  const blur = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [4, 0, 0, 4]);

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        scale,
        opacity,
        y,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
        perspective: "2000px",
        transformStyle: "preserve-3d"
      }}
      className="relative z-10 will-change-transform"
    >
      {children}
    </motion.div>
  );
}
