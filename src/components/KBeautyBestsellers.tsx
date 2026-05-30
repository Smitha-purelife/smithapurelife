import { products, comboProducts, Combo } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, Search, SlidersHorizontal, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ─── Per-product card config ────────────────────────────────────────────────
const cardConfig: Record<string, {
  shopImage: string;
  objectFit: 'cover' | 'contain';
  bgColor: string;
  price: string;
  badge: string;
  badgeColor: string;
}> = {
  'avosilk-bloom': {
    shopImage: '/products/avosilk_bloom_new.jpg',
    objectFit: 'cover',
    bgColor: '#EEF7EE',
    price: '₹1,200',
    badge: 'Bestseller',
    badgeColor: '#2D7A3A',
  },
  'radiance-oil': {
    shopImage: '/products/radiance_oil_new.png',
    objectFit: 'cover',
    bgColor: '#FFF8E6',
    price: '₹1,450',
    badge: 'Trending',
    badgeColor: '#B8860B',
  },
  'herbal-wash': {
    shopImage: '/products/hair_wash_powder_new.jpg',
    objectFit: 'cover',
    bgColor: '#EEF4EE',
    price: '₹999',
    badge: 'Viral',
    badgeColor: '#4A7C59',
  },
  'pro-repair-serum': {
    shopImage: '/products/pro_repair_serum_new.png',
    objectFit: 'cover',
    bgColor: '#FDF0F5',
    price: '₹1,150',
    badge: 'Must Have',
    badgeColor: '#8B5E8B',
  },
  'follicra-regrowth': {
    shopImage: '/products/follicra_proper.jpg',
    objectFit: 'cover',
    bgColor: '#FAF6F0',
    price: '₹1,800',
    badge: 'New',
    badgeColor: '#2D6A8B',
  },
  'satin-pillowcase': {
    shopImage: '/products/satin_pillowcase_proper.jpg',
    objectFit: 'cover',
    bgColor: '#FAF3EE',
    price: '₹799',
    badge: 'Silk Slumber',
    badgeColor: '#E5C2C0',
  },
  'satin-scrunchies': {
    shopImage: '/products/satin_scrunchies_proper.jpg',
    objectFit: 'cover',
    bgColor: '#FAF9F5',
    price: '₹299',
    badge: 'Anti-Crease',
    badgeColor: '#DCD0C0',
  },
};

// ─── Self-contained Premium Combo Card Component (Horizontal Split Screen) ─────────────────────────────
function ComboCard({ combo, index }: { combo: Combo; index: number }) {
  const [activeTab, setActiveTab] = useState<'included' | 'ritual'>('included');

  // Trigger add combo to bag
  const handleAddComboToBag = () => {
    try {
      const existing = localStorage.getItem('smitha_purelife_cart');
      let cart = existing ? JSON.parse(existing) : [];

      combo.includedProducts.forEach(prodId => {
        const prod = products.find(p => p.id === prodId);
        if (prod) {
          const sizeObj = prod.sizes[0];
          const cartId = `${prod.id}-${sizeObj.size}`;
          const existingIndex = cart.findIndex((item: any) => item.cartId === cartId);
          if (existingIndex > -1) {
            cart[existingIndex].quantity += 1;
          } else {
            cart.push({
              cartId,
              productId: prod.id,
              size: sizeObj.size,
              price: sizeObj.price,
              quantity: 1
            });
          }
        }
      });

      localStorage.setItem('smitha_purelife_cart', JSON.stringify(cart));
      localStorage.setItem('smitha_purelife_cart_auto_open', 'true');
      window.dispatchEvent(new Event('cart-updated'));
    } catch (e) {
      console.error("Combo cart addition failed:", e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="bg-white rounded-[2.5rem] border border-[#2D2A26]/5 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row overflow-hidden group h-full"
    >
      {/* Left Pedestal Column */}
      <div 
        className="w-full md:w-[42%] aspect-[4/3] md:aspect-auto min-h-[240px] flex flex-col justify-between p-6 relative border-b md:border-b-0 md:border-r border-[#2D2A26]/5 overflow-hidden flex-shrink-0"
        style={{ backgroundColor: combo.bg }}
      >
        {/* Ambient colored glow */}
        <div 
          className="absolute w-40 h-40 rounded-full blur-3xl opacity-25 group-hover:scale-125 transition-transform duration-700 pointer-events-none -top-10 -left-10"
          style={{ backgroundColor: combo.accent }}
        />

        {/* Top Badges */}
        <div className="flex justify-between items-center z-10 w-full relative">
          <span className="text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/90 border border-black/5 text-[#2D2A26]">
            {combo.badge}
          </span>
          <span 
            className="text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full text-white shadow-xs"
            style={{ backgroundColor: combo.accent }}
          >
            Save ₹{combo.savings}
          </span>
        </div>

        {/* Floating animated stack in the center */}
        <div className="flex items-center justify-center gap-1.5 my-8 z-10 relative">
          {combo.includedProducts.map((prodId, idx) => {
            const prod = products.find(p => p.id === prodId);
            if (!prod) return null;

            return (
              <motion.div
                key={prodId}
                animate={{ 
                  y: [0, -3, 0],
                  rotate: idx % 2 === 0 ? -1.5 : 1.5
                }}
                transition={{ 
                  duration: 4.5 + idx, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                whileHover={{ 
                  y: -14,
                  scale: 1.1,
                  z: 50
                }}
                className="w-12 sm:w-16 aspect-[3/4] rounded-xl overflow-hidden border border-white/80 shadow-md bg-white p-1.5 relative flex items-center justify-center -ml-3.5 first:ml-0 transition-all duration-300"
                style={{ zIndex: 10 + idx }}
              >
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-[90%] h-[90%] object-contain mix-blend-multiply"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom checklist label */}
        <div className="text-left z-10 mt-auto relative">
          <span className="text-[8px] font-bold tracking-[0.2em] text-[#2D2A26]/40 uppercase block">Includes {combo.includedProducts.length} Clean Formulas</span>
        </div>
      </div>

      {/* Right Content Column */}
      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between text-left">
        <div>
          <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-[#1A4B21] block mb-1">
            {combo.subtitle}
          </span>
          <h3 className="font-serif text-2xl text-[#2D2A26] font-bold leading-tight group-hover:text-[#1A4B21] transition-colors mb-3">
            {combo.title}
          </h3>
          <p className="text-xs text-[#2D2A26]/70 leading-relaxed mb-6">
            {combo.description}
          </p>

          {/* Sliding tab switcher */}
          <div className="flex border-b border-[#2D2A26]/5 mb-4 relative">
            <button
              onClick={() => setActiveTab('included')}
              className={`flex-1 pb-2 text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 relative ${
                activeTab === 'included' ? 'text-[#1A4B21]' : 'text-gray-400 hover:text-[#2D2A26]'
              }`}
            >
              Included Items
              {activeTab === 'included' && (
                <motion.div layoutId={`${combo.id}-tab`} className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A4B21]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('ritual')}
              className={`flex-1 pb-2 text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 relative ${
                activeTab === 'ritual' ? 'text-[#1A4B21]' : 'text-gray-400 hover:text-[#2D2A26]'
              }`}
            >
              Ritual Routine
              {activeTab === 'ritual' && (
                <motion.div layoutId={`${combo.id}-tab`} className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A4B21]" />
              )}
            </button>
          </div>

          {/* Tabs panel content */}
          <div className="min-h-[120px] mb-5">
            {activeTab === 'included' ? (
              <div className="grid grid-cols-1 gap-2">
                {combo.includedProducts.map((prodId) => {
                  const prod = products.find(p => p.id === prodId);
                  if (!prod) return null;

                  return (
                    <div key={prodId} className="flex items-center gap-2.5 bg-[#FAF9F5] rounded-xl p-2.5 border border-[#2D2A26]/5 transition-colors hover:bg-neutral-50">
                      <div className="w-8 h-8 rounded-lg bg-white overflow-hidden flex items-center justify-center p-1 border border-[#2D2A26]/5 flex-shrink-0">
                        <img src={prod.image} alt={prod.title} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <h4 className="font-bold text-[11px] sm:text-xs text-[#2D2A26] truncate">{prod.title}</h4>
                        <p className="text-[9px] text-gray-400 uppercase tracking-widest">{prod.sizes[0].size} • {prod.benefits[0]}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-2.5 text-left text-[11px] sm:text-xs text-[#2D2A26]/80 p-1">
                {combo.includedProducts.map((prodId, sIdx) => {
                  const prod = products.find(p => p.id === prodId);
                  if (!prod) return null;
                  return (
                    <div key={prodId} className="flex gap-2.5 items-start">
                      <span className="w-4 h-4 rounded-full bg-[#1A4B21]/10 text-[#1A4B21] font-bold text-[9px] flex items-center justify-center mt-0.5 shrink-0">
                        {sIdx + 1}
                      </span>
                      <p className="leading-normal">
                        <span className="font-bold text-[#2D2A26]">{prod.title}</span>: {prod.description.split('.')[0]}.
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Pricing tag & CTA Checkout */}
        <div className="flex items-center justify-between border-t border-[#2D2A26]/5 pt-4 mt-auto">
          <div className="text-left">
            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block">Special Bundle Price</span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-xl text-[#2D2A26]" style={{ fontFamily: "'Inter', sans-serif" }}>
                ₹{combo.comboPrice.toLocaleString()}
              </span>
              <span className="text-[10px] line-through text-gray-400">
                ₹{combo.originalTotal.toLocaleString()}
              </span>
            </div>
          </div>

          <button 
            onClick={handleAddComboToBag}
            className="flex items-center gap-1.5 bg-[#1A4B21] text-white px-5 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-[#0f2e14] transition-all shadow-xs active:scale-95 shrink-0"
          >
            Add Bundle <ShoppingBag size={11} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function KBeautyBestsellers() {
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'haircare' | 'accessories' | 'combos'>('all');
  const [selectedConcern, setSelectedConcern] = useState<string>('all');

  // Synchronize category bubble scrolls & localStorage events
  useEffect(() => {
    const checkCategoryFilter = () => {
      const stored = localStorage.getItem('smitha_selected_category');
      if (stored === 'haircare' || stored === 'accessories' || stored === 'combos') {
        setSelectedCategory(stored as any);
        localStorage.removeItem('smitha_selected_category');
      }
    };
    
    checkCategoryFilter();
    window.addEventListener('category-filter-updated', checkCategoryFilter);
    return () => window.removeEventListener('category-filter-updated', checkCategoryFilter);
  }, []);

  // Filter Catalog dynamically
  const filteredProducts = selectedCategory === 'combos'
    ? comboProducts.filter(combo => {
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase();
          const matchTitle = combo.title.toLowerCase().includes(query);
          const matchSubtitle = combo.subtitle.toLowerCase().includes(query);
          const matchDesc = combo.description.toLowerCase().includes(query);
          return matchTitle || matchSubtitle || matchDesc;
        }
        return true;
      })
    : products.filter(product => {
        // 1. Category Filter
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }
        
        // 2. Concern Filter
        if (selectedConcern !== 'all') {
          const concernMapping: Record<string, string[]> = {
            'dry-frizzy': ['avosilk-bloom', 'pro-repair-serum'],
            'hair-fall': ['radiance-oil', 'herbal-wash', 'avosilk-bloom', 'follicra-regrowth'],
            'growth-thickness': ['radiance-oil', 'follicra-regrowth', 'herbal-wash'],
            'dandruff-scalp': ['herbal-wash', 'radiance-oil'],
            'damaged-repair': ['avosilk-bloom', 'pro-repair-serum', 'radiance-oil'],
            'early-baldness': ['follicra-regrowth', 'radiance-oil'],
            'maintenance': ['radiance-oil', 'herbal-wash', 'avosilk-bloom', 'pro-repair-serum', 'follicra-regrowth']
          };
          const allowedProducts = concernMapping[selectedConcern] || [];
          if (!allowedProducts.includes(product.id)) {
            return false;
          }
        }
        
        // 3. Name, subtitle, description, or benefit tags search
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase();
          const matchTitle = product.title.toLowerCase().includes(query);
          const matchSubtitle = product.subtitle.toLowerCase().includes(query);
          const matchDesc = product.description.toLowerCase().includes(query);
          const matchBenefits = product.benefits.some(b => b.toLowerCase().includes(query));
          return matchTitle || matchSubtitle || matchDesc || matchBenefits;
        }
        
        return true;
      });

  const visibleProducts = showAll ? filteredProducts : filteredProducts.slice(0, 4);

  return (
    <section id="trending" className="py-20 bg-[#F5F7F5] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* ─── Header Section ─── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase font-bold text-[#1A4B21] mb-2 text-left">
              Community Favourites
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#2D2A26] text-left">
              Trending Now
            </h2>
          </div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-bold text-[#1A4B21] border-2 border-[#1A4B21] px-6 py-2.5 rounded-full hover:bg-[#1A4B21] hover:text-white transition-all duration-300"
          >
            {showAll ? 'View Less' : 'View All Products'}
          </button>
        </div>

        {/* ─── Premium Search & Filter Panel ─── */}
        <div className="bg-white rounded-[2rem] p-6 mb-10 border border-[#2D2A26]/5 shadow-xs flex flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search products, key benefits, or results..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#F5F7F5] border border-black/5 rounded-full text-xs font-medium text-[#2D2A26] focus:outline-none focus:border-[#1A4B21]/40 focus:ring-1 focus:ring-[#1A4B21]/10 placeholder:text-gray-400"
              />
            </div>

            {/* Category Filter Buttons */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 w-full">
              {[
                { id: 'all', label: 'All' },
                { id: 'haircare', label: 'Haircare' },
                { id: 'accessories', label: 'Essentials' },
                { id: 'combos', label: 'Combos' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`py-3 px-2 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#1A4B21] text-white border-[#1A4B21] flex-1'
                      : 'bg-transparent text-[#2D2A26] border-black/10 hover:bg-[#F5F7F5] flex-1'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Concern Filter Dropdown */}
            <div className="relative flex items-center bg-[#F5F7F5] border border-black/5 rounded-full px-4 py-3">
              <SlidersHorizontal className="text-gray-400 mr-3 shrink-0" size={16} />
              <select
                value={selectedConcern}
                onChange={(e) => setSelectedConcern(e.target.value)}
                className="w-full bg-transparent text-xs font-bold uppercase tracking-wider text-[#2D2A26] focus:outline-none cursor-pointer pr-4 appearance-none"
              >
                <option value="all">All Concerns</option>
                <option value="dry-frizzy">Dry & Frizzy Hair</option>
                <option value="hair-fall">Excessive Hair Fall</option>
                <option value="growth-thickness">Hair Growth & Thickness</option>
                <option value="dandruff-scalp">Dandruff & Scalp Care</option>
                <option value="damaged-repair">Damaged Hair Repair</option>
                <option value="early-baldness">Early Signs of Baldness</option>
                <option value="maintenance">Natural & Healthy Hair Maintenance</option>
              </select>
              <span className="absolute right-4 pointer-events-none text-gray-400 text-xs">▼</span>
            </div>

          </div>

          {/* Active Filters Display */}
          {(searchQuery || selectedCategory !== 'all' || selectedConcern !== 'all') && (
            <div className="flex items-center justify-between border-t border-[#2D2A26]/5 pt-4">
              <div className="flex flex-wrap gap-2 items-center text-left">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-1">Active Filters:</span>
                
                {selectedCategory !== 'all' && (
                  <span className="bg-[#1A4B21]/5 text-[#1A4B21] border border-[#1A4B21]/15 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    Category: {selectedCategory === 'accessories' ? 'Essentials' : selectedCategory}
                    <button onClick={() => setSelectedCategory('all')} className="hover:text-red-500 font-bold ml-0.5">×</button>
                  </span>
                )}

                {selectedConcern !== 'all' && (
                  <span className="bg-[#1A4B21]/5 text-[#1A4B21] border border-[#1A4B21]/15 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    Concern: {selectedConcern.replace('-', ' ')}
                    <button onClick={() => setSelectedConcern('all')} className="hover:text-red-500 font-bold ml-0.5">×</button>
                  </span>
                )}

                {searchQuery && (
                  <span className="bg-[#1A4B21]/5 text-[#1A4B21] border border-[#1A4B21]/15 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="hover:text-red-500 font-bold ml-0.5">×</button>
                  </span>
                )}

                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedConcern('all');
                  }}
                  className="text-[9px] font-bold text-gray-400 uppercase tracking-wider hover:text-red-500 underline ml-2 transition-colors"
                >
                  Clear All
                </button>
              </div>

              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                {filteredProducts.length} Results Found
              </span>
            </div>
          )}
        </div>

        {/* ─── Redesigned Product Grid (100% Unobscured Images) ─── */}
        {visibleProducts.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-[2rem] border border-[#2D2A26]/5 shadow-xs">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-2">No matching formulas</p>
            <p className="text-[#2D2A26]/60 text-sm max-w-sm mx-auto">Try clearing your filters or searches to discover our premium clean botanical catalog.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {visibleProducts.map((product, i) => {
                const isCombo = 'comboPrice' in product;
                const cfg = isCombo
                  ? {
                      shopImage: (product as any).image,
                      objectFit: 'cover' as const,
                      bgColor: (product as any).bg,
                      price: `₹${(product as any).comboPrice}`,
                      badge: (product as any).badge || 'Bundle',
                      badgeColor: (product as any).accent || '#FF7B89',
                    }
                  : (cardConfig[product.id] ?? {
                      shopImage: product.image,
                      objectFit: 'contain' as const,
                      bgColor: product.bg,
                      price: '₹999',
                      badge: '',
                      badgeColor: '#666',
                    });

                const pills = isCombo
                  ? (product as any).includedProducts.map((pId: string) => {
                      const p = products.find(prod => prod.id === pId);
                      return p ? p.title : pId;
                    })
                  : product.benefits;

                const handleBuyClick = (e: React.MouseEvent) => {
                  if (isCombo) {
                    e.preventDefault();
                    try {
                      const existing = localStorage.getItem('smitha_purelife_cart');
                      let cart = existing ? JSON.parse(existing) : [];
                      (product as any).includedProducts.forEach((prodId: string) => {
                        const prod = products.find(p => p.id === prodId);
                        if (prod) {
                          const defaultSize = prod.sizes[0];
                          const cartId = `${prod.id}-${defaultSize.size}`;
                          const existingIndex = cart.findIndex((item: any) => item.cartId === cartId);
                          if (existingIndex > -1) {
                            cart[existingIndex].quantity += 1;
                          } else {
                            cart.push({
                              cartId,
                              productId: prod.id,
                              size: defaultSize.size,
                              price: defaultSize.price,
                              quantity: 1
                            });
                          }
                        }
                      });
                      localStorage.setItem('smitha_purelife_cart', JSON.stringify(cart));
                      localStorage.setItem('smitha_purelife_cart_auto_open', 'true');
                      window.dispatchEvent(new Event('cart-updated'));
                    } catch (err) {
                      console.error("Grid combo add failed:", err);
                    }
                  }
                };

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex flex-col rounded-[2.5rem] overflow-hidden border border-[#2D2A26]/5 bg-white shadow-xs hover:shadow-xl transition-all duration-500 h-full"
                  >
                    {/* Top Image Box (Fully visible and un-obscured) */}
                    <div 
                      className="relative w-full aspect-square overflow-hidden flex items-center justify-center p-6 border-b border-[#2D2A26]/5 flex-shrink-0"
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

                      {isCombo ? (
                        <a href="#combos" className="block w-full h-full">
                          <img
                            src={cfg.shopImage}
                            alt={product.title}
                            className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${cfg.objectFit === 'cover' ? 'object-cover' : 'object-contain'}`}
                          />
                        </a>
                      ) : (
                        <Link to={`/product/${product.id}`} className="block w-full h-full">
                          <img
                            src={cfg.shopImage}
                            alt={product.title}
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = product.image;
                              (e.currentTarget as HTMLImageElement).style.objectFit = 'contain';
                              (e.currentTarget as HTMLImageElement).style.padding = '24px';
                            }}
                            className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${cfg.objectFit === 'cover' ? 'object-cover' : 'object-contain'}`}
                          />
                        </Link>
                      )}
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
                          {isCombo ? (
                            <a href="#combos" className="block flex-1 min-w-0 text-left">
                              <h3 className="font-serif text-lg md:text-xl text-[#2D2A26] leading-snug group-hover:text-[#1A4B21] transition-colors truncate font-bold">
                                {product.title}
                              </h3>
                            </a>
                          ) : (
                            <Link to={`/product/${product.id}`} className="block flex-1 min-w-0 text-left">
                              <h3 className="font-serif text-lg md:text-xl text-[#2D2A26] leading-snug group-hover:text-[#1A4B21] transition-colors truncate font-bold">
                                {product.title}
                              </h3>
                            </Link>
                          )}
                          <span className="font-bold text-lg md:text-xl text-[#2D2A26] shrink-0" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {cfg.price}
                          </span>
                        </div>

                        {/* Benefits / Included items pills */}
                        <div className="flex flex-wrap gap-1.5 mb-5 text-left">
                          {pills.slice(0, 2).map((b: string, idx: number) => (
                            <span key={idx} className="bg-[#EEF7EE] text-[#1A4B21] px-2.5 py-0.5 rounded-full text-[9px] font-bold whitespace-nowrap uppercase tracking-wider">
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Buy Button */}
                      {isCombo ? (
                        <button 
                          onClick={handleBuyClick}
                          className="w-full flex items-center justify-center gap-2 bg-[#1A4B21] text-white py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#0f2e14] transition-all shadow-xs active:scale-95 cursor-pointer"
                        >
                          Add Bundle <ShoppingBag size={12} />
                        </button>
                      ) : (
                        <Link to={`/product/${product.id}`} className="block w-full">
                          <button className="w-full flex items-center justify-center gap-2 bg-[#1A4B21] text-white py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#0f2e14] transition-all shadow-xs active:scale-95">
                            Shop Now <ArrowRight size={12} />
                          </button>
                        </Link>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* ─── Combo Offers Section (Bundle & Save Redesign) ─── */}
        <div id="combos" className="mt-24 border-t border-[#2D2A26]/5 pt-20 scroll-mt-24">
          <div className="flex justify-between items-end mb-12">
            <div className="text-left">
              <p className="text-xs tracking-[0.3em] uppercase font-bold text-[#FF7B89] mb-2">
                Curated Bundles
              </p>
              <h2 className="text-3xl md:text-4xl font-serif text-[#2D2A26]">
                Bundle & Save
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {comboProducts.map((combo, idx) => (
              <ComboCard key={combo.id} combo={combo} index={idx} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
