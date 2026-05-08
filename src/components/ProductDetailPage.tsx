import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { products } from '../data/products';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const productIndex = products.findIndex(p => p.id === id);
  const product = products[productIndex];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeStage, setActiveStage] = useState(0); // 0: Hero, 1: Ingredients, 2: Effects, 3: Results

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const stage = Math.min(Math.floor(latest * 4), 3);
      if (stage !== activeStage) setActiveStage(stage);
    });
  }, [scrollYProgress, activeStage]);

  if (!product) return <div>Product not found</div>;

  const nextProduct = products[(productIndex + 1) % products.length];
  const prevProduct = products[(productIndex - 1 + products.length) % products.length];

  const stages = [
    { title: "The Product", subtitle: product.subtitle, content: product.description },
    { title: "Key Ingredients", subtitle: "Botanical Alchemy", content: product.ingredients.map(i => i.name).join(", ") },
    { title: "Core Effects", subtitle: "The Transformation", content: product.ingredients.map(i => i.effect).join(". ") },
    { title: "Final Results", subtitle: "Clinical Efficacy", content: product.results }
  ];

  return (
    <div className="bg-bg min-h-screen selection:bg-accent selection:text-bg">
      {/* Global Solid Background Image */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <motion.img 
          src={product.lifestyleImage}
          alt="Background"
          style={{ 
            scale: useTransform(scrollYProgress, [0, 1], [1, 1.1]),
          }}
          className="w-full h-full object-cover opacity-100 grayscale-[0.1]"
        />
        {/* Subtle overlay for text contrast */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
      </div>

      <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
        <motion.img 
          src={product.lifestyleImage}
          alt="Foreground"
          style={{ 
            scale: useTransform(scrollYProgress, [0, 1], [1.1, 1.05]),
            opacity: 0.12
          }}
          className="w-full h-full object-cover mix-blend-overlay filter brightness-110 contrast-125"
        />
      </div>

      <section ref={containerRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col md:flex-row items-center justify-between px-6 md:px-12">
          
          {/* Background Stage Title (Big Text) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-0">
             <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.05, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute"
                >
                  <span className="font-display text-[25vw] text-text tracking-tighter uppercase whitespace-nowrap select-none -rotate-12">
                    {stages[activeStage].title}
                  </span>
                </motion.div>
             </AnimatePresence>
          </div>

          {/* Left: Dynamic Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center z-10 order-2 md:order-1 pt-20 md:pt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-xl"
              >
                <span className="font-body text-[10px] tracking-[0.5em] uppercase text-accent font-bold mb-4 block">
                  Stage 0{activeStage + 1} — {stages[activeStage].title}
                </span>
                <h1 className="serif-title text-5xl md:text-7xl text-text leading-tight mb-8">
                  {stages[activeStage].subtitle}
                </h1>
                <p className="font-body text-xl md:text-2xl text-text/70 leading-relaxed mb-16 italic">
                  {stages[activeStage].content}
                </p>

                {activeStage === 1 && (
                  <div className="grid grid-cols-1 gap-6 mb-12">
                    {product.ingredients.map((ing, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 bg-white/30 backdrop-blur-md rounded-2xl border border-white/20"
                      >
                        <h4 className="serif-title text-xl text-text mb-2">{ing.name}</h4>
                        <p className="font-body text-[11px] text-text/50 uppercase tracking-wider">{ing.effect}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Floating Product Image */}
          <div className="w-full md:w-1/2 h-[50vh] md:h-full relative flex items-center justify-center order-1 md:order-2 z-20">
            <motion.div
              style={{ 
                y: useTransform(scrollYProgress, [0, 1], [0, -80]),
                rotate: useTransform(scrollYProgress, [0, 1], [0, 12]),
                scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1])
              }}
              className="relative w-full max-w-[320px] md:max-w-[480px] aspect-square flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={product.id}
                  src={product.image}
                  alt={product.title}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.2, y: -50 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
                  className="w-full h-auto object-contain drop-shadow-[0_60px_120px_rgba(5,43,8,0.4)]"
                />
              </AnimatePresence>
              
              {/* Product Reflection / Glow */}
              <div className="absolute -bottom-20 w-3/4 h-1/4 bg-accent/10 blur-3xl rounded-[100%] z-[-1]" />
            </motion.div>
          </div>
        </div>

        {/* Scroll Progress Indicator */}
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-text/30"
          >
            <ChevronDown size={24} />
          </motion.div>
          <div className="w-40 h-[2px] bg-text/10 overflow-hidden">
            <motion.div 
              style={{ scaleX: scrollYProgress, originX: 0 }}
              className="w-full h-full bg-text"
            />
          </div>
        </div>
      </section>

      {/* Navigation Between Products */}
      <section className="py-32 px-6 md:px-12 bg-white/10 backdrop-blur-sm border-t border-white/20">
        <div className="max-width flex flex-col md:flex-row justify-between items-center gap-12">
          <Link 
            to={`/product/${prevProduct.id}`}
            className="group flex items-center gap-8 text-left"
          >
            <div className="w-16 h-16 rounded-full border border-text/10 flex items-center justify-center group-hover:bg-text group-hover:text-bg transition-all duration-500">
              <ArrowLeft size={20} />
            </div>
            <div>
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-text/40 mb-2">Previous Ritual</p>
              <h3 className="serif-title text-3xl text-text group-hover:text-accent transition-colors">{prevProduct.title}</h3>
            </div>
          </Link>

          <Link 
            to={`/product/${nextProduct.id}`}
            className="group flex items-center gap-8 text-right"
          >
            <div className="order-2">
               <p className="font-body text-[10px] tracking-[0.3em] uppercase text-text/40 mb-2">Next Ritual</p>
               <h3 className="serif-title text-3xl text-text group-hover:text-accent transition-colors">{nextProduct.title}</h3>
            </div>
            <div className="w-16 h-16 rounded-full border border-text/10 flex items-center justify-center group-hover:bg-text group-hover:text-bg transition-all duration-500 order-3">
              <ArrowRight size={20} />
            </div>
          </Link>
        </div>
      </section>

      {/* Footer / CTA */}
      <section className="py-20 text-center">
        <Link to="/" className="font-body text-[11px] tracking-[0.5em] uppercase text-text/40 hover:text-text transition-colors">
          Back to Collections
        </Link>
      </section>
    </div>
  );
}
