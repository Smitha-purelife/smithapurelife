import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { products } from '../data/products';
import { Link } from 'react-router-dom';

export default function ScrollPinnedShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const index = Math.min(
        Math.floor(latest * products.length),
        products.length - 1
      );
      if (index !== activeIndex) setActiveIndex(index);
    });
  }, [scrollYProgress, activeIndex]);

  const backgroundColor = useTransform(
    scrollYProgress,
    products.map((_, i) => i / products.length),
    products.map(p => p.bg)
  );

  return (
    <section id="hero" ref={containerRef} className="relative h-[1000vh]">
      <motion.div 
        style={{ backgroundColor }}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Full-Scale Lifestyle Backgrounds */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {products.map((product, i) => {
            const start = i / products.length;
            const end = (i + 1) / products.length;
            
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(scrollYProgress, 
              [start - 0.02, start, end, end + 0.02], 
              [0, 1, 1, 0]
            );

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const scale = useTransform(scrollYProgress, 
              [start, end], 
              [1.05, 1.1]
            );
            
            return (
              <motion.div
                key={`full-bg-${i}`}
                style={{ 
                  opacity,
                  scale,
                  backgroundImage: `url(${product.lifestyleImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                className="absolute inset-0 grayscale-[0.2] brightness-110"
              >
                {/* Subtle overlay to ensure text readability while keeping the image "solid" */}
                <div className="absolute inset-0 bg-white/40" />
              </motion.div>
            );
          })}
        </div>

        {/* Big Background Text (Reduced Opacity to not clash with solid image) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {products.map((_, i) => {
            const start = i / products.length;
            const end = (i + 1) / products.length;
            
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(scrollYProgress, 
              [start - 0.05, start, end, end + 0.05], 
              [0, 0.03, 0.03, 0]
            );
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(scrollYProgress, [start, end], [50, -50]);
            
            return (
              <motion.div
                key={`bg-text-${i}`}
                style={{ opacity, y }}
                className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
              >
                <span className="font-display text-[25vw] text-[#052B08] tracking-tighter uppercase select-none">
                  {products[i].title}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="max-width h-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12 relative z-10">
          
          <div className="w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1 pt-8 md:pt-0">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -100, opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
                >
                  <motion.span className="font-body text-[10px] tracking-[0.5em] uppercase text-[#052B08]/40 font-bold mb-4 block">
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
                      <span key={i} className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-[#052B08]/5 rounded-full font-body text-[10px] tracking-wider uppercase text-[#052B08]/70">
                        {benefit}
                      </span>
                    ))}
                  </div>

                  <Link to={`/product/${products[activeIndex].id}`}>
                    <button className="group relative px-10 py-4 bg-[#052B08] text-white rounded-full font-body text-[10px] tracking-[0.3em] uppercase overflow-hidden transition-all duration-500">
                      <span className="relative z-10">Explore Ritual — Details</span>
                      <motion.div 
                        className="absolute inset-0 bg-[#0a4a0e]"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                        style={{ originX: 0 }}
                      />
                    </button>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="w-full md:w-1/2 h-[40vh] md:h-full flex items-center justify-center order-1 md:order-2 relative">
            <div className="relative w-full aspect-square max-w-[500px]">
              {products.map((product, i) => {
                // Tightened ranges for a cleaner, sharper transition without ghosting
                const start = i / products.length;
                const end = (i + 1) / products.length;
                
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(scrollYProgress, 
                  [start - 0.02, start, end, end + 0.02], 
                  [0, 1, 1, 0]
                );

                // eslint-disable-next-line react-hooks/rules-of-hooks
                const scale = useTransform(scrollYProgress,
                  [start - 0.02, start, end, end + 0.02],
                  [0.4, 1, 1, 0.4]
                );

                // eslint-disable-next-line react-hooks/rules-of-hooks
                const y = useTransform(scrollYProgress,
                  [start - 0.02, start, end, end + 0.02],
                  [200, 0, 0, -200]
                );

                // eslint-disable-next-line react-hooks/rules-of-hooks
                const rotate = useTransform(scrollYProgress,
                  [start, end],
                  [15, -15]
                );

                return (
                  <motion.div
                    key={`product-${i}`}
                    style={{ opacity, scale, y, rotate, zIndex: activeIndex === i ? 20 : 10 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >


                    <motion.div
                      animate={{ y: [0, -15, 0] }}
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

        {/* Scroll Progress Bar - Now Vertical */}
        <div className="absolute bottom-12 right-12 flex flex-col items-end gap-4">
          <div className="font-body text-[10px] tracking-widest uppercase text-[#052B08]/40">
            0{activeIndex + 1} / 0{products.length}
          </div>
          <div className="w-[2px] h-40 bg-[#052B08]/10 relative overflow-hidden">
            <motion.div 
              style={{ scaleY: scrollYProgress }}
              className="absolute inset-0 bg-[#052B08] origin-top"
            />
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(6)].map((_, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const decorY = useTransform(scrollYProgress, [0, 1], [0, -400 * (i + 1)]);
            return (
              <motion.img
                key={`decor-${i}`}
                src="/products/bubbles.png"
                style={{ 
                  y: decorY, 
                  left: `${(i + 1) * 15}%`,
                  top: `${(i % 3) * 30 + 20}%`,
                  opacity: 0.05,
                  scale: 0.2 + (i * 0.05)
                }}
                className="absolute w-24 h-24 object-contain blur-[1px]"
              />
            );
          })}
        </div>

      </motion.div>
    </section>
  );
}

