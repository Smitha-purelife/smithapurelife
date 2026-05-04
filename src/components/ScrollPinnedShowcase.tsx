import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const products = [
  {
    title: "Avosilky Bloom",
    subtitle: "Avocado Hair Treatment",
    description: "Nourish your hair with the rich goodness of Avocado. Designed for deep conditioning and silken texture.",
    image: "/products/avosilk_bloom.png",
    accent: "#E9D5CA",
    bg: "#FDF9F6",
    benefits: ["Deep Conditioning", "Silken Texture", "Vitamin E Rich"]
  },
  {
    title: "Radiance Hair Oil",
    subtitle: "Growth Revival Formula",
    description: "2x Advance Growth Revival. Infused with Jojoba, Rosemary, and 20+ botanical extracts for intensive rescue.",
    image: "/products/herbal_radiance_hair_oil.png",
    accent: "#F9F3CC",
    bg: "#FFFBEB",
    benefits: ["Intensive Rescue", "Advance Growth", "Natural Shine"]
  },
  {
    title: "Herbal Hair Wash",
    subtitle: "Pure Therapy Powder",
    description: "Nature's therapy in a powder. A traditional blend of Amla and Hibiscus for a pure, herbal cleanse.",
    image: "/products/hair_wash_powder.png",
    accent: "#D4E2D4",
    bg: "#F0F7F0",
    benefits: ["Herbal Cleanse", "Scalp Health", "Traditional Blend"]
  },
  {
    title: "Pro Repair Serum",
    subtitle: "Silk Gloss Technology",
    description: "Instant silk gloss with botanical repair technology. Restore natural vitality and overnight repair.",
    image: "/products/skin_glow_pro_repair_hairserum.png",
    accent: "#DBCDF0",
    bg: "#F5F0FA",
    benefits: ["Instant Gloss", "Overnight Repair", "Botanical Tech"]
  },
  {
    title: "Follicra Regrowth",
    subtitle: "Advanced Scalp Ritual",
    description: "Advanced hair regrowth therapy featuring Marshmallow root and Ayurvedic botanicals.",
    image: "/products/hexagen-image (1).png",
    accent: "#DDF1E9",
    bg: "#F2FAF7",
    benefits: ["Regrowth Therapy", "Ayurvedic Blend", "Root Strength"]
  }
];

export default function ScrollPinnedShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  // Sync active index with scroll progress
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const index = Math.min(
        Math.floor(latest * products.length),
        products.length - 1
      );
      if (index !== activeIndex) setActiveIndex(index);
    });
  }, [scrollYProgress, activeIndex]);

  // Background color interpolation
  const backgroundColor = useTransform(
    scrollYProgress,
    products.map((_, i) => i / (products.length - 1)),
    products.map(p => p.bg)
  );

  return (
    <section ref={containerRef} className="relative h-[600vh]">
      <motion.div 
        style={{ backgroundColor }}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {products.map((_, i) => {
            const range = [i / products.length, (i + 1) / products.length];
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(scrollYProgress, 
              [range[0] - 0.1, range[0], range[1], range[1] + 0.1], 
              [0, 0.05, 0.05, 0]
            );
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const x = useTransform(scrollYProgress, range, [100, -100]);
            
            return (
              <motion.div
                key={`bg-text-${i}`}
                style={{ opacity, x }}
                className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
              >
                <span className="font-display text-[25vw] text-[#052B08] tracking-tighter uppercase">
                  {products[i].title}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="max-width h-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12 relative z-10">
          
          {/* Left Side: Product Info */}
          <div className="w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1 pt-8 md:pt-0">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -100, opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.span 
                    className="font-body text-[10px] tracking-[0.5em] uppercase text-[#052B08]/40 font-bold mb-4 block"
                  >
                    Product 0{activeIndex + 1}
                  </motion.span>
                  <h2 className="font-display text-5xl md:text-8xl text-[#052B08] leading-tight mb-6">
                    {products[activeIndex].title}
                  </h2>
                  <p className="font-serif italic text-xl md:text-2xl text-[#052B08]/60 mb-8 max-w-md">
                    {products[activeIndex].description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-12">
                    {products[activeIndex].benefits.map((benefit, i) => (
                      <span 
                        key={i} 
                        className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-[#052B08]/5 rounded-full font-body text-[10px] tracking-wider uppercase text-[#052B08]/70"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>

                  <button className="group relative px-10 py-4 bg-[#052B08] text-white rounded-full font-body text-[10px] tracking-[0.3em] uppercase overflow-hidden transition-all duration-500">
                    <span className="relative z-10">Purchase Now</span>
                    <motion.div 
                      className="absolute inset-0 bg-[#0a4a0e]"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      style={{ originX: 0 }}
                    />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side: 3D Product Visual */}
          <div className="w-full md:w-1/2 h-[40vh] md:h-full flex items-center justify-center order-1 md:order-2 relative">
            <div className="relative w-full aspect-square max-w-[500px]">
              {products.map((product, i) => {
                const range = [i / products.length, (i + 1) / products.length];
                
                // Opacity: visible only during its range
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(scrollYProgress, 
                  [range[0] - 0.05, range[0], range[1], range[1] + 0.05], 
                  [0, 1, 1, 0]
                );

                // Scale: pops in and out
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const scale = useTransform(scrollYProgress,
                  [range[0] - 0.1, range[0], range[1], range[1] + 0.1],
                  [0.5, 1.1, 1.1, 0.5]
                );

                // Y position: moves vertically through the screen
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const y = useTransform(scrollYProgress,
                  [range[0] - 0.1, range[0], range[1], range[1] + 0.1],
                  [200, 0, 0, -200]
                );

                // Rotation: adds dynamic feel
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const rotate = useTransform(scrollYProgress,
                  [range[0], range[1]],
                  [15, -15]
                );

                // Accent Glow
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const glowScale = useTransform(scrollYProgress, range, [0.8, 1.5]);

                return (
                  <motion.div
                    key={`product-${i}`}
                    style={{ opacity, scale, y, rotate, zIndex: activeIndex === i ? 20 : 10 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {/* Background Glow */}
                    <motion.div 
                      style={{ 
                        backgroundColor: product.accent,
                        scale: glowScale
                      }}
                      className="absolute w-64 h-64 rounded-full blur-[100px] opacity-20"
                    />

                    {/* Float Animation */}
                    <motion.div
                      animate={{ y: [0, -20, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                      className="relative w-full h-full flex items-center justify-center"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain drop-shadow-[0_40px_100px_rgba(5,43,8,0.2)]"
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-12 right-12 flex flex-col items-end gap-4">
          <div className="font-body text-[10px] tracking-widest uppercase text-[#052B08]/40">
            0{activeIndex + 1} / 0{products.length}
          </div>
          <div className="w-40 h-[2px] bg-[#052B08]/10 relative overflow-hidden">
            <motion.div 
              style={{ scaleX: scrollYProgress }}
              className="absolute inset-0 bg-[#052B08] origin-left"
            />
          </div>
        </div>

        {/* Decorative Floating Elements (Bubbles/Leaves) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(6)].map((_, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(scrollYProgress, [0, 1], [0, -500 * (i + 1)]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const rotate = useTransform(scrollYProgress, [0, 1], [0, 360 * (i % 2 === 0 ? 1 : -1)]);
            
            return (
              <motion.img
                key={`decor-${i}`}
                src="/products/bubbles.png"
                style={{ 
                  y, 
                  rotate,
                  left: `${(i + 1) * 15}%`,
                  top: `${(i % 3) * 30 + 20}%`,
                  opacity: 0.1,
                  scale: 0.3 + (i * 0.1)
                }}
                className="absolute w-24 h-24 object-contain blur-[2px]"
              />
            );
          })}
        </div>

      </motion.div>
    </section>
  );
}

