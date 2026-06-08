import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Droplets, Sparkles, ShieldCheck, ShoppingBag } from 'lucide-react';
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
    shopImage: '/products/avosilk_bloom_new.jpg',
    objectFit: 'cover',
    bgColor: '#EEF7EE',
  },
  'radiance-oil': {
    price: '₹1,450',
    badge: 'Trending',
    badgeColor: '#B8860B',
    shopImage: '/products/radiance_oil_new.png',
    objectFit: 'cover',
    bgColor: '#FFF8E6',
  },
  'herbal-wash': {
    price: '₹999',
    badge: 'Natural',
    badgeColor: '#4A7C59',
    shopImage: '/products/hair_wash_powder_new.jpg',
    objectFit: 'cover',
    bgColor: '#EEF4EE',
  },
  'pro-repair-serum': {
    price: '₹1,150',
    badge: 'Must Have',
    badgeColor: '#8B5E8B',
    shopImage: '/products/pro_repair_serum_new.png',
    objectFit: 'cover',
    bgColor: '#FDF0F5',
  },
  'follicra-regrowth': {
    price: '₹1,800',
    badge: 'New',
    badgeColor: '#2D6A8B',
    shopImage: '/products/follicra_proper.jpg',
    objectFit: 'cover',
    bgColor: '#FAF6F0',
  },
  'satin-pillowcase': {
    price: '₹799',
    badge: 'Silk Slumber',
    badgeColor: '#E5C2C0',
    shopImage: '/products/satin_pillowcase_proper.jpg',
    objectFit: 'cover',
    bgColor: '#FAF3EE',
  },
  'satin-scrunchies': {
    price: '₹299',
    badge: 'Anti-Crease',
    badgeColor: '#DCD0C0',
    shopImage: '/products/satin_scrunchies_proper.jpg',
    objectFit: 'cover',
    bgColor: '#FAF9F5',
  },
};

// ─── Main section ───────────────────────────────────────────────────────
export default function ProductShowcase() {
  const sectionRef = useRef(null);
  const titleInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const handleAddProductToBag = (productId: string) => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    const defaultSize = prod.sizes[0];
    const cartId = `${prod.id}-${defaultSize.size}`;
    const cartItem = {
      cartId,
      productId: prod.id,
      size: defaultSize.size,
      price: defaultSize.price,
      quantity: 1
    };

    try {
      const existing = localStorage.getItem('smitha_purelife_cart');
      let cart = existing ? JSON.parse(existing) : [];
      const existingIndex = cart.findIndex((item: any) => item.cartId === cartId);
      if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
      } else {
        cart.push(cartItem);
      }
      localStorage.setItem('smitha_purelife_cart', JSON.stringify(cart));
      localStorage.setItem('smitha_purelife_cart_auto_open', 'true');
      window.dispatchEvent(new Event('cart-updated'));
    } catch (e) {
      console.error("Cart addition failed:", e);
    }
  };

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                className="group flex flex-col rounded-[2.5rem] overflow-hidden border border-[#2D2A26]/5 bg-white shadow-xs hover:shadow-xl transition-all duration-500 h-full"
              >
                {/* Top Image Box */}
                <div 
                  className="relative w-full aspect-square overflow-hidden flex items-center justify-center p-0 border-b border-[#2D2A26]/5 flex-shrink-0"
                  style={{ backgroundColor: cfg.bgColor || product.bg }}
                >
                  {/* Badge overlay top left */}
                  {cfg.badge && (
                    <div
                      className="absolute top-4 left-4 z-10 text-white text-[9px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-xs"
                      style={{ backgroundColor: cfg.badgeColor }}
                    >
                      {cfg.badge}
                    </div>
                  )}

                  <Link to={`/product/${product.id}`} className="block w-full h-full">
                    <img
                      src={cfg.shopImage}
                      alt={product.title}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = product.image;
                        (e.currentTarget as HTMLImageElement).style.objectFit = 'contain';
                        (e.currentTarget as HTMLImageElement).style.padding = '24px';
                      }}
                      className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${cfg.objectFit === 'cover' ? 'object-cover p-0' : 'object-contain p-6'}`}
                    />
                  </Link>
                </div>

                {/* Bottom Metadata & Purchase details */}
                <div className="p-5 flex flex-col flex-grow justify-between bg-[#FAF9F5]/30">
                  <div>
                    {/* Subtitle */}
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 text-left">
                      {product.subtitle || 'Smitha Purelife'}
                    </p>
                    
                    {/* Title & Price */}
                    <div className="flex justify-between items-baseline gap-2 mb-3">
                      <Link to={`/product/${product.id}`} className="block flex-1 min-w-0 text-left">
                        <h3 className="font-serif text-lg md:text-xl text-[#2D2A26] leading-snug group-hover:text-[#1A4B21] transition-colors truncate font-bold">
                          {product.title}
                        </h3>
                      </Link>
                      <span className="font-bold text-lg md:text-xl text-[#2D2A26] shrink-0" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {cfg.price}
                      </span>
                    </div>

                    {/* Benefits / Included items pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5 text-left">
                      {product.benefits.slice(0, 2).map((b: string, idx: number) => (
                        <span key={idx} className="bg-[#EEF7EE] text-[#1A4B21] px-2.5 py-0.5 rounded-full text-[9px] font-bold whitespace-nowrap uppercase tracking-wider">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex gap-2 w-full">
                    <button 
                      onClick={() => handleAddProductToBag(product.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-[#1A4B21] text-white py-3 px-2 rounded-full text-[9px] font-bold uppercase tracking-wider hover:bg-[#0f2e14] transition-all shadow-xs active:scale-95 cursor-pointer"
                    >
                      Add to Cart <ShoppingBag size={11} />
                    </button>
                    <Link to={`/product/${product.id}`} className="w-[38%] shrink-0">
                      <button className="w-full flex items-center justify-center gap-1 bg-[#F5F2EE] border border-black/5 text-[#2D2A26] py-3 rounded-full text-[9px] font-bold uppercase tracking-wider hover:bg-[#FAF9F5] transition-all shadow-xs active:scale-95">
                        View <ArrowRight size={11} />
                      </button>
                    </Link>
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
