import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function SpotlightSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[120vh] flex flex-col items-center justify-center bg-[#E5E7E9] overflow-hidden py-32"
    >
      {/* Background Text */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]), opacity: 0.03 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none"
      >
        <h2 className="serif-title text-[25vw] whitespace-nowrap">PURELIFE</h2>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center mb-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-body text-[10px] tracking-[0.5em] uppercase text-accent font-semibold mb-8">
            Advanced Repair Formula
          </p>
          <h1 className="serif-title text-5xl md:text-8xl text-[#2C3E50] leading-[1.1] max-w-4xl mx-auto mb-8">
            Smooth Gloss Pro <br />
            <span className="italic opacity-60">Repair Hair Serum</span>
          </h1>
          <p className="font-body text-sm md:text-lg text-[#2C3E50]/60 tracking-wider">
            Made with 100% Natural Oils
          </p>
        </motion.div>
      </div>

      {/* Main Product Image */}
      <motion.div 
        style={{ y, rotate, opacity }}
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0,
        }}
        transition={{ 
          duration: 1.8, 
          ease: [0.16, 1, 0.3, 1]
        }}
        className="relative w-full max-w-[500px] aspect-square flex items-center justify-center"
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full flex items-center justify-center"
        >
          <img 
            src="/products/skin_glow_pro_repair_hairserum.png" 
            alt="Silk Gloss Pro Repair" 
            className="w-full h-full object-contain drop-shadow-[0_80px_150px_rgba(0,0,0,0.12)]"
          />
        </motion.div>
        
        {/* Floating Bubbles */}
        <motion.img
          src="/products/bubbles.png"
          alt=""
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 0.6,
            scale: 1,
            y: [0, -40, 0],
            x: [0, 20, 0],
            rotate: [0, 20, 0]
          }}
          transition={{ 
            opacity: { duration: 1.5 },
            y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute -top-20 -left-32 w-56 h-56 object-contain mix-blend-multiply grayscale brightness-110"
        />
        
        <motion.img
          src="/products/bubbles.png"
          alt=""
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ 
            opacity: 0.5,
            scale: 1,
            y: [0, 50, 0],
            x: [0, -30, 0],
            rotate: [0, -25, 0]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut", 
            delay: 0.5 
          }}
          className="absolute bottom-0 -right-40 w-48 h-48 object-contain opacity-50 mix-blend-multiply rotate-180 grayscale brightness-110"
        />

        <motion.img
          src="/products/bubbles.png"
          alt=""
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ 
            opacity: 0.4,
            scale: 0.8,
            y: [0, -30, 0],
            x: [0, -20, 0]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            ease: "easeInOut", 
            delay: 1.5 
          }}
          className="absolute top-1/2 -right-24 w-28 h-28 object-contain opacity-40 mix-blend-multiply grayscale brightness-110"
        />
      </motion.div>

      {/* Decorative Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-[#E5E7E9] pointer-events-none" />
    </section>
  );
}
