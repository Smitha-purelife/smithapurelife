import { products } from '../data/products';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// ─── Per-product card config ────────────────────────────────────────────────
// shopImage  → the image shown in the card thumbnail
// objectFit  → 'cover' for studio shots with backgrounds, 'contain' for plain bottles
// bgColor    → card background colour (shows when objectFit is 'contain')
// ⬇ SWAP shopImage paths below to use your own custom images ⬇
const cardConfig: Record<string, {
  shopImage: string;
  objectFit: 'cover' | 'contain';
  bgColor: string;
  price: string;
  badge: string;
  badgeColor: string;
}> = {
  'avosilk-bloom': {
    shopImage: '/products/media__1779533781731.jpg',
    objectFit: 'cover',
    bgColor: '#EEF7EE',
    price: '₹1,200',
    badge: 'Bestseller',
    badgeColor: '#2D7A3A',
  },
  'radiance-oil': {
    shopImage: '/products/media__1779346610043.png',
    objectFit: 'cover',
    bgColor: '#FFF8E6',
    price: '₹1,450',
    badge: 'Trending',
    badgeColor: '#B8860B',
  },
  'herbal-wash': {
    shopImage: '/products/media__1779533787189.jpg',
    objectFit: 'cover',
    bgColor: '#EEF4EE',
    price: '₹999',
    badge: 'Viral',
    badgeColor: '#4A7C59',
  },
  'pro-repair-serum': {
    shopImage: '/products/media__1779533774577.jpg',
    objectFit: 'cover',
    bgColor: '#FDF0F5',
    price: '₹1,150',
    badge: 'Must Have',
    badgeColor: '#8B5E8B',
  },
  'follicra-regrowth': {
    shopImage: '/products/hexagen-image (1).png',
    objectFit: 'contain',
    bgColor: '#EEF7F4',
    price: '₹1,800',
    badge: 'New',
    badgeColor: '#2D6A8B',
  },
};

export default function KBeautyBestsellers() {
  const [showAll, setShowAll] = useState(false);
  const visibleProducts = showAll ? products : products.slice(0, 4);

  return (
    <section id="trending" className="py-20 bg-[#F5F7F5] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase font-bold text-[#1A4B21] mb-2">
              Community Favourites
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#2D2A26]">
              Trending Now
            </h2>
          </div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-bold text-[#1A4B21] border-2 border-[#1A4B21] px-6 py-2.5 rounded-full hover:bg-[#1A4B21] hover:text-white transition-all duration-300"
          >
            {showAll ? 'View Less' : 'View All'}
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product, i) => {
            const cfg = cardConfig[product.id] ?? {
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
      </div>
    </section>
  );
}
