import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
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

  // Dramatic 3D parallax with perspective tilt, acting like floating cards
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.85, 1, 1, 0.85]);
  const rotateX = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [15, 0, 0, -10]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [150, 0, 0, -100]);
  const z = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [-300, 0, 0, -200]);
  
  // Brightness darkens as the card goes out of view
  const brightness = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.4]);
  // Subtle blur effect on entry/exit
  const blur = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [8, 0, 0, 8]);

  return (
    <div style={{ perspective: "2000px" }} className="w-full">
      <motion.div
        ref={ref}
        style={{
          rotateX,
          scale,
          opacity,
          y,
          z,
          filter: useMotionTemplate`blur(${blur}px) brightness(${brightness})`,
          transformStyle: "preserve-3d"
        }}
        className="relative z-10 will-change-transform bg-bg mx-2 md:mx-8 my-12 rounded-[2rem] md:rounded-[4rem] shadow-[0_20px_50px_rgba(5,43,8,0.1)] overflow-hidden"
      >
        {children}
      </motion.div>
    </div>
  );
}
