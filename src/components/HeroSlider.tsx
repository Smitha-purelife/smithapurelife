import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Shield, Leaf, Sparkles, Droplets, Sun } from 'lucide-react';
import { products } from '../data/products';
import { Link } from 'react-router-dom';

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % products.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + products.length) % products.length);

  const product = products[current];

  // Specific slide styles based on product ID to match the uploaded mockups
  const isDark = product.id === 'radiance-oil';
  
  return (
    <section id="hero" className="relative w-full min-h-[100svh] overflow-hidden bg-[#EBF3EB]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background / Lifestyle Image with Ken Burns effect */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
             <motion.img 
               src={product.lifestyleImage} 
               alt={product.title} 
               initial={{ scale: 1.1, x: 20 }}
               animate={{ scale: 1, x: 0 }}
               transition={{ duration: 10, ease: "linear" }}
               className="w-full h-full object-cover object-[center_top] md:object-[right_top]"
             />
             {/* Gradient overlay for text readability */}
             <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-black/90 via-black/50 to-transparent' : 'bg-gradient-to-r from-white/80 via-white/40 to-transparent'}`} />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center pt-32 md:pt-36 pb-24 md:pb-32">
            <div className={`max-w-2xl ${isDark ? 'text-white' : 'text-[#052B08]'}`}>
              
              {/* Top Subtitle */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="mb-4"
              >
                {isDark ? (
                  <h2 className="text-4xl md:text-6xl font-serif leading-tight">
                    Stronger Roots. <br />
                    Longer Lengths. <br />
                    <span className="font-serif italic text-[#F8CD71]">Lasting Shine.</span>
                  </h2>
                ) : (
                  <>
                    <p className="text-xs md:text-sm tracking-[0.3em] uppercase font-bold mb-4">
                      {product.benefits.join(' • ')}
                    </p>
                    <h2 className="text-6xl md:text-8xl font-serif mb-6 leading-none">
                      {product.title.split(' ')[0]} <br />
                      {product.title.split(' ').slice(1).join(' ')}
                    </h2>
                  </>
                )}
              </motion.div>

              {/* Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`text-base md:text-lg mb-8 max-w-lg leading-relaxed ${isDark ? 'text-white/90' : 'text-[#052B08]/90'}`}
              >
                {product.description}
              </motion.p>

              {/* Redesigned Minimalist Boutique Tiles */}
              <div className="relative mb-12 flex flex-col sm:flex-row flex-wrap gap-3 md:gap-6">
                {product.benefits.map((benefit, i) => {
                  const getIcon = (name: string) => {
                    const n = name.toLowerCase();
                    if (n.includes('growth') || n.includes('regrowth') || n.includes('therapy')) return <Sparkles size={14} />;
                    if (n.includes('blend') || n.includes('herbal') || n.includes('natural')) return <Leaf size={14} />;
                    if (n.includes('strength') || n.includes('root') || n.includes('rescue')) return <Shield size={14} />;
                    if (n.includes('cleanse') || n.includes('wash')) return <Droplets size={14} />;
                    if (n.includes('shine') || n.includes('gloss')) return <Sun size={14} />;
                    return <div className="w-1 h-1 rounded-full bg-current" />;
                  };

                  return (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ x: 10 }}
                      transition={{ 
                        delay: 0.6 + i * 0.1, 
                        duration: 0.5,
                        ease: "easeOut"
                      }}
                      className="group flex items-center"
                    >
                      <div 
                        className={`relative flex items-center gap-4 py-4 px-6 rounded-xl transition-all duration-500 ${
                          isDark 
                            ? 'bg-white/5 hover:bg-white/10 border border-white/10' 
                            : 'bg-white/40 backdrop-blur-md hover:bg-white/80 border border-[#052B08]/5 shadow-sm hover:shadow-md'
                        }`}
                      >
                        {/* Vertical Accent Bar */}
                        <div className={`absolute left-0 top-1/4 bottom-1/4 w-[3px] rounded-r-full transition-all duration-500 group-hover:top-0 group-hover:bottom-0 ${
                          isDark ? 'bg-[#F8CD71]' : 'bg-[#1A4B21]'
                        }`} />

                        {/* Icon */}
                        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${
                          isDark ? 'bg-white/5 text-[#F8CD71]' : 'bg-[#1A4B21]/5 text-[#1A4B21]'
                        }`}>
                          {getIcon(benefit)}
                        </div>

                        {/* Text Content */}
                        <div className="flex flex-col">
                          <span className={`text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-extrabold leading-none ${
                            isDark ? 'text-white' : 'text-[#1A4B21]'
                          }`}
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {benefit}
                          </span>
                          <span className={`text-[8px] uppercase tracking-[0.1em] mt-1 opacity-0 group-hover:opacity-40 transition-opacity duration-500 ${
                            isDark ? 'text-white' : 'text-[#1A4B21]'
                          }`}>
                            Pure Essence
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Shop Button with hover animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <Link to={`/product/${product.id}`}>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#1A4B21] text-white px-8 py-4 rounded-full font-bold tracking-widest uppercase text-xs flex items-center gap-3 hover:bg-[#0f2e14] transition-all duration-300 group shadow-lg hover:shadow-2xl"
                  >
                    Shop Now 
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      <ArrowRight size={16} />
                    </motion.div>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination Controls */}
      <div className="absolute bottom-8 right-6 md:right-12 z-30 flex items-center gap-4">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="w-10 h-10 rounded-full border border-current flex items-center justify-center bg-white/30 backdrop-blur-sm hover:bg-white transition-all text-[#052B08]"
        >
          <ChevronLeft size={18} />
        </motion.button>
        <div className="overflow-hidden h-5 flex items-center">
          <AnimatePresence mode="wait">
            <motion.span 
              key={current}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className={`font-bold tracking-widest text-sm ${isDark ? 'text-white' : 'text-[#052B08]'}`}
            >
              0{current + 1}
            </motion.span>
          </AnimatePresence>
          <span className={`font-bold tracking-widest text-sm mx-1 ${isDark ? 'text-white' : 'text-[#052B08]'}`}>/</span>
          <span className={`font-bold tracking-widest text-sm ${isDark ? 'text-white' : 'text-[#052B08]'}`}>0{products.length}</span>
        </div>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="w-10 h-10 rounded-full border border-current flex items-center justify-center bg-white/30 backdrop-blur-sm hover:bg-white transition-all text-[#052B08]"
        >
          <ChevronRight size={18} />
        </motion.button>
      </div>


    </section>
  );
}
