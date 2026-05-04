import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ScrollPinnedShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background transforms
  const bgTextOpacity = useTransform(scrollYProgress, [0, 0.1, 0.5, 0.9], [0, 0.05, 0.05, 0]);
  const bgTextY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const bgText = useTransform(
    scrollYProgress, 
    [0, 0.5, 0.51, 1], 
    ["FOLLICRA", "FOLLICRA", "POWDER", "POWDER"]
  );

  // Product 1: Follicra Serum
  const p1Opacity = useTransform(scrollYProgress, [0.05, 0.15, 0.4, 0.5], [0, 1, 1, 0]);
  const p1Scale = useTransform(scrollYProgress, [0.05, 0.15, 0.4, 0.5], [0.8, 1.1, 1.1, 0.8]);
  const p1Y = useTransform(scrollYProgress, [0.05, 0.15, 0.4, 0.5], [100, 0, 0, -100]);
  const p1Rotate = useTransform(scrollYProgress, [0, 0.5], [15, -15]);

  // Product 2: Hair Wash Powder
  const p2Opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.9, 0.98], [0, 1, 1, 0]);
  const p2Scale = useTransform(scrollYProgress, [0.5, 0.6, 0.9, 0.98], [0.8, 1.1, 1.1, 0.8]);
  const p2Y = useTransform(scrollYProgress, [0.5, 0.6, 0.9, 0.98], [100, 0, 0, -100]);
  const p2Rotate = useTransform(scrollYProgress, [0.5, 1], [15, -15]);

  // Typography transforms
  const titleY = useTransform(scrollYProgress, [0, 0.15, 0.3], [60, 0, -100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.25], [0, 1, 0]);

  return (
    <section ref={containerRef} className="relative h-[800vh] bg-[#DDF1E9]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Watermark */}
        <motion.div
          style={{ opacity: bgTextOpacity, y: bgTextY }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <motion.span 
            className="font-display text-[30vw] text-[#052B08] tracking-tighter opacity-10"
          >
            {bgText}
          </motion.span>
        </motion.div>

        {/* Hero Typography (Initial State) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
          <motion.div style={{ y: titleY, opacity: titleOpacity }} className="text-center">
            <h1 className="font-display text-7xl md:text-[8vw] text-[#052B08] leading-none mb-4">
              Smitha Purelife
            </h1>
            <p className="font-serif italic text-xl md:text-3xl text-[#052B08]/60 lowercase">
              nature's finest ritual for hair health
            </p>
          </motion.div>
        </div>

        {/* Sequential Products */}
        <div className="relative z-30 w-[50vw] max-w-[450px] aspect-square flex items-center justify-center">
          
          {/* Product 1: Follicra Serum */}
          <motion.div
            style={{
              opacity: p1Opacity,
              scale: p1Scale,
              y: p1Y,
              rotate: p1Rotate,
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full flex items-center justify-center"
            >
              <img
                src="/products/hexagen-image (1).png"
                alt="Follicra Serum"
                className="w-full h-full object-contain drop-shadow-[0_40px_100px_rgba(5,43,8,0.2)]"
              />
            </motion.div>
          </motion.div>

          {/* Product 2: Hair Wash Powder */}
          <motion.div
            style={{
              opacity: p2Opacity,
              scale: p2Scale,
              y: p2Y,
              rotate: p2Rotate,
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="w-full h-full flex items-center justify-center"
            >
              <img
                src="/products/hair_wash_powder copy.png"
                alt="Hair Wash Powder"
                className="w-full h-full object-contain drop-shadow-[0_40px_100px_rgba(5,43,8,0.2)]"
              />
            </motion.div>
          </motion.div>

        </div>

        {/* Minimalist Progress Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-[#052B08]/10 overflow-hidden">
          <motion.div 
            style={{ scaleX: scrollYProgress }}
            className="absolute inset-0 bg-[#052B08] origin-left"
          />
        </div>

      </div>
    </section>
  );
}
