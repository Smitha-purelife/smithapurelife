import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  ShoppingBag, 
  Check, 
  Info, 
  ShieldCheck, 
  Star, 
  Play, 
  Sparkles,
  X,
  Maximize2,
  Heart,
  ChevronDown,
  ChevronUp,
  Camera
} from 'lucide-react';
import { products, comboProducts, Combo, ComboVariant } from '../data/products';
import TransformationsGallery from './TransformationsGallery';
import ComparisonSection from './ComparisonSection';
import FAQSection from './FAQSection';
import Footer from './Footer';

export interface CustomerReview {
  id?: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  photos?: string[];
  verified?: boolean;
}

const comboDetailData: Record<string, {
  reviews: CustomerReview[];
}> = {
  'daily-3step': {
    reviews: [
      { name: 'Kavitha R.', rating: 5, text: 'This 3-step routine completely transformed my dull hair. My hair fall has drastically reduced!', date: '3 weeks ago' },
      { name: 'Sujith M.', rating: 5, text: 'Best bundle! High quality botanical wash combined with a very nourishing oil. Avosilk conditioner smells amazing.', date: '1 month ago' }
    ]
  },
  'complete-haircare': {
    reviews: [
      { name: 'Megha S.', rating: 5, text: 'Everything you need in one box. Serum is lightweight and works wonders on dry ends.', date: '2 weeks ago' },
      { name: 'Aparna K.', rating: 5, text: 'Visible difference in texture. My hair is much softer and has a natural shine.', date: '1 month ago' }
    ]
  },
  'smooth-silky': {
    reviews: [
      { name: 'Sneha P.', rating: 5, text: 'Perfect duo for frizzy hair. The combination of Avosilk conditioner and pro-repair serum works like magic.', date: '1 week ago' },
      { name: 'Deepika S.', rating: 5, text: 'My hair feels extremely silky. Non-sticky and light weight.', date: '2 months ago' }
    ]
  },
  'transformation': {
    reviews: [
      { name: 'Pooja G.', rating: 5, text: 'Ultimate care set! The satin pillowcase and scrunchies make a huge difference in reducing morning frizz and knots.', date: '3 weeks ago' },
      { name: 'Rohan V.', rating: 5, text: 'Follicra regrowth serum + radiance hair oil is the perfect stack. I see tiny baby hairs on my crown!', date: '1 month ago' }
    ]
  }
};

export default function ComboDetailPage() {
  const { id } = useParams<{ id: string }>();
  const comboIndex = comboProducts.findIndex((c) => c.id === id);
  const combo = comboProducts[comboIndex];

  // Like state logic
  const [isLiked, setIsLiked] = useState(false);
  const syncLikes = () => {
    try {
      const saved = localStorage.getItem('smitha_purelife_likes');
      if (saved) {
        const parsed = JSON.parse(saved);
        setIsLiked(parsed.includes(id || ''));
      }
    } catch {}
  };

  useEffect(() => {
    syncLikes();
    window.addEventListener('likes-updated', syncLikes);
    return () => window.removeEventListener('likes-updated', syncLikes);
  }, [id]);

  const toggleLike = () => {
    if (!id) return;
    try {
      const saved = localStorage.getItem('smitha_purelife_likes');
      let parsed = saved ? JSON.parse(saved) : [];
      if (parsed.includes(id)) {
        parsed = parsed.filter((item: string) => item !== id);
      } else {
        parsed.push(id);
      }
      localStorage.setItem('smitha_purelife_likes', JSON.stringify(parsed));
      window.dispatchEvent(new Event('likes-updated'));
    } catch {}
  };

  // Compute combo rating and reviews dynamically
  const staticReviews = (id ? comboDetailData[id]?.reviews : null) || [];
  const storageKey = `smitha_reviews_${id}`;
  const [customerReviews, setCustomerReviews] = useState<CustomerReview[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  // Re-sync reviews when id changes
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      setCustomerReviews(stored ? JSON.parse(stored) : []);
    } catch {
      setCustomerReviews([]);
    }
  }, [id, storageKey]);

  const allReviews = [
    ...customerReviews,
    ...staticReviews.map(r => ({ ...r, id: r.name + r.date, verified: true }))
  ];

  const avgRating = allReviews.length > 0
    ? parseFloat((allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1))
    : 5.0;

  const likesCount = (combo?.baseLikes || 100) + (isLiked ? 1 : 0);


  const [selectedVariant, setSelectedVariant] = useState<ComboVariant | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'included' | 'ritual'>('included');
  const [isAdded, setIsAdded] = useState(false);
  const [galleryLightbox, setGalleryLightbox] = useState<string | null>(null);
  const [showAllIngredients, setShowAllIngredients] = useState(false);

  // Re-initialize state when product ID changes
  useEffect(() => {
    if (combo) {
      setSelectedVariant(combo.variants[0]);
      setActiveImageIndex(0);
      setIsAdded(false);
      setShowAllIngredients(false);
      window.scrollTo(0, 0);
    }
  }, [id, combo]);

  if (!combo || !selectedVariant) {
    return <div className="h-screen flex items-center justify-center font-display text-2xl">Combo page not found</div>;
  }

  // Get gallery list (Package image + combo review/results image)
  const getComboGallery = (c: Combo): { src: string; label: string; isTransparent: boolean; fitMode?: 'cover' | 'contain' }[] => {
    const list: { src: string; label: string; isTransparent: boolean; fitMode?: 'cover' | 'contain' }[] = [
      { src: c.image, label: 'Bundle Package', isTransparent: false, fitMode: 'contain' },
    ];
    if (c.id === 'daily-3step') {
      list.push({ src: '/products/combo_daily_3step_benefits.png', label: 'Why This Combo', isTransparent: false, fitMode: 'contain' });
      list.push({ src: '/products/combo_daily_3step_review.jpg', label: 'Customer Results', isTransparent: false, fitMode: 'contain' });
    }
    if (c.id === 'complete-haircare') {
      list.push({ src: '/products/combo_complete_haircare_benefits.png', label: 'Why This Combo', isTransparent: false, fitMode: 'contain' });
      list.push({ src: '/products/combo_complete_haircare_review.jpg', label: 'Customer Results', isTransparent: false, fitMode: 'contain' });
    }
    if (c.id === 'smooth-silky') {
      list.push({ src: '/products/combo_smooth_silky_benefits.png', label: 'Why This Combo', isTransparent: false, fitMode: 'contain' });
      list.push({ src: '/products/combo_smooth_silky_review.jpg', label: 'Customer Results', isTransparent: false, fitMode: 'contain' });
    }
    if (c.id === 'transformation') {
      list.push({ src: '/products/combo_transformation_benefits.png', label: 'Why This Combo', isTransparent: false, fitMode: 'contain' });
      list.push({ src: '/products/combo_transformation_review.jpg', label: 'Customer Results', isTransparent: false, fitMode: 'contain' });
    }
    return list;
  };

  const gallery = getComboGallery(combo);

  // Find all unique ingredients from included products
  const comboIngredients: { name: string; effect: string }[] = [];
  const seenIngs = new Set<string>();
  combo.includedProducts.forEach((prodId) => {
    const prod = products.find((p) => p.id === prodId);
    if (prod && prod.ingredients) {
      prod.ingredients.forEach((ing) => {
        if (!seenIngs.has(ing.name.toLowerCase())) {
          seenIngs.add(ing.name.toLowerCase());
          comboIngredients.push(ing);
        }
      });
    }
  });

  const getComboBenefitsImage = (comboId: string): string => {
    if (comboId === 'daily-3step') return '/products/combo_daily_3step_benefits.png';
    if (comboId === 'complete-haircare') return '/products/combo_complete_haircare_benefits.png';
    if (comboId === 'smooth-silky') return '/products/combo_smooth_silky_benefits.png';
    if (comboId === 'transformation') return '/products/combo_transformation_benefits.png';
    return '';
  };

  const benefitsImage = getComboBenefitsImage(combo.id);

  const getComboBeforeAfter = (comboId: string): { before: string; after: string } => {
    if (comboId === 'daily-3step') {
      return { before: '/products/before_hair_fall.png', after: '/products/after_hair_fall.png' };
    }
    if (comboId === 'complete-haircare') {
      return { before: '/products/before_hair.png', after: '/products/after_hair.png' };
    }
    if (comboId === 'smooth-silky') {
      return { before: '/products/before_damaged_hair.png', after: '/products/after_repaired_hair.png' };
    }
    if (comboId === 'transformation') {
      return { before: '/products/before_hair_thinning.png', after: '/products/after_hair_regrowth.png' };
    }
    return { before: '/products/before_hair.png', after: '/products/after_hair.png' };
  };

  const { before: beforeImg, after: afterImg } = getComboBeforeAfter(combo.id);

  // Add Combo to Cart
  const handleAddToBag = () => {
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

      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (e) {
      console.error("Cart addition failed:", e);
    }
  };

  return (
    <div className="bg-[#CDD5AE] min-h-screen selection:bg-accent selection:text-bg overflow-x-hidden pt-[76px]">
      
      {/* Prev / Next navigation */}
      {comboIndex > 0 && (
        <Link 
          to={`/combo/${comboProducts[comboIndex - 1].id}`}
          className="fixed left-2 md:left-6 top-1/2 -translate-y-1/2 z-[90] w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/80 backdrop-blur shadow-sm border border-[#052B08]/5 flex items-center justify-center text-[#052B08] hover:bg-[#052B08] hover:text-white transition-all duration-300 group"
          aria-label="Previous Combo"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </Link>
      )}
      
      {comboIndex < comboProducts.length - 1 && (
        <Link 
          to={`/combo/${comboProducts[comboIndex + 1].id}`}
          className="fixed right-2 md:right-6 top-1/2 -translate-y-1/2 z-[90] w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/80 backdrop-blur shadow-sm border border-[#052B08]/5 flex items-center justify-center text-[#052B08] hover:bg-[#052B08] hover:text-white transition-all duration-300 group"
          aria-label="Next Combo"
        >
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      )}

      {/* Main product block */}
      <div className="py-20 max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Panel: Combo gallery stack */}
          <div className="w-full lg:w-1/2 flex flex-col-reverse sm:flex-row gap-4 items-start h-[50vh] sm:h-[60vh] lg:h-[80vh] relative min-h-[350px]">
            {/* Thumbnails */}
            <div className="flex flex-row sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto pr-1 select-none hide-scrollbar max-w-full sm:max-h-full scroll-smooth shrink-0 py-2 w-full sm:w-16 md:w-20">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 relative bg-white shadow-xs hover:scale-105 active:scale-95 shrink-0 ${
                    activeImageIndex === idx 
                      ? 'border-[#052B08] scale-102 ring-2 ring-[#052B08]/15' 
                      : 'border-[#052B08]/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={img.src} 
                    alt={img.label} 
                    className={`w-full h-full object-cover ${img.isTransparent ? 'mix-blend-multiply p-1.5' : ''}`}
                  />
                </button>
              ))}
            </div>

            {/* Main Interactive view */}
            <div 
              className={`flex-1 w-full h-full rounded-[2.5rem] relative flex items-center justify-center overflow-hidden transition-all duration-500 ${
                activeImageIndex === 0 
                  ? 'p-6 md:p-12' 
                  : 'p-0'
              }`}
              style={{ backgroundColor: activeImageIndex === 0 ? combo.bg : '#ffffff' }}
            >
              <img 
                src={gallery[activeImageIndex].src} 
                alt={gallery[activeImageIndex].label} 
                className={`z-10 transition-transform duration-700 hover:scale-[1.02] ${
                  activeImageIndex === 0
                    ? `w-[85%] h-[85%] object-contain drop-shadow-xl ${gallery[activeImageIndex].isTransparent ? 'mix-blend-multiply' : ''}`
                    : 'w-full h-full object-contain p-4 md:p-6 bg-white rounded-[2.5rem]'
                }`}
              />
              
              {/* Variant Badge */}
              <span className="absolute top-6 left-6 z-20 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[#052B08] shadow-xs">
                {selectedVariant.badge}
              </span>

              {/* Savings Badge */}
              {selectedVariant.savings > 0 && (
                <span className="absolute top-6 right-6 z-20 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full text-white shadow-xs bg-[#FF7B89] backdrop-blur-sm">
                  Save ₹{selectedVariant.savings}
                </span>
              )}

              {/* Maximize/Zoom button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setGalleryLightbox(gallery[activeImageIndex].src);
                }}
                className="absolute bottom-6 right-6 z-30 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#052B08] border border-[#052B08]/10 shadow-md transition-all flex items-center justify-center cursor-pointer active:scale-95"
                title="Zoom image"
              >
                <Maximize2 size={18} />
              </button>
            </div>
          </div>

          {/* Right Panel: Content details */}
          <div className="w-full lg:w-1/2 text-left flex flex-col justify-center">
            
            {/* Header info */}
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#FF7B89] block mb-2">{selectedVariant.subtitle}</span>
              <h1 className="font-serif text-4xl sm:text-5xl text-[#052B08] font-bold leading-tight mb-4">{combo.title}</h1>
              
              {/* Community Rating & Likes stats */}
              <div className="flex items-center justify-start gap-4 mb-6">
                <a 
                  href="#reviews"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-1 text-sm font-bold text-[#052B08]/80 hover:text-[#FF7B89] transition-colors"
                >
                  <span className="text-amber-500 text-lg">★</span>
                  <span>{avgRating}</span>
                  <span className="text-gray-400 font-normal">({allReviews.length} verified reviews)</span>
                </a>
                <span className="text-[#052B08]/20">|</span>
                <span className="flex items-center gap-1.5 text-sm font-bold text-[#052B08]/80">
                  <Heart size={16} className="text-rose-500 fill-rose-500" />
                  <span>{likesCount} community likes</span>
                </span>
              </div>
              
              <p className="text-sm text-[#052B08]/75 leading-relaxed font-medium mb-8 max-w-xl">{combo.description}</p>
            </div>

            {/* Variant selector */}
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#052B08]/50 block mb-3">Choose Combo Variant</span>
              <div className="flex gap-3 max-w-md">
                {combo.variants.map((v) => (
                  <button
                    key={v.sizeName}
                    onClick={() => setSelectedVariant(v)}
                    className={`flex-1 py-3 px-4 rounded-xl border text-center text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      selectedVariant.sizeName === v.sizeName
                        ? 'border-[#052B08] bg-[#052B08] text-white shadow-md'
                        : 'border-[#052B08]/15 bg-white hover:bg-[#FAF9F5] text-[#052B08]'
                    }`}
                  >
                    {v.sizeName}
                  </button>
                ))}
              </div>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-3xl font-bold text-[#052B08]">₹{selectedVariant.comboPrice}</span>
              {selectedVariant.originalTotal > selectedVariant.comboPrice && (
                <>
                  <span className="text-lg text-[#052B08]/40 line-through">₹{selectedVariant.originalTotal}</span>
                  <span className="bg-[#FAF2EE] text-[#FF7B89] text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    Saved ₹{selectedVariant.savings}
                  </span>
                </>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 items-center mb-8 max-w-md w-full">
              <button
                onClick={handleAddToBag}
                className="flex-1 py-4 bg-[#052B08] hover:bg-[#09420d] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isAdded ? (
                  <>
                    <Check size={16} />
                    Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    Add Combo to Bag
                  </>
                )}
              </button>
              
              {/* Like Button */}
              <button
                onClick={toggleLike}
                className="w-14 h-14 rounded-full border border-[#052B08]/10 bg-white shadow-md hover:shadow-lg flex items-center justify-center text-gray-400 cursor-pointer hover:border-rose-500/35 transition-colors group/heart-btn shrink-0"
              >
                <Heart 
                  size={20}
                  className={`transition-colors duration-300 ${isLiked ? 'fill-rose-500 text-rose-500 scale-110' : 'text-[#2D2A26]/50 group-hover/heart-btn:text-rose-500'}`}
                />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-[#052B08]/10 mb-6 max-w-xl">
              <button
                onClick={() => setActiveTab('included')}
                className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider transition-colors duration-300 relative cursor-pointer ${
                  activeTab === 'included' ? 'text-[#052B08]' : 'text-gray-400 hover:text-[#052B08]'
                }`}
              >
                Included Products ({combo.includedProducts.length})
                {activeTab === 'included' && (
                  <motion.div layoutId="combo-active-tab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#052B08]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('ritual')}
                className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider transition-colors duration-300 relative cursor-pointer ${
                  activeTab === 'ritual' ? 'text-[#052B08]' : 'text-gray-400 hover:text-[#052B08]'
                }`}
              >
                Routine Ritual
                {activeTab === 'ritual' && (
                  <motion.div layoutId="combo-active-tab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#052B08]" />
                )}
              </button>
            </div>

            {/* Tab details */}
            <div className="max-w-xl">
              <AnimatePresence mode="wait">
                {activeTab === 'included' ? (
                  <motion.div
                    key="included"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    {combo.includedProducts.map((prodId, idx) => {
                      const prod = products.find((p) => p.id === prodId);
                      if (!prod) return null;
                      const sizeSelected = selectedVariant.includedSizes[idx];
                      return (
                        <div key={prodId} className="flex items-center justify-between p-3 bg-white/70 rounded-2xl border border-[#052B08]/5 hover:border-[#052B08]/15 transition-all">
                          <Link to={`/product/${prod.id}`} className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="w-12 h-12 bg-[#FAF9F5] rounded-xl flex items-center justify-center p-1 border border-[#052B08]/5 shrink-0">
                              <img src={prod.image} alt={prod.title} className="w-full h-full object-contain mix-blend-multiply" />
                            </div>
                            <div className="text-left min-w-0">
                              <h4 className="font-serif text-sm font-bold text-[#052B08] leading-tight truncate">{prod.title}</h4>
                              <p className="text-[10px] text-[#052B08]/50 mt-0.5 truncate">{prod.subtitle}</p>
                            </div>
                          </Link>
                          <div className="flex items-center gap-4 pl-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md shrink-0">
                              {sizeSelected}
                            </span>
                            <Link 
                              to={`/product/${prod.id}`} 
                              className="text-[10px] font-bold uppercase tracking-widest text-[#FF7B89] hover:text-[#052B08] transition-colors whitespace-nowrap"
                            >
                              Details ›
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                ) : (
                  <motion.div
                    key="ritual"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {combo.includedProducts.map((prodId, sIdx) => {
                      const prod = products.find((p) => p.id === prodId);
                      if (!prod) return null;
                      return (
                        <div key={prodId} className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-[#052B08]/10 text-[#052B08] font-bold text-xs flex items-center justify-center shrink-0 border border-[#052B08]/5">
                            {sIdx + 1}
                          </div>
                          <div className="text-left">
                            <h4 className="font-bold text-xs uppercase tracking-wider text-[#052B08]">{prod.title}</h4>
                            <p className="text-[11px] text-[#052B08]/70 leading-relaxed mt-1">
                              Apply gently according to directions. Suitability tested for deep conditioning and root strength revival.
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sourcing strip */}
            <div className="mt-12 pt-8 border-t border-[#052B08]/10 flex flex-wrap gap-x-8 gap-y-4 text-[#052B08]/50 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#FF7B89]" />
                <span>100% Organic Extracts</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#FF7B89]" />
                <span>Veda Sourced Rituals</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Combo Ingredients Section */}
      <section id="ingredients" className="py-24 bg-white border-t border-[#052B08]/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#FF7B89] block mb-3">Sourced from Nature</span>
          <h2 className="serif-title text-4xl sm:text-5xl lg:text-6xl text-[#052B08] mb-8">Ingredients Sourced</h2>
          <p className="text-sm text-[#052B08]/60 max-w-2xl mx-auto mb-16 leading-relaxed">
            This combo is powered by premium, hand-picked traditional botanical extracts. Zero compromises on purity.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {(showAllIngredients ? comboIngredients : comboIngredients.slice(0, 4)).map((ing, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="p-6 bg-[#FAF9F5] hover:bg-white backdrop-blur-sm rounded-3xl shadow-xs hover:shadow-md border border-[#052B08]/5 transition-all duration-300 hover:-translate-y-1 text-left"
              >
                <Sparkles size={18} className="text-[#FF7B89] mb-4" />
                <h4 className="font-bold text-[#052B08] mb-1.5 text-lg leading-tight">{ing.name}</h4>
                <p className="text-xs text-[#052B08]/60 uppercase tracking-wider leading-relaxed">{ing.effect}</p>
              </motion.div>
            ))}
          </div>

          {comboIngredients.length > 4 && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setShowAllIngredients(!showAllIngredients)}
                className="px-8 py-3.5 rounded-full border border-[#052B08] text-[#052B08] hover:bg-[#052B08] hover:text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 shadow-xs hover:shadow-md cursor-pointer"
              >
                {showAllIngredients ? 'View Less' : `View More (+${comboIngredients.length - 4})`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Combo Benefits Infographic Section */}
      {benefitsImage && (
        <section className="py-24 bg-[#FAF9F5]/80 border-t border-[#052B08]/5 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 flex flex-col items-center">
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#FF7B89] block mb-3">Holistic Results</span>
            <h2 className="serif-title text-4xl sm:text-5xl lg:text-6xl text-[#052B08] mb-16 text-center">Benefits of this Combo</h2>
            <div className="w-full max-w-3xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#052B08]/5 bg-white p-3 relative group">
              <img 
                src={benefitsImage} 
                alt={`${combo.title} Benefits Infographic`} 
                className="w-full h-auto object-contain rounded-3xl"
                loading="lazy"
              />
              <button
                onClick={() => setGalleryLightbox(benefitsImage)}
                className="absolute bottom-8 right-8 p-3 rounded-full bg-[#052B08] hover:bg-[#09420d] text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 z-30"
                title="Zoom image"
              >
                <Maximize2 size={20} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Real Results before/after comparison slider */}
      <ComparisonSection 
        key={combo.id}
        beforeImage={beforeImg}
        afterImage={afterImg}
      />

      {/* Reviews Section */}
      <ComboReviewsSection comboId={combo.id} />

      {/* FAQs */}
      <FAQSection />

      {/* Footer */}
      <Footer />

      {/* Gallery Image Lightbox */}
      {galleryLightbox && (
        <div 
          onClick={() => setGalleryLightbox(null)}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[200] flex items-center justify-center p-4 cursor-zoom-out"
        >
          <button 
            onClick={() => setGalleryLightbox(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-[210]"
          >
            <X size={24} />
          </button>
          <img 
            src={galleryLightbox} 
            alt="Full size product view" 
            className="max-w-full max-h-[90vh] rounded-2xl object-contain shadow-2xl z-50" 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

function StarRatingInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1 justify-start">
      {[1,2,3,4,5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="text-2xl transition-transform hover:scale-110 active:scale-95 cursor-pointer"
          aria-label={`Rate ${star} stars`}
        >
          <Star
            size={28}
            className="transition-colors duration-150"
            fill={(hovered || value) >= star ? '#F8CD71' : 'none'}
            stroke={(hovered || value) >= star ? '#F8CD71' : '#D1D5DB'}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewPhotoGrid({ photos }: { photos: string[] }) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  if (!photos || photos.length === 0) return null;

  return (
    <>
      <div className="flex flex-wrap gap-2 mt-3.5">
        {photos.map((src, i) => (
          <div 
            key={i} 
            onClick={() => setLightbox(src)}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-black/5 hover:border-[#052B08]/30 shadow-2xs hover:shadow-sm cursor-zoom-in transition-all relative group flex-shrink-0"
          >
            <img src={src} alt={`Review photo ${i+1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <div 
            onClick={() => setLightbox(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[999999] flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button 
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-[1000000]"
            >
              <X size={24} />
            </button>
            <img 
              src={lightbox} 
              alt="Full size review photo" 
              className="max-w-full max-h-[90vh] rounded-2xl object-contain shadow-2xl z-50" 
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function ComboReviewsSection({ comboId }: { comboId: string }) {
  const staticReviews = comboDetailData[comboId]?.reviews || [];
  const storageKey = `smitha_reviews_${comboId}`;

  const [customerReviews, setCustomerReviews] = useState<CustomerReview[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(0);
  const [formText, setFormText] = useState('');
  const [formPhotos, setFormPhotos] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{rating?: string; text?: string}>({});
  const fileRef = useRef<HTMLInputElement>(null);

  // Sync reviews when comboId changes
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      setCustomerReviews(stored ? JSON.parse(stored) : []);
    } catch {
      setCustomerReviews([]);
    }
  }, [comboId, storageKey]);

  const allReviews = [
    ...customerReviews,
    ...staticReviews.map(r => ({ ...r, id: r.name + r.date, verified: true }))
  ];

  const avgRating = allReviews.length > 0
    ? parseFloat((allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1))
    : 5.0;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.slice(0, 3 - formPhotos.length).forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setFormPhotos(prev => [...prev, ev.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {rating?: string; text?: string} = {};
    if (formRating === 0) newErrors.rating = 'Please select a star rating.';
    if (formText.trim().length < 10) newErrors.text = 'Please write at least 10 characters.';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    const newReview: CustomerReview = {
      name: formName.trim() || 'Anonymous',
      rating: formRating,
      text: formText.trim(),
      date: 'Just now',
      photos: formPhotos,
      verified: false,
    };

    const updated = [newReview, ...customerReviews];
    setCustomerReviews(updated);
    try { 
      localStorage.setItem(storageKey, JSON.stringify(updated));
      window.dispatchEvent(new Event('reviews-updated'));
    } catch {}

    setFormName('');
    setFormRating(0);
    setFormText('');
    setFormPhotos([]);
    setErrors({});
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowForm(false); }, 3000);
  };

  return (
    <section id="reviews" className="py-16 md:py-24 bg-[#FAF9F5]/50 border-t border-[#052B08]/5 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="text-left">
            <span className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#052B08]/40 mb-2 block">Verified Feedback</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#052B08]">Customer Reviews</h2>
            {allReviews.length > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={14}
                      fill={avgRating >= s ? '#F8CD71' : 'none'}
                      stroke="#F8CD71" strokeWidth={1.5}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#052B08]">{avgRating}</span>
                <span className="text-xs text-gray-400">({allReviews.length} reviews)</span>
              </div>
            )}
          </div>
          <button
            onClick={() => setShowForm(v => !v)}
            className="flex items-center gap-2 bg-[#052B08] text-white px-5 sm:px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#1A4B21] transition-all shadow-sm active:scale-95 shrink-0 cursor-pointer"
          >
            Write a Review
            {showForm ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* Write a Review Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden mb-10 text-left"
            >
              <div className="bg-white rounded-[2rem] border border-[#052B08]/8 shadow-sm p-6 sm:p-8">
                {submitted ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-3 py-8 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#EEF7EE] flex items-center justify-center">
                      <Check size={24} className="text-[#2D7A3A]" />
                    </div>
                    <h3 className="font-serif text-xl text-[#052B08]">Thank you for your review!</h3>
                    <p className="text-sm text-gray-400">Your feedback helps other customers make better choices.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="font-serif text-xl sm:text-2xl text-[#052B08] font-bold mb-1">Share Your Experience</h3>
                    <p className="text-xs text-gray-400 -mt-4">Your honest review helps others make informed decisions.</p>

                    {/* Star Rating */}
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#052B08]/60 block mb-2">Your Rating *</label>
                      <StarRatingInput value={formRating} onChange={v => { setFormRating(v); setErrors(e => ({...e, rating: undefined})); }} />
                      {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
                    </div>

                    {/* Name */}
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#052B08]/60 block mb-2">Your Name (optional)</label>
                      <input
                        type="text"
                        value={formName}
                        onChange={e => setFormName(e.target.value)}
                        placeholder="e.g. Priya S."
                        maxLength={60}
                        className="w-full sm:w-72 px-4 py-3 bg-[#FAF9F5] border border-black/8 rounded-full text-sm text-[#052B08] focus:outline-none focus:border-[#052B08]/40 focus:ring-1 focus:ring-[#052B08]/10 placeholder:text-gray-400"
                      />
                    </div>

                    {/* Review Text */}
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#052B08]/60 block mb-2">Your Review *</label>
                      <textarea
                        value={formText}
                        onChange={e => { setFormText(e.target.value); setErrors(e2 => ({...e2, text: undefined})); }}
                        placeholder="Tell us what you love about this combo, any results you noticed, or tips for using it..."
                        rows={4}
                        maxLength={800}
                        className="w-full px-4 py-3 bg-[#FAF9F5] border border-black/8 rounded-2xl text-sm text-[#052B08] focus:outline-none focus:border-[#052B08]/40 focus:ring-1 focus:ring-[#052B08]/10 placeholder:text-gray-400 resize-none"
                      />
                      <div className="flex justify-between mt-1">
                        {errors.text ? <p className="text-red-500 text-xs">{errors.text}</p> : <span />}
                        <span className="text-[10px] text-gray-300">{formText.length}/800</span>
                      </div>
                    </div>

                    {/* Photo Upload */}
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#052B08]/60 block mb-2">Add Photos (optional, max 3)</label>
                      <div className="flex flex-wrap gap-3 items-center">
                        {formPhotos.map((src, i) => (
                          <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-black/10 group">
                            <img src={src} alt={`Preview ${i+1}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setFormPhotos(prev => prev.filter((_, j) => j !== i))}
                              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={10} />
                            </button>
                          </div>
                        ))}
                        {formPhotos.length < 3 && (
                          <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className="w-20 h-20 rounded-xl border-2 border-dashed border-[#052B08]/20 hover:border-[#052B08]/50 flex flex-col items-center justify-center gap-1 text-[#052B08]/40 hover:text-[#052B08]/70 transition-all cursor-pointer"
                          >
                            <Camera size={20} />
                            <span className="text-[9px] font-bold uppercase tracking-wider">Add Photo</span>
                          </button>
                        )}
                      </div>
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <p className="text-[10px] text-gray-400 mt-1.5">JPG, PNG, WEBP supported. Max 3 photos.</p>
                    </div>

                    {/* Submit */}
                    <div className="flex gap-3 pt-2">
                      <button
                        type="submit"
                        className="flex items-center gap-2 bg-[#052B08] text-white px-6 sm:px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#1A4B21] transition-all shadow-sm active:scale-95 cursor-pointer"
                      >
                        Submit Review
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-5 sm:px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-gray-400 hover:bg-black/5 transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews Grid */}
        {allReviews.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-[2rem] border border-[#052B08]/5">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-2">No reviews yet</p>
            <p className="text-sm text-[#052B08]/50">Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-6">
            {allReviews.map((rev, idx) => (
              <div key={rev.id || idx} className="bg-white rounded-3xl p-5 sm:p-6 border border-black/5 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between h-full text-left">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={14}
                          fill={rev.rating >= s ? '#F8CD71' : 'none'}
                          stroke={rev.rating >= s ? '#F8CD71' : '#E5E7EB'}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{rev.date}</span>
                  </div>
                  <p className="text-sm text-[#052B08]/80 leading-relaxed italic mb-4">"{rev.text}"</p>
                  {rev.photos && rev.photos.length > 0 && (
                    <ReviewPhotoGrid photos={rev.photos} />
                  )}
                </div>

                <div className="flex items-center gap-3 border-t border-black/5 pt-4 mt-4">
                  <div className="w-8 h-8 rounded-full bg-[#052B08] text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {(rev.name || 'A').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#052B08]">{rev.name || 'Anonymous'}</h4>
                    <span className="text-[9px] font-bold uppercase tracking-wider flex items-center gap-1" style={{color: rev.verified ? '#2D7A3A' : '#888'}}>
                      <span className="text-[10px]">{rev.verified ? '✓' : '●'}</span>
                      {rev.verified ? 'Verified Buyer' : 'Customer Review'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
