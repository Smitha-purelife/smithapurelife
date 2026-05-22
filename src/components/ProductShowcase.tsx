import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Droplets, Sparkles, ShieldCheck } from 'lucide-react';
import { products } from '../data/products';

// ─── Per-product config ──────────────────────────────────────────────────
// Swap `shopImage` to your own custom product photo anytime.
// `lifestyleThumb` is the small lifestyle image shown on hover.
const shopConfig: Record<string, {
  price: string;
  badge: string;
  badgeColor: string;
  shopImage: string;       // ← replace with your custom image path
  lifestyleThumb: string;  // ← replace with your lifestyle shot path
  tag: string;
  icon: JSX.Element;
}> = {
  'avosilk-bloom': {
    price: '₹1,200',
    badge: 'Bestseller',
    badgeColor: '#2D7A3A',
    shopImage: '/products/avosilk_bloom.png',
    lifestyleThumb: '/products/media__1779346601889.png',
    tag: 'Deep Conditioning',
    icon: <Leaf size={13} />,
  },
  'radiance-oil': {
    price: '₹1,450',
    badge: 'Trending',
    badgeColor: '#B8860B',
    shopImage: '/products/herbal_radiance_hair_oil.png',
    lifestyleThumb: '/products/media__1779346610043.png',
    tag: '35 Potent Herbs',
    icon: <Sparkles size={13} />,
  },
  'herbal-wash': {
    price: '₹999',
    badge: 'Natural',
    badgeColor: '#4A7C59',
    shopImage: '/products/hair_wash_powder_v2.png',
    lifestyleThumb: '/products/media__1779346616301.jpg',
    tag: 'Sulphate Free',
    icon: <Droplets size={13} />,
  },
  'pro-repair-serum': {
    price: '₹1,150',
    badge: 'Must Have',
    badgeColor: '#8B5E8B',
    shopImage: '/products/silk_gloss_pro_repair_serum.png',
    lifestyleThumb: '/products/pro_repair_serum_hero_v2_png_1778593726696.png',
    tag: 'Instant Gloss',
    icon: <ShieldCheck size={13} />,
  },
  'follicra-regrowth': {
    price: '₹1,800',
    badge: 'New',
    badgeColor: '#2D6A8B',
    shopImage: '/products/hexagen-image (1).png',
    lifestyleThumb: '/products/follicra_regrowth_hero_v2_png_1778593748343.png',
    tag: 'Regrowth Therapy',
    icon: <Leaf size={13} />,
  },
};

// ─── Small product card (right column) ─────────────────────────────────
function SmallCard({ product, index }: { product: typeof products[0]; index: number }) {
  const cfg = shopConfig[product.id];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="flex gap-4 items-center bg-white rounded-2xl p-3 shadow-sm hover:shadow-lg transition-all duration-400 border border-[#E8E4DE]">
          {/* Product image */}
          <div
            className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden"
            style={{ backgroundColor: product.bg }}
          >
            <img
              src={cfg.shopImage}
              alt={product.title}
              className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
            />
            {/* Hover lifestyle overlay */}
            <img
              src={cfg.lifestyleThumb}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: cfg.badgeColor }}
              >
                {cfg.badge}
              </span>
            </div>
            <h3 className="font-semibold text-[#2D2A26] text-sm leading-tight truncate">{product.title}</h3>
            <p className="text-[#2D2A26]/50 text-xs mt-0.5 flex items-center gap-1">
              {cfg.icon}{cfg.tag}
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="font-bold text-[#2D2A26] text-sm">{cfg.price}</span>
              <span className="text-[#2D7A3A] text-xs font-medium group-hover:underline flex items-center gap-0.5">
                Shop <ArrowRight size={10} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Featured hero card (left) ─────────────────────────────────────────
function HeroCard({ product }: { product: typeof products[0] }) {
  const cfg = shopConfig[product.id];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link to={`/product/${product.id}`} className="group block h-full">
        <div
          className="relative h-full min-h-[520px] rounded-3xl overflow-hidden flex flex-col justify-end"
          style={{ backgroundColor: product.bg }}
        >
          {/* Background lifestyle image */}
          <img
            src={cfg.lifestyleThumb}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-60 transition-opacity duration-700"
          />

          {/* Product image – centred */}
          <div className="absolute inset-0 flex items-center justify-center pt-16">
            <motion.img
              src={cfg.shopImage}
              alt={product.title}
              className="h-[65%] w-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>

          {/* Badge */}
          <div className="absolute top-5 left-5">
            <span
              className="text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full text-white shadow-md"
              style={{ backgroundColor: cfg.badgeColor }}
            >
              {cfg.badge}
            </span>
          </div>

          {/* Bottom info panel */}
          <div className="relative z-10 bg-white/90 backdrop-blur-md m-4 rounded-2xl p-5 shadow-sm border border-white/60 group-hover:bg-white transition-colors duration-300">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] text-[#2D2A26]/40 uppercase tracking-widest font-semibold mb-1">
                  {product.subtitle}
                </p>
                <h3 className="text-xl font-serif font-semibold text-[#2D2A26] leading-tight">
                  {product.title}
                </h3>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {product.benefits.slice(0, 2).map(b => (
                    <span key={b} className="text-[10px] px-2 py-0.5 bg-[#F0F7F0] text-[#2D7A3A] rounded-full font-medium">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-2xl font-bold text-[#2D2A26]">{cfg.price}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 bg-[#1A4B21] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full group-hover:bg-[#0f2e14] transition-colors">
                  Shop Now <ArrowRight size={12} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Main section ───────────────────────────────────────────────────────
export default function ProductShowcase() {
  const sectionRef = useRef(null);
  const titleInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // First product is the featured hero; rest go in the small grid
  const [featured, ...rest] = products;

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

        {/* Grid: Featured hero (left) + 4 small cards (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Left — featured hero card */}
          <HeroCard product={featured} />

          {/* Right — 2×2 small cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
            {rest.map((product, i) => (
              <SmallCard key={product.id} product={product} index={i} />
            ))}

            {/* Banner strip at bottom of grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="sm:col-span-2 bg-[#1A4B21] rounded-2xl px-6 py-5 flex items-center justify-between gap-4"
            >
              <div>
                <p className="text-white/60 text-[11px] uppercase tracking-widest font-semibold mb-1">
                  Free Delivery
                </p>
                <p className="text-white font-serif text-lg leading-snug">
                  On all orders above <span className="font-bold">₹799</span>
                </p>
              </div>
              <div className="flex items-center gap-4 text-white/80 text-xs font-medium">
                <span className="flex items-center gap-1.5"><ShieldCheck size={14} /> 100% Natural</span>
                <span className="flex items-center gap-1.5"><Leaf size={14} /> No Parabens</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
