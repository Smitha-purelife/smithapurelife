import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
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
    <section className="relative w-full min-h-[100svh] overflow-hidden bg-[#EBF3EB]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background / Lifestyle Image */}
          <div className="absolute inset-0 w-full h-full">
             <img 
               src={product.lifestyleImage} 
               alt={product.title} 
               className="w-full h-full object-cover object-[center_top] md:object-[right_top]"
             />
             {/* Gradient overlay for text readability */}
             <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-black/90 via-black/50 to-transparent' : 'bg-gradient-to-r from-white/80 via-white/40 to-transparent'}`} />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center pt-24 pb-32">
            <div className={`max-w-2xl ${isDark ? 'text-white' : 'text-[#052B08]'}`}>
              
              {/* Top Subtitle */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
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
                transition={{ delay: 0.5, duration: 0.8 }}
                className={`text-base md:text-lg mb-8 max-w-lg leading-relaxed ${isDark ? 'text-white/90' : 'text-[#052B08]/90'}`}
              >
                {product.description}
              </motion.p>

              {/* Arched Icons / Features */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                {product.benefits.map((benefit, i) => (
                  <div 
                    key={i} 
                    className={`flex flex-col items-center justify-center text-center p-4 rounded-t-full rounded-b-xl w-24 h-32 ${
                      isDark ? 'border border-white/20' : 'bg-white/40 backdrop-blur-sm border border-[#052B08]/10'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full mb-3 flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-white'}`}>
                      {/* Simple dot placeholder for icon */}
                      <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#F8CD71]' : 'bg-[#052B08]'}`} />
                    </div>
                    <span className={`text-[10px] uppercase tracking-wider font-bold leading-tight ${isDark ? 'text-white' : 'text-[#052B08]'}`}>
                      {benefit}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* Shop Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <Link to={`/product/${product.id}`}>
                  <button className="bg-[#1A4B21] text-white px-8 py-4 rounded-full font-bold tracking-widest uppercase text-xs flex items-center gap-3 hover:bg-[#0f2e14] transition-colors">
                    Shop Now <ArrowRight size={16} />
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination Controls */}
      <div className="absolute bottom-8 right-6 md:right-12 z-30 flex items-center gap-4">
        <button 
          onClick={prevSlide}
          className="w-10 h-10 rounded-full border border-current flex items-center justify-center bg-white/30 backdrop-blur-sm hover:bg-white transition-all text-[#052B08]"
        >
          <ChevronLeft size={18} />
        </button>
        <span className={`font-bold tracking-widest text-sm ${isDark ? 'text-white' : 'text-[#052B08]'}`}>
          0{current + 1} / 0{products.length}
        </span>
        <button 
          onClick={nextSlide}
          className="w-10 h-10 rounded-full border border-current flex items-center justify-center bg-white/30 backdrop-blur-sm hover:bg-white transition-all text-[#052B08]"
        >
          <ChevronRight size={18} />
        </button>
      </div>


    </section>
  );
}
