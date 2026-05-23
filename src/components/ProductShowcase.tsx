import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Droplets, Sparkles, ShieldCheck } from 'lucide-react';
import { products } from '../data/products';

// ─── Unified Product Card Config ──────────────────────────────────────────
const shopConfig: Record<string, {
  price: string;
  badge: string;
  badgeColor: string;
  shopImage: string;
  objectFit: 'cover' | 'contain';
  bgColor: string;
}> = {
  'avosilk-bloom': {
    price: '₹1,200',
    badge: 'Bestseller',
    badgeColor: '#2D7A3A',
    shopImage: '/products/media__1779533781731.jpg',
    objectFit: 'cover',
    bgColor: '#EEF7EE',
  },
  'radiance-oil': {
    price: '₹1,450',
    badge: 'Trending',
    badgeColor: '#B8860B',
    shopImage: '/products/media__1779346610043.png',
    objectFit: 'cover',
    bgColor: '#FFF8E6',
  },
  'herbal-wash': {
    price: '₹999',
    badge: 'Natural',
    badgeColor: '#4A7C59',
    shopImage: '/products/media__1779533787189.jpg',
    objectFit: 'cover',
    bgColor: '#EEF4EE',
  },
  'pro-repair-serum': {
    price: '₹1,150',
    badge: 'Must Have',
    badgeColor: '#8B5E8B',
    shopImage: '/products/media__1779533774577.jpg',
    objectFit: 'cover',
    bgColor: '#FDF0F5',
  },
  'follicra-regrowth': {
    price: '₹1,800',
    badge: 'New',
    badgeColor: '#2D6A8B',
    shopImage: '/products/hexagen-image (1).png',
    objectFit: 'contain',
    bgColor: '#EEF7F4',
  },
};

// ─── Main section ───────────────────────────────────────────────────────
export default function ProductShowcase() {
  const sectionRef = useRef(null);
  const titleInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} id="shop" className="py-16 md:py-24 bg-[#F5F2EE] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-xs tracking-[0.35em] uppercase font-bold text-[#2D7A3A] mb-2">
              Our Collection
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-[#2D2A26] leading-tight">
              Pure Formulas.<br className="hidden md:block" />
              <span className="italic text-[#2D2A26]/60">Real Results.</span>
            </h2>
          </div>
          <Link
            to="/product/avosilk-bloom"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A4B21] border border-[#1A4B21]/30 px-5 py-2.5 rounded-full hover:bg-[#1A4B21] hover:text-white transition-all duration-300 self-start sm:self-auto"
          >
            Shop All <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Grid: All products equal size */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {products.map((product, i) => {
            const cfg = shopConfig[product.id] ?? {
              shopImage: product.image,
              objectFit: 'contain' as const,
              bgColor: product.bg,
              price: '₹999',
              badge: '',
              badgeColor: '#666',
            };

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="group relative flex flex-col rounded-[2rem] overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 bg-white h-[500px] md:h-[550px]"
              >
                {/* Badge */}
                {cfg.badge && (
                  <div
                    className="absolute top-4 left-4 z-10 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md"
                    style={{ backgroundColor: cfg.badgeColor }}
                  >
                    {cfg.badge}
                  </div>
                )}

                {/* Background Image Container */}
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{ backgroundColor: cfg.objectFit === 'contain' ? cfg.bgColor : '#FDF9F6' }}
                >
                  <Link to={`/product/${product.id}`} className="block w-full h-full">
                    <img
                      src={cfg.shopImage}
                      alt={product.title}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = product.image;
                        (e.currentTarget as HTMLImageElement).style.objectFit = 'contain';
                        (e.currentTarget as HTMLImageElement).style.padding = '32px';
                      }}
                      className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${
                        cfg.objectFit === 'cover'
                          ? 'object-cover object-center'
                          : 'object-contain p-8 pb-32'
                      }`}
                    />
                  </Link>
                </div>

                {/* White Floating Content Overlay */}
                <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 pointer-events-none">
                  <div className="bg-white/95 backdrop-blur-xl rounded-[1.5rem] p-5 md:p-6 shadow-sm border border-white/60 pointer-events-auto transition-transform duration-300 group-hover:-translate-y-1">
                    
                    {/* Subtitle */}
                    <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                      {product.subtitle || 'Smitha Purelife'}
                    </p>
                    
                    {/* Title & Price */}
                    <div className="flex justify-between items-end mb-4">
                      <Link to={`/product/${product.id}`} className="block flex-1 pr-2">
                        <h3 className="font-serif text-xl md:text-2xl text-[#2D2A26] leading-snug group-hover:text-[#1A4B21] transition-colors line-clamp-1">
                          {product.title}
                        </h3>
                      </Link>
                      <span className="font-bold text-2xl md:text-3xl text-[#2D2A26] leading-none shrink-0" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {cfg.price}
                      </span>
                    </div>

                    {/* Tags & Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {product.benefits.slice(0, 2).map((b, i) => (
                          <span key={i} className="bg-[#EEF7EE] text-[#1A4B21] px-3 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap">
                            {b}
                          </span>
                        ))}
                      </div>
                      <Link to={`/product/${product.id}`} className="shrink-0 ml-2">
                        <button className="flex items-center gap-2 bg-[#1A4B21] text-white px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider hover:bg-[#0f2e14] transition-all shadow-md hover:shadow-lg active:scale-95">
                          Shop Now <ArrowRight size={14} />
                        </button>
                      </Link>
                    </div>

                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Banner strip at bottom of grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-[#1A4B21] rounded-2xl px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div>
            <p className="text-white/60 text-[11px] uppercase tracking-widest font-semibold mb-1">
              Free Delivery
            </p>
            <p className="text-white font-serif text-lg leading-snug">
              On all orders above <span className="font-bold">₹799</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-white/80 text-xs font-medium">
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} /> 100% Natural</span>
            <span className="flex items-center gap-1.5"><Leaf size={14} /> No Parabens</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
