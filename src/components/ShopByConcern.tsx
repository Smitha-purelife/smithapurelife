import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';

interface Concern {
  label: string;
  emoji: string;
  color: string;
  products: string[];
}

const concerns: Concern[] = [
  { 
    label: 'Dry & Frizzy Hair', 
    emoji: '💧', 
    color: '#D4E2D4', 
    products: ['avosilk-bloom', 'pro-repair-serum'] 
  },
  { 
    label: 'Excessive Hair Fall', 
    emoji: '🍂', 
    color: '#FAF3EE', 
    products: ['radiance-oil', 'herbal-wash', 'avosilk-bloom', 'follicra-regrowth'] 
  },
  { 
    label: 'Hair Growth & Thickness', 
    emoji: '✨', 
    color: '#F9F3CC', 
    products: ['radiance-oil', 'follicra-regrowth', 'herbal-wash'] 
  },
  { 
    label: 'Dandruff & Scalp Care', 
    emoji: '🌿', 
    color: '#EEF7EE', 
    products: ['herbal-wash', 'radiance-oil'] 
  },
  { 
    label: 'Damaged Hair Repair', 
    emoji: '🌸', 
    color: '#DBCDF0', 
    products: ['avosilk-bloom', 'pro-repair-serum', 'radiance-oil'] 
  },
  { 
    label: 'Early Signs of Baldness', 
    emoji: '🍃', 
    color: '#DDF1E9', 
    products: ['follicra-regrowth', 'radiance-oil'] 
  },
  { 
    label: 'Natural & Healthy Hair Maintenance', 
    emoji: '🧴', 
    color: '#EBF3EB', 
    products: ['radiance-oil', 'herbal-wash', 'avosilk-bloom', 'pro-repair-serum', 'follicra-regrowth'] 
  },
];

export default function ShopByConcern() {
  const [selectedConcern, setSelectedConcern] = useState<Concern | null>(null);

  // Add individual recommended product directly to the cart
  const handleAddProductToCart = (prodId: string) => {
    const prod = products.find(p => p.id === prodId);
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
      setSelectedConcern(null); // close modal on add
    } catch (e) {
      console.error("Cart addition from concern modal failed:", e);
    }
  };

  return (
    <section id="concerns" className="py-20 bg-[#C1CDBF] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[11px] uppercase tracking-[0.4em] text-[#1A4B21] font-bold mb-3"
          >
            Personalised Care
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-[#2D2A26]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Shop by Concern
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#2D2A26]/60 mt-4 max-w-md mx-auto"
          >
            Every scalp is unique. Click on your concern below to view your personalized, clean botanical ritual.
          </motion.p>
        </div>

        {/* Responsive concern grid that fits 7 concerns beautifully */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {concerns.map((concern, i) => {
            const firstProduct = products.find(p => concern.products.includes(p.id));
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedConcern(concern)}
                className="cursor-pointer"
              >
                <div
                  className="rounded-2xl p-5 flex flex-col items-center justify-between gap-3 hover:shadow-lg transition-all duration-300 group h-full border border-black/5 bg-white/40"
                  style={{ backgroundColor: concern.color }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl filter drop-shadow-sm mb-1">{concern.emoji}</span>
                    <span className="text-xs font-bold text-[#2D2A26] text-center uppercase tracking-wider leading-snug group-hover:text-[#1A4B21] transition-colors">{concern.label}</span>
                  </div>
                  {firstProduct && (
                    <div className="w-16 h-20 flex items-center justify-center p-1.5 rounded-xl bg-white/60 border border-black/5 shadow-2xs mt-2 overflow-hidden flex-shrink-0">
                      <img
                        src={firstProduct.image}
                        alt={concern.label}
                        className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500 mix-blend-multiply"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recommended Ritual Modal Popup */}
      <AnimatePresence>
        {selectedConcern && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedConcern(null)}
              className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-4 top-[10%] bottom-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[650px] md:max-w-full z-[999999] bg-[#FAF8F5] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-black/5"
            >
              {/* Modal Header */}
              <div 
                className="p-6 md:p-8 flex justify-between items-center bg-white/70 backdrop-blur-md border-b border-[#2D2A26]/5"
                style={{ backgroundColor: selectedConcern.color + '50' }}
              >
                <div className="text-left">
                  <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#FF7B89] block mb-1">Recommended Ritual</span>
                  <h3 className="font-serif text-2xl md:text-3xl text-[#2D2A26] font-bold flex items-center gap-2.5">
                    <span>{selectedConcern.emoji}</span> {selectedConcern.label}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedConcern(null)}
                  className="p-2 rounded-full hover:bg-black/5 text-gray-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body / Recommended Products List */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Clean Botanical Recommendations ({selectedConcern.products.length}):</p>
                
                {selectedConcern.products.map((prodId) => {
                  const prod = products.find(p => p.id === prodId);
                  if (!prod) return null;

                  return (
                    <div 
                      key={prodId} 
                      className="bg-white rounded-2xl p-4 shadow-sm border border-[#2D2A26]/5 flex gap-4 hover:border-[#1A4B21]/25 hover:shadow-md transition-all duration-300 relative group"
                    >
                      {/* Thumbnail */}
                      <Link to={`/product/${prod.id}`} onClick={() => setSelectedConcern(null)} className="w-16 h-20 bg-[#FAF9F5] rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-2 border border-[#2D2A26]/5">
                        <img src={prod.image} alt={prod.title} className="w-full h-full object-contain mix-blend-multiply" />
                      </Link>

                      {/* Info & Price */}
                      <div className="flex-1 flex flex-col justify-between text-left py-0.5">
                        <div>
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">{prod.subtitle}</span>
                          <Link 
                            to={`/product/${prod.id}`} 
                            onClick={() => setSelectedConcern(null)} 
                            className="font-serif text-base text-[#2D2A26] font-bold hover:text-[#1A4B21] transition-colors leading-tight"
                          >
                            {prod.title}
                          </Link>
                          <p className="text-xs text-gray-400 mt-1 line-clamp-1">{prod.description}</p>
                        </div>

                        {/* Price & Add Button */}
                        <div className="flex items-center justify-between mt-3">
                          <span className="font-bold text-sm text-[#2D2A26] font-inter">
                            ₹{prod.sizes[0].price} <span className="text-[10px] text-gray-400 font-normal uppercase font-body tracking-wider ml-1">({prod.sizes[0].size})</span>
                          </span>

                          <div className="flex gap-2">
                            <Link to={`/product/${prod.id}`} onClick={() => setSelectedConcern(null)}>
                              <button className="flex items-center gap-1 bg-transparent hover:bg-black/5 text-[#2D2A26] px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border border-black/10">
                                View Details <ArrowRight size={10} />
                              </button>
                            </Link>
                            <button 
                              onClick={() => handleAddProductToCart(prod.id)}
                              className="flex items-center gap-1 bg-[#1A4B21] text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-[#0f2e14] transition-all shadow-xs active:scale-95"
                            >
                              Add to Bag <ShoppingBag size={10} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-white border-t border-[#2D2A26]/5 text-center flex justify-end gap-3.5">
                <button
                  onClick={() => setSelectedConcern(null)}
                  className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-400 hover:bg-black/5 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
