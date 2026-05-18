import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, MotionValue } from 'framer-motion';
import { useRef, useState, useEffect, memo } from 'react';
import { products } from '../data/products';
import { ArrowLeft, ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import ComparisonSection from './ComparisonSection';

// Interactive Floating Particle Component
const FloatingDebris = memo(({ index }: { index: number }) => {
  return (
    <motion.div
      animate={{ 
        y: [0, -40, 0],
        x: [0, index % 2 === 0 ? 20 : -20, 0],
        rotate: [0, 360],
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.3, 0.1]
      }}
      transition={{ 
        duration: 5 + index * 2, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: index * 0.5
      }}
      className="absolute w-4 h-4 rounded-full bg-accent/20 blur-[1px]"
      style={{
        left: `${20 + (index * 20) % 60}%`,
        top: `${10 + (index * 15) % 80}%`,
      }}
    />
  );
});

export default function ProductDetailPage() {
  const { id } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const productIndex = products.findIndex(p => p.id === id);
  const product = products[productIndex];

  // Enhanced 3D Motion Values for the product jar
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 120, damping: 20 });
  const translateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 100, damping: 25 });
  const translateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), { stiffness: 100, damping: 25 });

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

  if (!product) return <div className="h-screen flex items-center justify-center font-display text-2xl">Product not found</div>;

  const stages = [
    { title: "The Product", subtitle: product.subtitle, content: product.description },
    { title: "Key Ingredients", subtitle: "Botanical Alchemy", content: product.ingredients.map(i => i.name).join(", ") },
    { title: "Core Effects", subtitle: "The Transformation", content: product.ingredients.map(i => i.effect).join(". ") },
    { title: "Final Results", subtitle: "Clinical Efficacy", content: product.results }
  ];

  return (
    <div className="bg-[#C1CDBF] min-h-screen selection:bg-accent selection:text-bg overflow-x-hidden pt-[76px]">
      


      {/* Full-width Lifestyle Hero Banner */}
      <div className="w-full h-[calc(100svh-76px)] min-h-[500px] relative mb-16 lg:mb-24 flex flex-col">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={product.lifestyleImage}
            alt={`${product.title} Lifestyle`}
            className="w-full h-full object-cover object-[center_30%] lg:object-[center_25%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#052B08]/50 via-[#052B08]/20 to-transparent flex items-center justify-center">
            <div className="text-center px-4 md:px-6 w-full max-w-6xl mx-auto mt-20">
              <motion.h2 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="serif-title text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
              >
                Exquisite Formulation
              </motion.h2>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="font-body text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] uppercase text-white/95 drop-shadow-md max-w-4xl mx-auto leading-relaxed"
              >
                {product.results}
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Standard Product Layout */}
      <div className="pb-20 lg:pb-32 max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left: 3D Interactive Product Image */}
          <motion.div 
            onMouseMove={handleMouseMove} 
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
            style={{ 
              rotateX, 
              rotateY, 
              x: translateX,
              y: translateY,
              z: 200, 
              transformStyle: 'preserve-3d',
            }}
            className="w-full lg:w-1/2 h-[50vh] sm:h-[60vh] lg:h-[80vh] relative flex items-center justify-center perspective-2000"
          >
            {/* Background Decorative Particles */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
              {[...Array(6)].map((_, i) => (
                <FloatingDebris key={i} index={i} />
              ))}
            </div>

            <div className="relative w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[500px] aspect-[3/4] flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent blur-[80px] lg:blur-[120px] rounded-full pointer-events-none" style={{ transform: 'translateZ(-100px)' }} />
              <motion.img
                src={product.image}
                alt={product.title}
                animate={{ y: [0, -20, 0], rotateY: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                fetchPriority="high"
                loading="eager"
                className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(5,43,8,0.2)] lg:drop-shadow-[0_40px_80px_rgba(5,43,8,0.3)] z-50"
                style={{ transformStyle: 'preserve-3d' }}
              />
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left"
          >
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-body text-[10px] sm:text-[12px] tracking-[0.4em] uppercase text-[#052B08]/60 font-bold mb-4 block"
            >
              {product.subtitle}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="serif-title text-4xl sm:text-5xl lg:text-7xl text-[#052B08] leading-tight mb-6"
            >
              {product.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-body text-base sm:text-lg lg:text-xl text-[#052B08]/80 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0"
            >
              {product.description}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-10 lg:mb-14"
            >
              <h3 className="font-serif italic text-2xl lg:text-3xl text-[#052B08] mb-6 lg:mb-8">Botanical Alchemy</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 text-left">
                {product.ingredients.slice(0, 4).map((ing, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + (i * 0.1) }}
                    className="p-4 lg:p-6 bg-white/60 hover:bg-white backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md border border-[#052B08]/5 transition-all duration-300 hover:-translate-y-1"
                  >
                    <Sparkles size={18} className="text-[#FF7B89] mb-3" />
                    <h4 className="font-bold text-[#052B08] mb-1 lg:text-lg">{ing.name}</h4>
                    <p className="text-xs lg:text-sm text-[#052B08]/60 uppercase tracking-wider">{ing.effect}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#052B08] text-white py-4 lg:py-5 px-8 lg:px-12 rounded-full font-bold tracking-widest uppercase hover:bg-[#FF7B89] transition-colors duration-300 w-full sm:w-auto text-center shadow-xl hover:shadow-2xl self-center lg:self-start text-sm lg:text-base"
            >
              Add to Bag • ₹1,450
            </motion.button>
          </motion.div>
        </div>
      </div>



      {/* Comparison Section */}
      <ComparisonSection 
        beforeImage="/products/before_hair.png"
        afterImage="/products/after_hair.png"
      />

      {/* Bottom Product Navigation */}
      <section className="py-20 lg:py-32 px-6 md:px-12 bg-white/40 backdrop-blur-md border-t border-[#052B08]/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 md:gap-10">
          {productIndex > 0 ? (
            <Link 
              to={`/product/${products[productIndex - 1].id}`}
              className="group flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left w-full md:w-auto"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: -10 }}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-[#052B08]/10 flex items-center justify-center group-hover:bg-[#052B08] group-hover:text-white transition-all duration-500"
              >
                <ArrowLeft size={18} />
              </motion.div>
              <div>
                <p className="font-body text-[8px] md:text-[10px] tracking-[0.3em] uppercase text-[#052B08]/40 mb-2">Previous Ritual</p>
                <h3 className="serif-title text-2xl md:text-3xl lg:text-4xl text-[#052B08]">{products[productIndex - 1].title}</h3>
              </div>
            </Link>
          ) : <div className="hidden md:block" />}

          {productIndex < products.length - 1 ? (
            <Link 
              to={`/product/${products[productIndex + 1].id}`}
              className="group flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-right w-full md:w-auto"
            >
              <div className="order-2 md:order-1">
                 <p className="font-body text-[8px] md:text-[10px] tracking-[0.3em] uppercase text-[#052B08]/40 mb-2">Next Ritual</p>
                 <h3 className="serif-title text-2xl md:text-3xl lg:text-4xl text-[#052B08]">{products[productIndex + 1].title}</h3>
              </div>
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-[#052B08]/10 flex items-center justify-center group-hover:bg-[#052B08] group-hover:text-white transition-all duration-500 order-1 md:order-2"
              >
                <ArrowRight size={18} />
              </motion.div>
            </Link>
          ) : <div className="hidden md:block" />}
        </div>
      </section>

      {/* Final Return CTA */}
      <section className="py-24 text-center">
        <Link to="/" className="group inline-flex flex-col items-center gap-6">
          <motion.span 
            whileHover={{ letterSpacing: "0.8em" }}
            className="font-body text-[10px] tracking-[0.6em] uppercase text-[#052B08]/50 group-hover:text-[#052B08] transition-all duration-500 font-bold"
          >
            Return to Atelier
          </motion.span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-16 bg-gradient-to-b from-[#052B08]/40 to-transparent group-hover:from-[#FF7B89] transition-colors duration-500" 
          />
        </Link>
      </section>
    </div>
  );
}
