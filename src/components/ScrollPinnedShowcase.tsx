import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { products } from '../data/products';
import { Link } from 'react-router-dom';
import SplitText from './SplitText';

export default function ScrollPinnedShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  // 3D Tilt Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

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
        style={{ 
          backgroundColor,
          opacity: 0.9
        }}
        className="absolute inset-0 z-0 pointer-events-none"
      />
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        className="sticky top-0 h-screen w-full overflow-hidden perspective-1000 z-10"
      >
        {/* Lifestyle Backgrounds removed per user request for a cleaner 'product menu' feel */}


        {/* Big Background Text - Removed to prevent overlap issues */}

        <motion.div 
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="max-width h-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12 relative z-10"
        >
          
          <motion.div 
            style={{ z: 100, transformStyle: 'preserve-3d' }}
            className="w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1 pt-8 md:pt-0"
          >
            <div className="overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  transition={{ duration: 0.4 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.span 
                    style={{ z: 20 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-body text-[10px] tracking-[0.5em] uppercase text-[#052B08]/40 font-bold mb-4 block"
                  >
                    Product 0{activeIndex + 1}
                  </motion.span>
                  
                  <motion.div style={{ z: 60, transformStyle: 'preserve-3d' }} className="mb-12 text-[#052B08]">
                    <SplitText 
                      text={products[activeIndex].title} 
                      className="font-display text-6xl md:text-8xl leading-[1.1]"
                      delay={0.1}
                    />
                  </motion.div>

                  <motion.div style={{ z: 40, transformStyle: 'preserve-3d' }} className="mb-12 text-[#052B08]/70 max-w-md">
                    <SplitText 
                      text={products[activeIndex].description} 
                      className="font-serif italic text-xl md:text-2xl font-medium"
                      delay={0.2}
                    />
                  </motion.div>
                  
                  <motion.div style={{ z: 30 }} className="flex flex-wrap gap-3 mb-12">
                    {products[activeIndex].benefits.map((benefit, i) => (
                      <motion.span 
                        key={i} 
                        initial={{ opacity: 0, z: -20 }}
                        animate={{ opacity: 1, z: 0 }}
                        whileHover={{ z: 40, scale: 1.1 }}
                        className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-[#052B08]/5 rounded-full font-body text-[10px] tracking-wider uppercase text-[#052B08]/70 shadow-sm"
                      >
                        {benefit}
                      </motion.span>
                    ))}
                  </motion.div>
 
                  <Link to={`/product/${products[activeIndex].id}`}>
                    <motion.button 
                      style={{ 
                        z: 60,
                        rotateX: useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15])),
                        rotateY: useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]))
                      }}
                      whileHover={{ 
                        scale: 1.1, 
                        z: 120,
                        boxShadow: "0 30px 60px rgba(5,43,8,0.2)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative px-10 py-5 bg-[#052B08] text-white rounded-full font-body text-[11px] tracking-[0.4em] uppercase overflow-hidden transition-all duration-500 shadow-xl"
                    >
                      <span className="relative z-10 flex items-center gap-4">
                        Explore Ritual 
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </span>
                      <motion.div 
                        className="absolute inset-0 bg-[#0a4a0e]"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                        style={{ originX: 0 }}
                      />
                    </motion.button>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div 
            style={{ z: 150, transformStyle: 'preserve-3d' }}
            className="w-full md:w-1/2 h-[50vh] md:h-full flex items-center justify-center order-1 md:order-2 relative"
          >
            <div className="relative w-full aspect-square max-w-[400px] md:max-w-[550px]" style={{ transformStyle: 'preserve-3d' }}>
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
                const scrollYOffset = useTransform(scrollYProgress,
                  [start - 0.02, start, end, end + 0.02],
                  [200, 0, 0, -200]
                );

                // eslint-disable-next-line react-hooks/rules-of-hooks
                const scrollRotate = useTransform(scrollYProgress,
                  [start, end],
                  [15, -15]
                );

                return (
                  <motion.div
                    key={`product-${i}`}
                    style={{ opacity, scale, y: scrollYOffset, rotate: scrollRotate, zIndex: activeIndex === i ? 20 : 10, transformStyle: 'preserve-3d' }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ y: [0, -20, 0], rotateZ: [0, 2, -2, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                      style={{ z: activeIndex === i ? 100 : 0, transformStyle: 'preserve-3d' }}
                      className="relative w-full h-full flex items-center justify-center"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain drop-shadow-[0_40px_100px_rgba(5,43,8,0.4)]"
                      />
                      
                      {/* Interactive 3D Glow behind the active bottle */}
                      {activeIndex === i && (
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                          transition={{ duration: 4, repeat: Infinity }}
                          style={{ z: -50 }}
                          className="absolute inset-20 bg-white/40 blur-[60px] rounded-full pointer-events-none"
                        />
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

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

      </div>
    </section>
  );
}

