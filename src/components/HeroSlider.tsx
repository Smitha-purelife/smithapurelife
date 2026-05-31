import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../data/products';
import { Link } from 'react-router-dom';

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % products.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + products.length) % products.length);

  const product = products[current];
  const isDark = product.id === 'radiance-oil';
  const textColor = isDark || product.hasFullBanner ? 'text-white' : 'text-[#1A2E1A]';

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-[#EBF3EB]"
      style={{ height: '100svh', minHeight: '560px', maxHeight: '900px' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* ── Background Image ── */}
          {product.hasFullBanner ? (
            <Link to={`/product/${product.id}`} className="absolute inset-0 w-full h-full overflow-hidden block">
              <motion.img
                src={product.lifestyleImage}
                alt={product.title}
                initial={{ scale: 1.06 }}
                animate={{ scale: 1 }}
                transition={{ duration: 8, ease: 'linear' }}
                className="w-full h-full object-cover object-center"
              />
            </Link>
          ) : (
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <motion.img
                src={product.lifestyleImage}
                alt={product.title}
                initial={{ scale: 1.06 }}
                animate={{ scale: 1 }}
                transition={{ duration: 8, ease: 'linear' }}
                className="w-full h-full object-cover object-center"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-white/10"
              />
            </div>
          )}

          {/* ── Desktop Floating Bottle ── */}
          {!product.hasFullBanner && (
            <motion.div
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.9, type: 'spring', bounce: 0.3 }}
              className="hidden md:flex absolute right-[8%] lg:right-[14%] top-1/2 -translate-y-1/2 w-64 lg:w-80 aspect-square items-center justify-center z-20 pointer-events-none"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </motion.div>
          )}

          {/* ── Text Content (Only rendered when not a full graphic banner to prevent overlap) ── */}
          {!product.hasFullBanner && (
            <div className="relative z-10 w-full h-full flex flex-col justify-center pt-20 pb-28 md:pb-24">
              <div className="max-w-7xl mx-auto w-full px-5 md:px-10 lg:px-16">
                <div className={`max-w-xs sm:max-w-sm md:max-w-lg ${textColor}`}>

                  {/* Slide label */}
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className={`text-[10px] tracking-[0.3em] uppercase font-bold mb-3 ${
                      isDark ? 'text-[#F8CD71]' : 'text-[#2D7A3A]'
                    }`}
                  >
                    0{current + 1} / 0{products.length} &nbsp;·&nbsp; {product.subtitle}
                  </motion.p>

                  {/* Product Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="font-serif leading-tight mb-3"
                    style={{ fontSize: 'clamp(2rem, 8vw, 4.5rem)' }}
                  >
                    {isDark ? (
                      <>
                        Stronger Roots.<br />
                        Longer Lengths.<br />
                        <span className="italic text-[#F8CD71]">Lasting Shine.</span>
                      </>
                    ) : (
                      product.title
                    )}
                  </motion.h1>

                  {/* Description – hidden on very small screens to save space */}
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.7 }}
                    className={`text-sm md:text-base leading-relaxed mb-5 max-w-sm ${
                      isDark ? 'text-white/85' : 'text-[#1A2E1A]/80'
                    } hidden sm:block`}
                  >
                    {product.description}
                  </motion.p>

                  {/* Benefit pills — horizontal scroll on mobile, no wrap */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.6 }}
                    className="flex gap-2 mb-6 overflow-x-auto pb-1 hide-scrollbar"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                  >
                    {product.benefits.map((benefit) => (
                      <span
                        key={benefit}
                        className={`flex-shrink-0 text-[10px] md:text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full whitespace-nowrap ${
                          isDark
                            ? 'bg-white/15 text-white border border-white/25 backdrop-blur-sm'
                            : 'bg-[#1A4B21]/10 text-[#1A4B21] border border-[#1A4B21]/20'
                        }`}
                      >
                        {benefit}
                      </span>
                    ))}
                  </motion.div>

                  {/* CTA row */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.6 }}
                    className="flex items-center gap-4"
                  >
                    <Link to={`/product/${product.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs tracking-widest uppercase shadow-lg transition-all duration-300 ${
                          isDark
                            ? 'bg-[#F8CD71] text-[#1A2E00] hover:bg-yellow-300'
                            : 'bg-[#1A4B21] text-white hover:bg-[#0f2e14]'
                        }`}
                      >
                        Shop Now
                        <ArrowRight size={14} />
                      </motion.button>
                    </Link>

                    {/* Mobile inline bottle thumbnail */}
                    {!product.hasFullBanner && (
                      <div className="md:hidden w-14 h-20 flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-contain drop-shadow-lg"
                        />
                      </div>
                    )}
                  </motion.div>

                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Pagination ── */}
      <div className="absolute bottom-5 left-5 md:bottom-8 md:right-10 md:left-auto z-30 flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          aria-label="Previous"
          className={`w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center backdrop-blur-sm transition-all ${
            isDark
              ? 'border-white/40 text-white bg-white/10 hover:bg-white/20'
              : 'border-[#1A4B21]/40 text-[#1A4B21] bg-white/40 hover:bg-white'
          }`}
        >
          <ChevronLeft size={16} />
        </motion.button>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-400 ${
                i === current
                  ? isDark ? 'w-6 h-2 bg-[#F8CD71]' : 'w-6 h-2 bg-[#1A4B21]'
                  : isDark ? 'w-2 h-2 bg-white/30' : 'w-2 h-2 bg-[#1A4B21]/30'
              }`}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          aria-label="Next"
          className={`w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center backdrop-blur-sm transition-all ${
            isDark
              ? 'border-white/40 text-white bg-white/10 hover:bg-white/20'
              : 'border-[#1A4B21]/40 text-[#1A4B21] bg-white/40 hover:bg-white'
          }`}
        >
          <ChevronRight size={16} />
        </motion.button>
      </div>
    </section>
  );
}
