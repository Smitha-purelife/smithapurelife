import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../data/products';
import { Link } from 'react-router-dom';

// ─── Hero config per product ─────────────────────────────────────────────────
const heroConfig: Record<string, {
  bgImage: string;
  accentColor: string;
  headlineOverride?: string;
  hideOverlayText?: boolean;
  objectPos?: string;
  objectFit?: 'cover' | 'contain';
  bgColor?: string;
  // splitLayout: show full product image on the right, solid bg on the left
  splitLayout?: boolean;
  productImage?: string; // the real product photo shown on right in split mode
}> = {
  'avosilk-bloom': {
    bgImage: '/products/media__1779362724448.png',
    accentColor: '#2D7A3A',
    objectPos: 'center center',
    hideOverlayText: true,
  },
  'radiance-oil': {
    bgImage: '/products/media__1779362732647.png',
    accentColor: '#C8941A',
    headlineOverride: 'Stronger Roots.\nLonger Lengths.\nLasting Shine.',
    objectPos: 'center center',
    hideOverlayText: true,
  },
  'herbal-wash': {
    bgImage: '/products/herbal_wash_hero_wide_v3.png',
    accentColor: '#C8760A',
    bgColor: '#1c1208',
    objectPos: '82% center',
  },
  'pro-repair-serum': {
    bgImage: '/products/pro_repair_serum_hero_wide_v3.png',
    accentColor: '#C07DB8',
    bgColor: '#1a0e1e',
    objectPos: '82% center',
  },
  'follicra-regrowth': {
    bgImage: '/products/follicra_hero_wide_v3.png',
    accentColor: '#4EA8C2',
    bgColor: '#051209',
    objectPos: '82% center',
  },
  'satin-pillowcase': {
    bgImage: '/products/satin_pillowcase_proper.jpg',
    accentColor: '#C47B5A',
    objectPos: 'center center',
  },
  'satin-scrunchies': {
    bgImage: '/products/satin_scrunchies_proper.jpg',
    accentColor: '#7A6E5F',
    objectPos: 'center center',
  },
};

// Navbar height in pixels - used to offset the hero below the fixed navbar
const NAV_HEIGHT = 64;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() =>
    setCurrent((p) => (p + 1) % products.length), []);
  const prevSlide = useCallback(() =>
    setCurrent((p) => (p - 1 + products.length) % products.length), []);

  // Auto-advance
  useEffect(() => {
    if (!isAutoPlaying) return;
    const t = setInterval(nextSlide, 6000);
    return () => clearInterval(t);
  }, [isAutoPlaying, nextSlide]);

  const handleManual = (fn: () => void) => {
    setIsAutoPlaying(false);
    fn();
    // resume after 10s of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const product = products[current];
  const cfg = heroConfig[product.id] ?? {
    bgImage: product.lifestyleImage,
    accentColor: '#1A4B21',
    objectPos: 'center center',
  };

  const headline = cfg.headlineOverride
    ? cfg.headlineOverride.split('\n')
    : [product.title];

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{
        marginTop: `${NAV_HEIGHT}px`,
        height: `calc(100svh - ${NAV_HEIGHT}px)`,
        minHeight: '480px',
        maxHeight: '960px',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          {cfg.hideOverlayText ? (
            <Link to={`/product/${product.id}`} className="absolute inset-0 w-full h-full block cursor-pointer">
              {/* ── Full-bleed Background Image ── */}
              <motion.img
                src={cfg.bgImage}
                alt={product.title}
                initial={{ scale: cfg.objectFit === 'contain' ? 1 : 1.07 }}
                animate={{ scale: 1 }}
                transition={{ duration: 9, ease: 'linear' }}
                className="absolute inset-0 w-full h-full"
                style={{
                  objectFit: cfg.objectFit || 'cover',
                  objectPosition: cfg.objectPos || 'center center',
                  backgroundColor: cfg.bgColor || 'transparent',
                }}
              />
            </Link>
          ) : cfg.splitLayout ? (
            // ── SPLIT LAYOUT: solid bg left + full product image right ──────
            <>
              {/* Solid background */}
              <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: cfg.bgColor || '#111' }} />

              {/* Right side: full product image — desktop only */}
              <div className="absolute inset-y-0 right-0 hidden md:block" style={{ width: '52%' }}>
                <motion.img
                  src={cfg.productImage}
                  alt={product.title}
                  initial={{ scale: 1.04, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full"
                  style={{ objectFit: 'contain', objectPosition: 'center center' }}
                />
                {/* Fade edge from left so text blends in */}
                <div
                  className="absolute inset-y-0 left-0 w-24 pointer-events-none"
                  style={{ background: `linear-gradient(to right, ${cfg.bgColor || '#111'}, transparent)` }}
                />
              </div>

              {/* Mobile: product image fills top half */}
              <div className="absolute inset-x-0 top-0 md:hidden" style={{ height: '52%' }}>
                <motion.img
                  src={cfg.productImage}
                  alt={product.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full"
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                />
                {/* Fade from bottom into the bg */}
                <div
                  className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
                  style={{ background: `linear-gradient(to top, ${cfg.bgColor || '#111'}, transparent)` }}
                />
              </div>

              {/* Slide counter */}
              <div className="absolute top-4 left-4 md:top-6 md:left-8 z-20">
                <span className="text-white/60 text-[10px] font-bold tracking-[0.25em] uppercase">
                  {String(current + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
                </span>
              </div>

              {/* Mobile text: anchored to bottom half */}
              <div className="absolute inset-0 flex flex-col md:hidden z-10">
                <div className="mt-auto px-5 pb-20 sm:pb-24">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-[10px] tracking-[0.28em] uppercase font-bold mb-2.5"
                    style={{ color: cfg.accentColor }}
                  >
                    {product.subtitle}
                  </motion.p>
                  <motion.h1
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="font-serif text-white leading-[1.1] mb-4"
                    style={{ fontSize: 'clamp(1.75rem, 8vw, 2.8rem)' }}
                  >
                    {headline.map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.45, duration: 0.5 }}
                    className="flex gap-2 mb-5 overflow-x-auto pb-1 hide-scrollbar"
                  >
                    {product.benefits.slice(0, 3).map((b) => (
                      <span key={b} className="flex-shrink-0 text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full whitespace-nowrap bg-white/15 text-white border border-white/20">
                        {b}
                      </span>
                    ))}
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.5 }}>
                    <Link to={`/product/${product.id}`}>
                      <button
                        className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs tracking-widest uppercase shadow-xl active:scale-95 transition-all"
                        style={{ backgroundColor: cfg.accentColor, color: '#fff' }}
                      >
                        Shop Now <ArrowRight size={14} />
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Desktop text: left side */}
              <div className="absolute inset-y-0 left-0 hidden md:flex flex-col justify-center z-10 px-10 lg:px-16 xl:px-24" style={{ width: '50%' }}>
                <motion.p
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-[11px] tracking-[0.3em] uppercase font-bold mb-3"
                  style={{ color: cfg.accentColor }}
                >
                  {product.subtitle}
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif text-white leading-[1.05] mb-4"
                  style={{ fontSize: 'clamp(2rem, 3.5vw, 4rem)' }}
                >
                  {headline.map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42, duration: 0.6 }}
                  className="text-white/75 text-sm md:text-base leading-relaxed mb-6 max-w-md"
                >
                  {product.description.split('.')[0]}.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.52, duration: 0.5 }}
                  className="flex flex-wrap gap-2 mb-7"
                >
                  {product.benefits.slice(0, 4).map((b) => (
                    <span key={b} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/10 text-white border border-white/20">
                      {b}
                    </span>
                  ))}
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.62, duration: 0.5 }}>
                  <Link to={`/product/${product.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-xs tracking-widest uppercase shadow-2xl transition-all duration-300"
                      style={{ backgroundColor: cfg.accentColor, color: '#fff' }}
                    >
                      Shop Now <ArrowRight size={15} />
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </>
          ) : (
            // ── FULL-BLEED LAYOUT (default) ─────────────────────────────────
            <>
              {/* Full-bleed Background Image */}
              <motion.img
                src={cfg.bgImage}
                alt={product.title}
                initial={{ scale: 1.07 }}
                animate={{ scale: 1 }}
                transition={{ duration: 9, ease: 'linear' }}
                className="absolute inset-0 w-full h-full"
                style={{
                  objectFit: 'cover',
                  objectPosition: cfg.objectPos || 'center center',
                  backgroundColor: cfg.bgColor || 'transparent',
                }}
              />

              {/* Mobile gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent md:hidden pointer-events-none" />
              {/* Desktop subtle overlay */}
              <div className="absolute inset-0 bg-black/10 hidden md:block pointer-events-none" />

              {/* Slide counter */}
              <div className="absolute top-4 left-4 md:top-6 md:left-8 z-20">
                <span className="text-white/80 drop-shadow-md text-[10px] font-bold tracking-[0.25em] uppercase">
                  {String(current + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
                </span>
              </div>

              {/* Mobile text */}
              <div className="absolute inset-0 flex flex-col md:hidden z-10">
                <div className="mt-auto px-5 pb-20 sm:pb-24">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-[10px] tracking-[0.28em] uppercase font-bold mb-2.5"
                    style={{ color: '#86EFAC', textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
                  >
                    {product.subtitle}
                  </motion.p>
                  <motion.h1
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="font-serif text-white leading-[1.1] mb-4"
                    style={{ fontSize: 'clamp(1.75rem, 8vw, 3rem)' }}
                  >
                    {headline.map((line, i) => (
                      <span key={i} className={`block ${i === headline.length - 1 && headline.length > 1 ? 'italic text-yellow-300' : ''}`}>
                        {line}
                      </span>
                    ))}
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.45, duration: 0.5 }}
                    className="flex gap-2 mb-5 overflow-x-auto pb-1 hide-scrollbar"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                  >
                    {product.benefits.slice(0, 4).map((b) => (
                      <span key={b} className="flex-shrink-0 text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full whitespace-nowrap bg-white/15 text-white border border-white/25 backdrop-blur-sm">
                        {b}
                      </span>
                    ))}
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.5 }}>
                    <Link to={`/product/${product.id}`}>
                      <button
                        className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs tracking-widest uppercase shadow-xl active:scale-95 transition-all duration-200"
                        style={{ backgroundColor: 'white', color: '#1A2E00' }}
                      >
                        Shop Now <ArrowRight size={14} />
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Desktop text */}
              <div className="absolute inset-0 hidden md:flex flex-col justify-center z-10 px-10 lg:px-16 xl:px-24 2xl:px-32">
                <div className="max-w-xl 2xl:max-w-2xl">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-[11px] tracking-[0.3em] uppercase font-bold mb-3 drop-shadow-md"
                    style={{ color: '#86EFAC', textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}
                  >
                    {product.subtitle}
                  </motion.p>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="font-serif text-white leading-[1.05] mb-4 drop-shadow-xl"
                    style={{ fontSize: 'clamp(2.5rem, 4.5vw, 5rem)', textShadow: '0 4px 12px rgba(0,0,0,0.4)' }}
                  >
                    {headline.map((line, i) => (
                      <span key={i} className={`block ${i === headline.length - 1 && headline.length > 1 ? 'italic text-yellow-300' : ''}`}>
                        {line}
                      </span>
                    ))}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.42, duration: 0.6 }}
                    className="text-white/90 drop-shadow-md text-sm md:text-base leading-relaxed mb-6 max-w-md 2xl:max-w-lg"
                    style={{ textShadow: '0 2px 6px rgba(0,0,0,0.5)' }}
                  >
                    {product.description.split('.')[0]}.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.52, duration: 0.5 }}
                    className="flex flex-wrap gap-2 mb-7"
                  >
                    {product.benefits.slice(0, 4).map((b) => (
                      <span key={b} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/15 text-white border border-white/25 backdrop-blur-sm">
                        {b}
                      </span>
                    ))}
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.62, duration: 0.5 }}>
                    <Link to={`/product/${product.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-xs tracking-widest uppercase shadow-2xl transition-all duration-300"
                        style={{ backgroundColor: 'white', color: '#1A2E00' }}
                      >
                        Shop Now <ArrowRight size={15} />
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Navigation Controls ── */}
      {/* Mobile: bottom center */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 md:hidden">
        <button
          onClick={() => handleManual(prevSlide)}
          aria-label="Previous"
          className="w-9 h-9 rounded-full border border-white/40 bg-white/15 backdrop-blur-sm flex items-center justify-center text-white active:scale-90 transition-transform"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-1.5">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIsAutoPlaying(false); setCurrent(i); }}
              aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all duration-400 ${
                i === current ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/35'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => handleManual(nextSlide)}
          aria-label="Next"
          className="w-9 h-9 rounded-full border border-white/40 bg-white/15 backdrop-blur-sm flex items-center justify-center text-white active:scale-90 transition-transform"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Desktop: bottom right */}
      <div className="absolute bottom-8 right-8 xl:right-12 z-30 hidden md:flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleManual(prevSlide)}
          aria-label="Previous"
          className="w-10 h-10 rounded-full border border-white/40 bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-all"
        >
          <ChevronLeft size={17} />
        </motion.button>

        <div className="flex items-center gap-2">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIsAutoPlaying(false); setCurrent(i); }}
              aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all duration-400 ${
                i === current ? 'w-7 h-2 bg-white' : 'w-2 h-2 bg-white/40'
              }`}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleManual(nextSlide)}
          aria-label="Next"
          className="w-10 h-10 rounded-full border border-white/40 bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-all"
        >
          <ChevronRight size={17} />
        </motion.button>
      </div>

      {/* ── Progress bar at very bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-30">
        <motion.div
          key={current}
          className="h-full bg-white/60"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 6, ease: 'linear' }}
        />
      </div>
    </section>
  );
}
