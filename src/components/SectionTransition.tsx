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

  // Extremely immersive 3D folding card effect
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.75, 1, 1, 0.75]);
  const rotateX = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [35, 0, 0, -35]);
  const skewY = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [10, 0, 0, -10]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [200, 0, 0, -200]);
  const z = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [-500, 0, 0, -500]);
  const brightness = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
  
  return (
    <div style={{ perspective: "3000px" }} className="w-full py-20 md:py-40">
      <motion.div
        ref={ref}
        style={{
          scale,
          rotateX,
          skewY,
          opacity,
          y,
          z,
          filter: useMotionTemplate`brightness(${brightness})`,
          transformStyle: "preserve-3d",
          transformOrigin: "center center"
        }}
        className="relative z-10 will-change-transform bg-bg mx-4 md:mx-20 rounded-[3rem] md:rounded-[5rem] shadow-[0_50px_150px_rgba(5,43,8,0.3)] overflow-hidden border border-white/30"
      >
        <motion.div 
          style={{ transformStyle: "preserve-3d" }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
