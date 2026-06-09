import { products, comboProducts, Combo, ComboVariant } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, Search, SlidersHorizontal, Check, Star } from 'lucide-react';
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
    objectFit: 'contain',
    bgColor: '#FAF9F5',
    price: '₹299',
    badge: 'Anti-Crease',
    badgeColor: '#DCD0C0',
  },
};

// ─── Self-contained Premium Combo Card Component (Horizontal Split Screen) ─────────────────────────────
function ComboCard({ combo, index }: { combo: Combo; index: number }) {
  const [activeTab, setActiveTab] = useState<'included' | 'ritual'>('included');
  const [selectedVariant, setSelectedVariant] = useState<ComboVariant>(combo.variants[0]);

  useEffect(() => {
    setSelectedVariant(combo.variants[0]);
  }, [combo]);

  // Trigger add combo to bag
  const handleAddComboToBag = () => {
    try {
      const existing = localStorage.getItem('smitha_purelife_cart');
      let cart = existing ? JSON.parse(existing) : [];

      const cartId = `${combo.id}-${selectedVariant.sizeName}`;
      const existingIndex = cart.findIndex((item: any) => item.cartId === cartId);
      if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
      } else {
        cart.push({
          cartId,
          productId: combo.id,
          size: selectedVariant.sizeName,
          price: selectedVariant.comboPrice,
          quantity: 1,
          isCombo: true
        });
      }

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
      className="bg-white rounded-3xl border border-[#2D2A26]/8 shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col sm:flex-row overflow-hidden group"
    >
      {/* ── Left: Fixed Image Panel ── */}
      <Link
        to={`/combo/${combo.id}`}
        className="relative w-full sm:w-[45%] flex-shrink-0 flex items-center justify-center p-0 sm:p-6 overflow-hidden cursor-pointer"
        style={{ backgroundColor: combo.bg }}
      >
        {/* Dynamic Blurred Background (Fills PC gaps seamlessly) */}
        <div className="absolute inset-0 z-0 hidden sm:block">
          <img
            src={combo.image}
            alt=""
            className="w-full h-full object-cover opacity-60 blur-2xl scale-125 saturate-150"
          />
        </div>

        {/* Foreground Full Image */}
        <img
          src={combo.image}
          alt={combo.title}
          className="relative z-10 w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.03] block"
        />
        {/* Gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />

        {/* Badge top-left */}
        <span className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[#2D2A26] shadow-sm">
          {selectedVariant.badge}
        </span>

        {/* Savings badge top-right */}
        {selectedVariant.savings > 0 && (
          <span
            className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full text-white shadow-sm backdrop-blur-sm"
            style={{ backgroundColor: combo.accent }}
          >
            Save ₹{selectedVariant.savings}
          </span>
        )}

        {/* Bottom label */}
        <span className="absolute bottom-3 left-3 text-[9px] font-bold tracking-[0.18em] text-white/80 uppercase drop-shadow">
          {combo.includedProducts.length} clean formulas
        </span>
      </Link>

      {/* ── Right: Content Panel ── */}
      <div className="flex-1 flex flex-col p-5 sm:p-6">

        {/* Header */}
        <div className="mb-3">
          <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-[#1A4B21] block mb-1">
            {selectedVariant.subtitle}
          </span>
          <h3 className="font-serif text-lg sm:text-xl text-[#2D2A26] font-bold leading-snug mb-1.5 hover:text-[#1A4B21] transition-colors">
            <Link to={`/combo/${combo.id}`}>
              {combo.title}
            </Link>
          </h3>
          <p className="text-[11px] text-[#2D2A26]/60 leading-relaxed line-clamp-2">
            {combo.description}
          </p>
        </div>

        {/* Variant Picker */}
        <div className="mb-3">
          <span className="text-[9px] uppercase tracking-wider font-bold text-[#2D2A26]/40 block mb-1.5">Select Variant</span>
          <div className="flex gap-2">
            {combo.variants.map((v) => (
              <button
                key={v.sizeName}
                onClick={() => setSelectedVariant(v)}
                className={`flex-1 py-2 px-3 rounded-xl border text-center text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedVariant.sizeName === v.sizeName
                    ? 'border-[#1A4B21] bg-[#1A4B21] text-white shadow-sm'
                    : 'border-black/10 bg-[#FAF9F5] hover:bg-[#F0EDE8] text-[#2D2A26]'
                }`}
              >
                {v.sizeName}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#2D2A26]/8 mb-3">
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

        {/* Tab Content */}
        <div className="overflow-y-auto mb-4" style={{ maxHeight: '180px' }}>
          {activeTab === 'included' ? (
            <div className="grid grid-cols-1 gap-1.5">
              {combo.includedProducts.map((prodId, idx) => {
                const prod = products.find(p => p.id === prodId);
                if (!prod) return null;
                const displaySize = selectedVariant.includedSizes[idx];
                return (
                  <div key={prodId} className="flex items-center gap-2 bg-[#FAF9F5] rounded-xl p-2 border border-[#2D2A26]/5">
                    <div className="w-7 h-7 rounded-lg bg-white overflow-hidden flex items-center justify-center p-0.5 border border-[#2D2A26]/5 flex-shrink-0">
                      <img src={prod.image} alt={prod.title} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[10px] text-[#2D2A26] truncate">{prod.title}</p>
                      <p className="text-[9px] text-gray-400 uppercase tracking-widest">{displaySize}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-2 text-[11px] text-[#2D2A26]/80">
              {combo.includedProducts.map((prodId, sIdx) => {
                const prod = products.find(p => p.id === prodId);
                if (!prod) return null;
                return (
                  <div key={prodId} className="flex gap-2 items-start">
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

        {/* Footer: Price + CTA */}
        <div className="flex items-center justify-between border-t border-[#2D2A26]/8 pt-3 mt-4 gap-3">
          <div>
            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block">Bundle Price</span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-lg text-[#2D2A26]" style={{ fontFamily: "'Inter', sans-serif" }}>
                ₹{selectedVariant.comboPrice.toLocaleString()}
              </span>
              {selectedVariant.originalTotal > selectedVariant.comboPrice && (
                <span className="text-[10px] line-through text-gray-400">
                  ₹{selectedVariant.originalTotal.toLocaleString()}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={handleAddComboToBag}
            className="flex items-center gap-1.5 bg-[#1A4B21] text-white px-5 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-[#0f2e14] transition-all shadow-sm active:scale-95 shrink-0"
          >
            Add Bundle <ShoppingBag size={11} />
          </button>
        </div>

      </div>
    </motion.div>
  );
}


export default function KBeautyBestsellers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'haircare' | 'accessories' | 'combos'>('all');
  const [selectedConcern, setSelectedConcern] = useState<string>('all');

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
          const matchSubtitle = combo.variants.some(v => v.subtitle.toLowerCase().includes(query));
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

  const visibleProducts = filteredProducts;

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {visibleProducts.map((product, i) => {
                const isCombo = 'variants' in product;
                const cfg = isCombo
                  ? {
                      shopImage: (product as any).image,
                      objectFit: 'cover' as const,
                      bgColor: (product as any).bg,
                      price: `₹${(product as any).variants[0].comboPrice}`,
                      badge: (product as any).variants[0].badge || 'Bundle',
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
                  : (product as any).benefits;

                const handleBuyClick = (e: React.MouseEvent) => {
                  if (isCombo) {
                    e.preventDefault();
                    try {
                      const existing = localStorage.getItem('smitha_purelife_cart');
                      let cart = existing ? JSON.parse(existing) : [];
                      const combo = product as any;
                      const variant = combo.variants[0];
                      const cartId = `${combo.id}-${variant.sizeName}`;
                      const existingIndex = cart.findIndex((item: any) => item.cartId === cartId);
                      if (existingIndex > -1) {
                        cart[existingIndex].quantity += 1;
                      } else {
                        cart.push({
                          cartId,
                          productId: combo.id,
                          size: variant.sizeName,
                          price: variant.comboPrice,
                          quantity: 1,
                          isCombo: true
                        });
                      }
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
                      className="relative w-full overflow-hidden flex flex-col items-center justify-center p-0 border-b border-[#2D2A26]/5 flex-shrink-0"
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
                        <a href="#combos" className="block w-full">
                          <img
                            src={cfg.shopImage}
                            alt={product.title}
                            className={`w-full h-auto block transition-transform duration-700 group-hover:scale-105 ${cfg.objectFit === 'cover' ? 'object-cover p-0' : 'object-contain p-0'}`}
                          />
                        </a>
                      ) : (
                        <Link to={`/product/${product.id}`} className="block w-full">
                          <img
                            src={cfg.shopImage}
                            alt={product.title}
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = product.image;
                              (e.currentTarget as HTMLImageElement).style.objectFit = 'contain';
                              (e.currentTarget as HTMLImageElement).style.padding = '0px';
                            }}
                            className={`w-full h-auto block transition-transform duration-700 group-hover:scale-105 ${cfg.objectFit === 'cover' ? 'object-cover p-0' : 'object-contain p-0'}`}
                          />
                        </Link>
                      )}
                    </div>

                    {/* Bottom Metadata & Purchase details */}
                    <div className="p-5 flex flex-col flex-grow justify-between bg-[#FAF9F5]/30">
                      <div>
                        {/* Subtitle */}
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 text-left">
                          {isCombo ? (product as any).variants[0].subtitle : (product as any).subtitle || 'Smitha Purelife'}
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
