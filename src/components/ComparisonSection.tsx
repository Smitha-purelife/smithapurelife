import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

interface ComparisonSectionProps {
  beforeImage: string;
  afterImage: string;
}

export default function ComparisonSection({ beforeImage, afterImage }: ComparisonSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderPos = useMotionValue(50);
  const springPos = useSpring(sliderPos, { stiffness: 100, damping: 20 });
  
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e 
      ? e.touches[0].clientX - rect.left 
      : (e as React.MouseEvent).clientX - rect.left;
    
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    sliderPos.set(percentage);
  };

  // 3D Tilt based on slider position
  const rotateY = useTransform(sliderPos, [0, 100], [-10, 10]);
  const rotateX = useTransform(sliderPos, [0, 100], [5, -5]);

  return (
    <section className="py-40 px-6 md:px-12 bg-[#FDF9F6] relative overflow-hidden">
      <div className="max-width">
        <div className="text-center mb-24">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-body text-[10px] tracking-[0.5em] uppercase text-[#052B08]/40 mb-4"
          >
            The Transformation
          </motion.p>
          <h2 className="serif-title text-5xl md:text-7xl text-[#052B08]">Real Results</h2>
        </div>

        <div className="flex justify-between max-w-5xl mx-auto mb-6 px-4">
          <span className="font-body text-[10px] tracking-[0.4em] uppercase text-[#052B08]/60 font-bold">Before</span>
          <span className="font-body text-[10px] tracking-[0.4em] uppercase text-[#052B08]/60 font-bold">After</span>
        </div>

        <motion.div 
          ref={containerRef}
          onMouseMove={(e) => isDragging && handleMove(e)}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchMove={(e) => handleMove(e)}
          style={{ 
            perspective: '2000px',
            transformStyle: 'preserve-3d'
          }}
          className="relative aspect-[16/9] w-full max-w-5xl mx-auto rounded-[40px] overflow-hidden cursor-ew-resize shadow-2xl group"
        >
          <motion.div 
            style={{ 
              rotateY, 
              rotateX,
              transformStyle: 'preserve-3d'
            }}
            className="w-full h-full relative"
          >
            {/* After Image (Base) */}
            <div className="absolute inset-0">
              <img 
                key={afterImage}
                src={afterImage} 
                className="w-full h-full object-cover" 
                alt="After Transformation" 
                loading="lazy"
                decoding="async"
              />
              <div className="absolute top-8 right-8 bg-[#052B08]/80 backdrop-blur-md px-6 py-2 rounded-full text-white font-body text-[10px] tracking-widest uppercase">After</div>
            </div>

            {/* Before Image (Clipped Overlay) */}
            <motion.div 
              style={{ 
                clipPath: useTransform(springPos, (v) => `inset(0 ${100 - v}% 0 0)`),
                transformStyle: 'preserve-3d'
              }}
              className="absolute inset-0 z-10"
            >
              <img 
                key={beforeImage}
                src={beforeImage} 
                className="w-full h-full object-cover grayscale-[0.3]" 
                alt="Before Transformation" 
                loading="lazy"
                decoding="async"
              />
              <div className="absolute top-8 left-8 bg-black/20 backdrop-blur-md px-6 py-2 rounded-full text-white font-body text-[10px] tracking-widest uppercase">Before</div>
            </motion.div>

            {/* Slider Divider */}
            <motion.div 
              style={{ left: useTransform(springPos, (v) => `${v}%`) }}
              className="absolute top-0 bottom-0 w-[2px] bg-white z-20"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
                <div className="flex gap-1">
                  <div className="w-1 h-4 bg-[#052B08]/20 rounded-full" />
                  <div className="w-1 h-4 bg-[#052B08]/20 rounded-full" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
