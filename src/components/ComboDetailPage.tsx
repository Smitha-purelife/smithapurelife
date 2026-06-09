import { useState, useEffect } from 'react';
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
  Sparkles 
} from 'lucide-react';
import { products, comboProducts, Combo, ComboVariant } from '../data/products';
import TransformationsGallery from './TransformationsGallery';
import FAQSection from './FAQSection';
import Footer from './Footer';

export default function ComboDetailPage() {
  const { id } = useParams<{ id: string }>();
  const comboIndex = comboProducts.findIndex((c) => c.id === id);
  const combo = comboProducts[comboIndex];

  const [selectedVariant, setSelectedVariant] = useState<ComboVariant | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'included' | 'ritual'>('included');
  const [isAdded, setIsAdded] = useState(false);

  // Re-initialize state when product ID changes
  useEffect(() => {
    if (combo) {
      setSelectedVariant(combo.variants[0]);
      setActiveImageIndex(0);
      setIsAdded(false);
      window.scrollTo(0, 0);
    }
  }, [id, combo]);

  if (!combo || !selectedVariant) {
    return <div className="h-screen flex items-center justify-center font-display text-2xl">Combo page not found</div>;
  }

  // Get gallery list (Package image + individual product images inside combo)
  const getComboGallery = (c: Combo) => {
    const list: { src: string; label: string; isTransparent: boolean }[] = [
      { src: c.image, label: 'Bundle Package', isTransparent: false },
    ];
    if (c.id === 'daily-3step') {
      list.push({ src: '/products/combo_daily_3step_review.jpg', label: 'Customer Results', isTransparent: false });
    }
    if (c.id === 'complete-haircare') {
      list.push({ src: '/products/combo_complete_haircare_review.jpg', label: 'Customer Results', isTransparent: false });
    }
    if (c.id === 'smooth-silky') {
      list.push({ src: '/products/combo_smooth_silky_review.jpg', label: 'Customer Results', isTransparent: false });
    }
    if (c.id === 'transformation') {
      list.push({ src: '/products/combo_transformation_review.jpg', label: 'Customer Results', isTransparent: false });
    }
    c.includedProducts.forEach((prodId) => {
      const prod = products.find((p) => p.id === prodId);
      if (prod) {
        list.push({ src: prod.image, label: prod.title, isTransparent: true });
      }
    });
    return list;
  };

  const gallery = getComboGallery(combo);

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
    <div className="bg-[#C1CDBF] min-h-screen selection:bg-accent selection:text-bg overflow-x-hidden pt-[76px]">
      
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
            <div className="flex-1 w-full h-full rounded-[2.5rem] p-6 md:p-12 relative flex items-center justify-center overflow-hidden transition-colors duration-500" style={{ backgroundColor: combo.bg }}>
              <img 
                src={gallery[activeImageIndex].src} 
                alt={gallery[activeImageIndex].label} 
                className={`w-[85%] h-[85%] object-contain drop-shadow-xl z-10 transition-transform duration-700 hover:scale-[1.03] ${gallery[activeImageIndex].isTransparent ? 'mix-blend-multiply' : ''}`}
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
            </div>
          </div>

          {/* Right Panel: Content details */}
          <div className="w-full lg:w-1/2 text-left flex flex-col justify-center">
            
            {/* Header info */}
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#FF7B89] block mb-2">{selectedVariant.subtitle}</span>
              <h1 className="font-serif text-4xl sm:text-5xl text-[#052B08] font-bold leading-tight mb-4">{combo.title}</h1>
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
            <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-md">
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

      {/* Customer review proofs for this combo */}
      <TransformationsGallery productId={combo.id} />

      {/* FAQs */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
