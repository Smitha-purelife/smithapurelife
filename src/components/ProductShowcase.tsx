import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { products } from '../data/products';

function ProductRow({ product, index }: { product: typeof products[0]; index: number }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Enhanced parallax with different speeds for depth
  const imageY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 0.85]);
  const imageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [isEven ? -6 : 6, 0, isEven ? 6 : -6]);
  const bgTextX = useTransform(scrollYProgress, [0, 1], [isEven ? -150 : 150, isEven ? 150 : -150]);

  return (
    <div ref={containerRef} className="min-h-screen flex items-center py-24 relative overflow-hidden bg-bg">
      <div className="max-width flex flex-col md:flex-row items-center gap-16 md:gap-32 px-6">
        {/* Text Content */}
        <motion.div 
          style={{ y: textY }}
          className={`flex-1 ${isEven ? 'md:order-1 text-left' : 'md:order-2 md:text-right'}`}
        >
          <div className={`overflow-hidden flex flex-col ${!isEven && 'md:items-end'}`}>
            <motion.span 
              initial={{ opacity: 0, x: isEven ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -30 : 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-body text-[10px] tracking-[0.5em] uppercase text-accent font-bold mb-8 block"
            >
              Collection — 0{index + 1}
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="serif-title text-6xl md:text-8xl text-text mb-8 leading-tight"
            >
              {product.title.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? 'italic opacity-60 block' : 'block'}>
                  {word}
                </span>
              ))}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className={`font-body text-lg text-text/60 max-w-md leading-relaxed mb-12 ${!isEven && 'md:text-right'}`}
            >
              {product.description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <button className="px-12 py-5 border border-text/10 rounded-full font-body text-[11px] tracking-[0.3em] uppercase hover:bg-text hover:text-white transition-all duration-700">
                Explore Formula
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Image Container */}
        <motion.div 
          style={{ y: imageY }}
          className={`flex-1 relative ${isEven ? 'md:order-2' : 'md:order-1'}`}
        >
          <div className="relative z-10 w-full aspect-square flex items-center justify-center">
            {/* Background Accent Circle */}
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={isInView ? { scale: 1.4, opacity: 1 } : { scale: 0.5, opacity: 0 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              style={{ backgroundColor: product.accent }}
              className="absolute inset-0 rounded-full blur-[120px] opacity-20"
            />
            
            {/* Product image with scroll-linked scale and rotation */}
            <motion.img 
              src={product.image} 
              alt={product.title}
              style={{ scale: imageScale, rotate: imageRotate }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: undefined } : { opacity: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.15)] relative z-20"
            />

            {/* Floating Detail Badge */}
            <motion.div
              initial={{ opacity: 0, x: isEven ? 60 : -60, y: 20 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: isEven ? 60 : -60, y: 20 }}
              transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute top-1/4 ${isEven ? '-right-12' : '-left-12'} bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 hidden lg:block`}
            >
              <p className="font-body text-[8px] tracking-[0.2em] uppercase text-text/40 mb-1">Benefit</p>
              <p className="serif-title text-xl text-text whitespace-nowrap">{product.benefits[0]}</p>
            </motion.div>

            {/* Bottom floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 1, delay: 1.3 }}
              className={`absolute bottom-8 ${isEven ? '-left-8' : '-right-8'} bg-white/60 backdrop-blur-md px-5 py-3 rounded-full shadow-lg border border-white/20 hidden lg:flex items-center gap-2`}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-body text-[9px] tracking-[0.15em] uppercase text-text/60">100% Natural</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Large background text for each section – now with scroll-linked horizontal movement */}
      <motion.div 
        style={{ x: bgTextX, opacity: 0.02 }}
        className="absolute bottom-0 left-0 right-0 select-none pointer-events-none serif-title text-[30vw] leading-none whitespace-nowrap overflow-hidden"
      >
        {product.title.toUpperCase()}
      </motion.div>
    </div>
  );
}

export default function ProductShowcase() {
  return (
    <section className="bg-bg relative overflow-hidden">
      {products.map((product, i) => (
        <ProductRow key={product.title} product={product} index={i} />
      ))}
    </section>
  );
}
