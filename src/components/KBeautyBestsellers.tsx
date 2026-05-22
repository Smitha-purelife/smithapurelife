import { products } from '../data/products';
import { motion } from 'framer-motion';
import { Star, ShoppingBag } from 'lucide-react';
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
  discount: string;
  rating: number;
  reviews: number;
}> = {
  'avosilk-bloom': {
    shopImage: '/products/media__1779346601889.png',   // lifestyle model photo
    objectFit: 'cover',
    bgColor: '#EEF7EE',
    price: '₹1,200',
    badge: 'Bestseller',
    badgeColor: '#2D7A3A',
    discount: '15% OFF',
    rating: 4.8,
    reviews: 1204,
  },
  'radiance-oil': {
    shopImage: '/products/media__1779346610043.png',   // lifestyle model photo
    objectFit: 'cover',
    bgColor: '#FFF8E6',
    price: '₹1,450',
    badge: 'Trending',
    badgeColor: '#B8860B',
    discount: '20% OFF',
    rating: 4.9,
    reviews: 3400,
  },
  'herbal-wash': {
    shopImage: '/products/media__1779346616301.jpg',   // lifestyle photo
    objectFit: 'cover',
    bgColor: '#EEF4EE',
    price: '₹999',
    badge: 'Viral',
    badgeColor: '#4A7C59',
    discount: '',
    rating: 4.7,
    reviews: 5800,
  },
  // ⬇ Replace 'silk_gloss_pro_repair_serum.png' with the studio shot once saved
  'pro-repair-serum': {
    shopImage: '/products/silk_gloss_pro_repair_serum_studio.png', // ← new studio shot
    objectFit: 'cover',
    bgColor: '#FDF0F5',
    price: '₹1,150',
    badge: 'Must Have',
    badgeColor: '#8B5E8B',
    discount: '10% OFF',
    rating: 4.9,
    reviews: 4200,
  },
  'follicra-regrowth': {
    shopImage: '/products/hexagen-image (1).png',
    objectFit: 'contain',
    bgColor: '#EEF7F4',
    price: '₹1,800',
    badge: 'New',
    badgeColor: '#2D6A8B',
    discount: '5% OFF',
    rating: 5.0,
    reviews: 890,
  },
};

export default function KBeautyBestsellers() {
  const [showAll, setShowAll] = useState(false);
  const visibleProducts = showAll ? products : products.slice(0, 4);

  return (
    <section id="trending" className="py-20 bg-[#C1CDBF] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase font-bold text-[#2D7A3A] mb-2">
              Community Favourites
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#2D2A26]"
                style={{ fontFamily: "'Playfair Display', serif" }}>
              Trending Now
            </h2>
            <p className="text-[#2D2A26]/60 text-sm mt-1">
              Cult favorites loved by the community.
            </p>
          </div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-semibold text-[#1A4B21] border border-[#1A4B21]/30 px-5 py-2 rounded-full hover:bg-[#1A4B21] hover:text-white transition-all duration-300"
          >
            {showAll ? 'View Less' : 'View All'}
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {visibleProducts.map((product, i) => {
            const cfg = cardConfig[product.id] ?? {
              shopImage: product.image,
              objectFit: 'contain' as const,
              bgColor: product.bg,
              price: '₹999',
              badge: '',
              badgeColor: '#666',
              discount: '',
              rating: 4.8,
              reviews: 100,
            };

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 group relative flex flex-col"
              >
                {/* Badge */}
                {cfg.badge && (
                  <div
                    className="absolute top-3 left-3 z-10 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm"
                    style={{ backgroundColor: cfg.badgeColor }}
                  >
                    {cfg.badge}
                  </div>
                )}

                {/* Image container — fixed height, no crop bleed */}
                <Link to={`/product/${product.id}`} className="block">
                  <div
                    className="w-full overflow-hidden"
                    style={{
                      height: '220px',
                      backgroundColor: cfg.bgColor,
                    }}
                  >
                    <img
                      src={cfg.shopImage}
                      alt={product.title}
                      onError={(e) => {
                        // Fallback to product.image if studio shot not found yet
                        (e.currentTarget as HTMLImageElement).src = product.image;
                        (e.currentTarget as HTMLImageElement).style.objectFit = 'contain';
                        (e.currentTarget as HTMLImageElement).style.padding = '16px';
                      }}
                      className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                        cfg.objectFit === 'cover'
                          ? 'object-cover object-center'
                          : 'object-contain p-4'
                      }`}
                    />
                  </div>
                </Link>

                {/* Info */}
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-[10px] font-bold text-[#FF7B89] uppercase tracking-widest mb-1">
                    Smitha Purelife
                  </p>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-[#2D2A26] text-sm leading-snug mb-2 group-hover:text-[#1A4B21] transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, s) => (
                      <Star
                        key={s}
                        size={11}
                        className={s < Math.floor(cfg.rating) ? 'text-yellow-400' : 'text-gray-200'}
                        fill={s < Math.floor(cfg.rating) ? 'currentColor' : 'currentColor'}
                      />
                    ))}
                    <span className="text-[11px] font-semibold text-[#2D2A26] ml-1">{cfg.rating}</span>
                    <span className="text-[11px] text-[#2D2A26]/40">({cfg.reviews.toLocaleString()})</span>
                  </div>

                  {/* Price row */}
                  <div className="flex items-center gap-2 mt-auto mb-3">
                    <span className="font-bold text-base text-[#2D2A26]">{cfg.price}</span>
                    {cfg.discount && (
                      <span className="text-[11px] font-semibold text-[#FF7B89] bg-[#FFE5E5] px-2 py-0.5 rounded-full">
                        {cfg.discount}
                      </span>
                    )}
                  </div>

                  {/* Add to Bag button */}
                  <button className="w-full flex items-center justify-center gap-2 bg-white border-2 border-[#2D2A26] text-[#2D2A26] py-2.5 rounded-xl text-sm font-bold hover:bg-[#1A4B21] hover:border-[#1A4B21] hover:text-white transition-all duration-300 group/btn">
                    <ShoppingBag size={14} className="group-hover/btn:scale-110 transition-transform" />
                    Add to Bag
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
