import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { products } from '../data/products';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import ComparisonSection from './ComparisonSection';

export default function ProductDetailPage() {
  const { id } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const productIndex = products.findIndex(p => p.id === id);
  const product = products[productIndex];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeStage, setActiveStage] = useState(0);

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
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      // Offset by the first hero stage (roughly 20% of scroll)
      const stage = Math.min(Math.floor((latest - 0.2) * 5), 3);
      if (stage !== activeStage) setActiveStage(stage);
    });
  }, [scrollYProgress, activeStage]);

  if (!product) return <div>Product not found</div>;

  const stages = [
    { title: "The Product", subtitle: product.subtitle, content: product.description },
    { title: "Key Ingredients", subtitle: "Botanical Alchemy", content: product.ingredients.map(i => i.name).join(", ") },
    { title: "Core Effects", subtitle: "The Transformation", content: product.ingredients.map(i => i.effect).join(". ") },
    { title: "Final Results", subtitle: "Clinical Efficacy", content: product.results }
  ];

  return (
    <div className="bg-[#FDF9F6] min-h-screen selection:bg-accent selection:text-bg">
      
      {/* Top Fixed Navigation */}
      <div className="fixed top-28 left-0 right-0 z-[50] px-6 md:px-12 pointer-events-none">
        <div className="max-width flex justify-between items-center">
          {productIndex > 0 ? (
            <Link 
              to={`/product/${products[productIndex - 1].id}`}
              className="group pointer-events-auto flex items-center gap-4 bg-white/80 backdrop-blur-xl px-7 py-3 rounded-full border border-[#052B08]/20 hover:bg-[#052B08] hover:text-white transition-all duration-500 shadow-xl"
            >
              <ArrowLeft size={16} />
              <span className="font-body text-[10px] tracking-[0.2em] uppercase hidden md:block font-bold">Previous Ritual</span>
            </Link>
          ) : <div />}

          {productIndex < products.length - 1 ? (
            <Link 
              to={`/product/${products[productIndex + 1].id}`}
              className="group pointer-events-auto flex items-center gap-4 bg-white/80 backdrop-blur-xl px-7 py-3 rounded-full border border-[#052B08]/20 hover:bg-[#052B08] hover:text-white transition-all duration-500 shadow-xl"
            >
              <span className="font-body text-[10px] tracking-[0.2em] uppercase hidden md:block font-bold">Next Ritual</span>
              <ArrowRight size={16} />
            </Link>
          ) : <div />}
        </div>
      </div>

      {/* Hero Container for unified scroll tracking */}
      <div ref={containerRef} className="relative h-[600vh]">
        
        {/* Initial Static Hero Stage */}
        <section className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          <motion.img 
            src={product.lifestyleImage}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              scale: useTransform(scrollYProgress, [0, 0.2], [1, 1.1]),
              opacity: useTransform(scrollYProgress, [0.15, 0.25], [1, 0])
            }}
          />
          <div className="absolute inset-0 bg-black/10" />
          
          <motion.div 
            style={{ 
              opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]),
              y: useTransform(scrollYProgress, [0, 0.2], [0, -50])
            }}
            className="relative z-10 text-center text-white"
          >
            <p className="font-body text-[12px] tracking-[0.8em] uppercase mb-8 drop-shadow-lg text-white">Discover the Ritual</p>
            <h1 className="serif-title text-7xl md:text-9xl mb-12 drop-shadow-2xl text-white">{product.title}</h1>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-4"
            >
              <span className="font-body text-[10px] tracking-widest uppercase opacity-60 text-white">Scroll to Explore</span>
              <ChevronDown size={24} className="text-white" />
            </motion.div>
          </motion.div>
        </section>

        {/* Interactive 3D Stages */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col md:flex-row items-center justify-between px-6 md:px-12 perspective-1000" onMouseMove={handleMouseMove} onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}>
          
          {/* Left: Dynamic Content */}
          <motion.div 
            style={{ 
              rotateX, rotateY, translateZ: 100, transformStyle: 'preserve-3d',
              opacity: useTransform(scrollYProgress, [0.18, 0.25], [0, 1])
            }}
            className="w-full md:w-1/2 flex flex-col justify-center z-10 order-2 md:order-1 pt-48 md:pt-48"
          >
            <AnimatePresence mode="wait">
              {activeStage >= 0 && (
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, x: -50, rotateY: -20 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: 50, rotateY: 20 }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                  className="max-w-xl"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.span style={{ translateZ: 20 }} className="font-body text-[10px] tracking-[0.5em] uppercase text-[#052B08]/60 font-bold mb-4 block">
                    Stage 0{activeStage + 1} — {stages[activeStage].title}
                  </motion.span>
                  <motion.h1 style={{ translateZ: 60 }} className="serif-title text-5xl md:text-8xl text-[#052B08] leading-[1.1] mb-8">
                    {stages[activeStage].subtitle}
                  </motion.h1>
                  <motion.p style={{ translateZ: 40 }} className="font-body text-xl md:text-2xl text-[#052B08]/80 leading-relaxed mb-16 italic font-medium">
                    {stages[activeStage].content}
                  </motion.p>

                  {activeStage === 1 && (
                    <div className="grid grid-cols-1 gap-6 mb-12" style={{ transformStyle: 'preserve-3d' }}>
                      {product.ingredients.map((ing, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 20, translateZ: 0 }}
                          animate={{ opacity: 1, y: 0, translateZ: 30 }}
                          transition={{ delay: i * 0.1, type: "spring" }}
                          whileHover={{ scale: 1.02, translateZ: 50 }}
                          className="p-6 bg-white/40 backdrop-blur-md rounded-2xl border border-[#052B08]/5 shadow-lg"
                        >
                          <h4 className="serif-title text-xl text-[#052B08] mb-2">{ing.name}</h4>
                          <p className="font-body text-[11px] text-[#052B08]/60 uppercase tracking-wider">{ing.effect}</p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right: Floating Product Image */}
          <motion.div 
            style={{ 
              rotateX, rotateY, translateZ: 150, transformStyle: 'preserve-3d',
              opacity: useTransform(scrollYProgress, [0.2, 0.3], [0, 1]),
              scale: useTransform(scrollYProgress, [0.2, 0.3], [0.8, 1])
            }}
            className="w-full md:w-1/2 h-[50vh] md:h-full relative flex items-center justify-center order-1 md:order-2 z-20"
          >
            <motion.div
              style={{ 
                y: useTransform(scrollYProgress, [0.2, 1], [0, -80]),
                rotate: useTransform(scrollYProgress, [0.2, 1], [0, 12]),
                scale: useTransform(scrollYProgress, [0.2, 0.6, 1], [1, 1.1, 1]),
                transformStyle: 'preserve-3d'
              }}
              className="relative w-full max-w-[320px] md:max-w-[480px] aspect-square flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={product.id}
                  src={product.image}
                  alt={product.title}
                  initial={{ opacity: 0, scale: 0.8, y: 50, rotateZ: -10 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -15, 0], rotateZ: 0 }}
                  exit={{ opacity: 0, scale: 1.2, y: -50, rotateZ: 10 }}
                  transition={{ 
                    duration: 1.2, ease: [0.16, 1, 0.3, 1],
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  style={{ translateZ: 100 }}
                  className="w-full h-auto object-contain drop-shadow-[0_60px_120px_rgba(5,43,8,0.4)]"
                />
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Progress Indicator */}
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[#052B08]/30"
          >
            <ChevronDown size={24} />
          </motion.div>
          <div className="w-40 h-[2px] bg-[#052B08]/10 overflow-hidden">
            <motion.div 
              style={{ scaleX: scrollYProgress, originX: 0 }}
              className="w-full h-full bg-[#052B08]"
            />
          </div>
        </div>
      </div>

      {/* 3D Comparison Section */}
      <ComparisonSection 
        beforeImage="/products/before_hair.png"
        afterImage="/products/after_hair.png"
      />

      {/* Navigation Between Products (Bottom) */}
      <section className="py-40 px-6 md:px-12 bg-white/20 backdrop-blur-sm border-t border-[#052B08]/5">
        <div className="max-width flex flex-col md:flex-row justify-between items-center gap-12">
          {productIndex > 0 ? (
            <Link 
              to={`/product/${products[productIndex - 1].id}`}
              className="group flex items-center gap-8 text-left"
            >
              <div className="w-20 h-20 rounded-full border border-[#052B08]/10 flex items-center justify-center group-hover:bg-[#052B08] group-hover:text-white transition-all duration-700">
                <ArrowLeft size={24} />
              </div>
              <div>
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#052B08]/40 mb-3">Previous Ritual</p>
                <h3 className="serif-title text-4xl text-[#052B08] group-hover:opacity-60 transition-opacity">{products[productIndex - 1].title}</h3>
              </div>
            </Link>
          ) : <div />}

          {productIndex < products.length - 1 ? (
            <Link 
              to={`/product/${products[productIndex + 1].id}`}
              className="group flex items-center gap-8 text-right"
            >
              <div className="order-2 text-right">
                 <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#052B08]/40 mb-3">Next Ritual</p>
                 <h3 className="serif-title text-4xl text-[#052B08] group-hover:opacity-60 transition-opacity">{products[productIndex + 1].title}</h3>
              </div>
              <div className="w-20 h-20 rounded-full border border-[#052B08]/10 flex items-center justify-center group-hover:bg-[#052B08] group-hover:text-white transition-all duration-700 order-3">
                <ArrowRight size={24} />
              </div>
            </Link>
          ) : <div />}
        </div>
      </section>

      {/* Footer / CTA */}
      <section className="py-24 text-center bg-[#FDF9F6]">
        <Link to="/" className="group inline-flex flex-col items-center gap-6">
          <span className="font-body text-[11px] tracking-[0.6em] uppercase text-[#052B08]/40 group-hover:text-[#052B08] transition-colors">
            Back to Collections
          </span>
          <motion.div 
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-[1px] h-12 bg-[#052B08]/20"
          />
        </Link>
      </section>
    </div>
  );
}
