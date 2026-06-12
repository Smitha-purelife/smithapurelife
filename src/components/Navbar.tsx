import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products, comboProducts } from '../data/products';

const navLinks = [
  { name: 'Shop All', href: '/' },
  { name: 'Reviews', href: '/#proofs' },
  { name: 'Rewards', href: '/rewards' },
  { name: 'About Us', href: '/about' },
];

export interface CartItem {
  cartId: string; // productId + '-' + size
  productId: string;
  size: string;
  price: number;
  quantity: number;
  isCombo?: boolean;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Listen to scrolls for styling navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load and listen to cart updates
  const loadCart = () => {
    try {
      const stored = localStorage.getItem('smitha_purelife_cart');
      if (stored) {
        setCartItems(JSON.parse(stored));
      } else {
        setCartItems([]);
      }
    } catch (e) {
      console.error("Failed to parse cart items:", e);
    }
  };

  useEffect(() => {
    loadCart();
    
    const handleCartUpdate = () => {
      loadCart();
      // Auto-open cart drawer when item is added
      const autoOpen = localStorage.getItem('smitha_purelife_cart_auto_open');
      if (autoOpen === 'true') {
        setCartOpen(true);
        localStorage.removeItem('smitha_purelife_cart_auto_open');
      }
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, []);

  // Update item quantity
  const updateQuantity = (cartId: string, delta: number) => {
    const updated = cartItems.map(item => {
      if (item.cartId === cartId) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: Math.max(1, newQty) };
      }
      return item;
    });
    localStorage.setItem('smitha_purelife_cart', JSON.stringify(updated));
    setCartItems(updated);
    window.dispatchEvent(new Event('cart-updated'));
  };

  // Update item size
  const updateSize = (cartId: string, newSize: string) => {
    const updated = cartItems.map(item => {
      if (item.cartId === cartId) {
        if (item.isCombo) {
          const combo = comboProducts.find(c => c.id === item.productId);
          const newVariant = combo?.variants?.find(v => v.sizeName === newSize);
          if (newVariant) {
            return { ...item, size: newVariant.sizeName, price: newVariant.comboPrice };
          }
        } else {
          const productDetails = products.find(p => p.id === item.productId);
          const newSizeObj = productDetails?.sizes?.find(s => s.size === newSize);
          if (newSizeObj) {
            return { ...item, size: newSizeObj.size, price: newSizeObj.price };
          }
        }
      }
      return item;
    });
    localStorage.setItem('smitha_purelife_cart', JSON.stringify(updated));
    setCartItems(updated);
    window.dispatchEvent(new Event('cart-updated'));
  };

  // Remove item from cart
  const removeItem = (cartId: string) => {
    const filtered = cartItems.filter(item => item.cartId !== cartId);
    localStorage.setItem('smitha_purelife_cart', JSON.stringify(filtered));
    setCartItems(filtered);
    window.dispatchEvent(new Event('cart-updated'));
  };

  // Calculate cart metrics
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-700 ${
          isScrolled 
            ? 'py-2 bg-[#C1CDBF]/90 backdrop-blur-xl border-b border-black/5 shadow-sm' 
            : 'py-3 bg-[#C1CDBF]/70 backdrop-blur-md border-b border-black/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between">
            {/* Left Nav Links */}
            <div className="hidden md:flex items-center gap-8 flex-1">
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="font-body text-[12px] tracking-[0.2em] uppercase text-[#2D2A26] hover:text-[#FF7B89] transition-colors duration-300 font-bold"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Logo */}
            <Link
              to="/"
              className="flex-1 flex-row flex items-center justify-start md:justify-center gap-2.5 transition-all hover:opacity-90 duration-300 py-2"
            >
              {/* S Icon Box */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-black/5 flex-shrink-0 p-1">
                <img 
                  src="/logo_icon_new.png" 
                  alt="S Icon" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Text Logo — Playfair Display + Dancing Script */}
              <div className="flex flex-col items-start leading-none select-none">
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 800,
                    fontSize: 'clamp(15px, 3.5vw, 22px)',
                    color: '#6B8F5E',
                    letterSpacing: '0.12em',
                    lineHeight: 1,
                    textShadow: '1px 1px 0px rgba(0,0,0,0.12), 2px 2px 0px rgba(0,0,0,0.06)',
                  }}
                >
                  SMITHA
                </span>
                <span
                  style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontWeight: 600,
                    fontSize: 'clamp(8px, 1.8vw, 11px)',
                    color: '#B8906A',
                    letterSpacing: '0.04em',
                    lineHeight: 1.3,
                    marginTop: '1px',
                  }}
                >
                  Purelife · Natural Care
                </span>
              </div>
            </Link>

            {/* Right Nav Links & Cart Icon */}
            <div className="hidden md:flex items-center justify-end gap-8 flex-1">
              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="font-body text-[12px] tracking-[0.2em] uppercase text-[#2D2A26] hover:text-[#FF7B89] transition-colors duration-300 font-bold"
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Shopping Bag Button (Desktop) */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2.5 rounded-full hover:bg-black/5 active:scale-95 transition-all duration-300 text-[#2D2A26]"
              >
                <ShoppingBag size={20} />
                {totalItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-[#FF7B89] text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md"
                  >
                    {totalItemsCount}
                  </motion.span>
                )}
              </button>
            </div>

            {/* Mobile Menu & Cart Trigger */}
            <div className="flex items-center gap-3 md:hidden">
              {/* Shopping Bag Button (Mobile) */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2.5 rounded-full text-[#2D2A26]"
              >
                <ShoppingBag size={20} />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#FF7B89] text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#2D2A26] p-2"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation (Side Category slide drawer) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-xs md:hidden"
            />

            {/* Left Category Drawer Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 left-0 z-[99999] w-[85%] max-w-[340px] bg-[#FAF8F5] shadow-2xl flex flex-col h-full overflow-hidden md:hidden text-left"
            >
              {/* Promo Banner at the top */}
              <div className="bg-gradient-to-r from-[#D4E2D4] to-[#C1CDBF] px-5 py-4 flex justify-between items-center relative border-b border-black/5">
                <div className="text-left">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A4B21] block">Welcome Offer</span>
                  <span className="text-[11px] font-bold text-[#2D2A26] block mt-0.5">FLAT 10% OFF | USE CODE: <span className="underline">PURE10</span></span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full bg-white/70 hover:bg-white text-gray-500 shadow-sm transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Navigation List items */}
              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-2">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-4">Shop By Category</span>
                
                {[
                  {
                    name: 'Shop All',
                    badge: '',
                    onClick: () => {
                      localStorage.setItem('smitha_selected_category', 'all');
                      window.dispatchEvent(new Event('category-filter-updated'));
                      setIsOpen(false);
                      // Scroll to trending
                      const element = document.getElementById('trending');
                      if (element) {
                        const lenis = (window as any).lenis;
                        if (lenis) lenis.scrollTo(element, { offset: -96 });
                        else element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  },
                  {
                    name: 'Haircare Range',
                    badge: '',
                    onClick: () => {
                      localStorage.setItem('smitha_selected_category', 'haircare');
                      window.dispatchEvent(new Event('category-filter-updated'));
                      setIsOpen(false);
                      const element = document.getElementById('trending');
                      if (element) {
                        const lenis = (window as any).lenis;
                        if (lenis) lenis.scrollTo(element, { offset: -96 });
                        else element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  },
                  {
                    name: 'Essentials',
                    badge: 'New',
                    onClick: () => {
                      localStorage.setItem('smitha_selected_category', 'accessories');
                      window.dispatchEvent(new Event('category-filter-updated'));
                      setIsOpen(false);
                      const element = document.getElementById('trending');
                      if (element) {
                        const lenis = (window as any).lenis;
                        if (lenis) lenis.scrollTo(element, { offset: -96 });
                        else element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  },
                  {
                    name: 'Combos & Gifting',
                    badge: 'New',
                    onClick: () => {
                      localStorage.setItem('smitha_selected_category', 'combos');
                      window.dispatchEvent(new Event('category-filter-updated'));
                      setIsOpen(false);
                      const element = document.getElementById('trending');
                      if (element) {
                        const lenis = (window as any).lenis;
                        if (lenis) lenis.scrollTo(element, { offset: -96 });
                        else element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  },
                  {
                    name: 'Shop By Concern',
                    badge: '',
                    onClick: () => {
                      setIsOpen(false);
                      const element = document.getElementById('concerns');
                      if (element) {
                        const lenis = (window as any).lenis;
                        if (lenis) lenis.scrollTo(element, { offset: -96 });
                        else element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  },
                  {
                    name: 'Reviews & Proofs',
                    badge: 'Proof',
                    href: '/#proofs'
                  },
                  {
                    name: 'Rewards & Offers',
                    badge: 'Up to 25% Off',
                    href: '/rewards'
                  },
                  {
                    name: 'Our Story & Philosophy',
                    badge: '',
                    href: '/about'
                  },
                  {
                    name: 'Find a Store Near You',
                    badge: '',
                    onClick: () => {
                      alert("Our premium boutique experience is expanding! Our current physical flagship atelier is based in Coimbatore, TN. New store locations coming soon to Bangalore and Chennai!");
                    }
                  }
                ].map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    {item.href ? (
                      <Link
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex justify-between items-center py-4 border-b border-[#2D2A26]/5 text-[#2D2A26] hover:text-[#1A4B21] transition-colors group"
                      >
                        <span className="text-sm font-bold uppercase tracking-wider group-hover:translate-x-1.5 transition-transform duration-300">{item.name}</span>
                        <span className="text-gray-400 text-sm group-hover:text-[#1A4B21] transition-colors pr-1">›</span>
                      </Link>
                    ) : (
                      <button
                        onClick={item.onClick}
                        className="w-full flex justify-between items-center py-4 border-b border-[#2D2A26]/5 text-[#2D2A26] hover:text-[#1A4B21] transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold uppercase tracking-wider group-hover:translate-x-1.5 transition-transform duration-300">{item.name}</span>
                          {item.badge && (
                            <span className="bg-[#FF7B89] text-white font-bold text-[8px] px-1.5 py-0.5 rounded-full uppercase tracking-wider">{item.badge}</span>
                          )}
                        </div>
                        <span className="text-gray-400 text-sm group-hover:text-[#1A4B21] transition-colors pr-1">›</span>
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Bottom WhatsApp support strip */}
              <div className="p-5 border-t border-[#2D2A26]/5 bg-[#F5F2EE]/50 text-left">
                <a 
                  href="https://wa.me/916385338676" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#2D7A3A] text-white py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#1E5C28] transition-colors shadow-xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.012 2c-5.506 0-9.988 4.479-9.988 9.984 0 1.761.459 3.475 1.332 5.001l-1.417 5.176 5.304-1.391c1.472.802 3.125 1.226 4.774 1.227h.004c5.503 0 9.984-4.479 9.984-9.986 0-2.67-1.037-5.178-2.923-7.063s-4.394-2.948-7.07-2.948zm5.922 14.186c-.244.686-1.42 1.341-1.954 1.401-.483.053-.984.093-3.111-.796-2.718-1.135-4.469-3.901-4.605-4.083-.137-.182-1.111-1.476-1.111-2.818 0-1.342.701-2.001.948-2.263.247-.263.541-.329.721-.329.18 0 .36.002.518.01.164.008.384-.062.599.453.22.527.753 1.834.819 1.97.066.136.11.294.02.473-.09.18-.135.293-.27.452-.136.159-.285.355-.407.476-.135.135-.277.283-.12.553.157.27.701 1.153 1.503 1.867.953.85 1.751 1.112 2.023 1.225.27.113.43.096.59-.085.16-.18.685-.795.867-1.066.182-.271.365-.226.613-.135.248.09 1.57.74 1.84.875.27.135.45.203.518.319.068.118.068.686-.176 1.373z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
                <div className="flex justify-between items-center mt-4 text-[9px] font-bold text-[#2D2A26]/50 uppercase tracking-wider">
                  <span>Earn With Us</span>
                  <span>Need Help?</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Shopping Bag Slide-out Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm"
            />

            {/* Cart Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[999999] w-full max-w-[450px] bg-[#FAF8F5] shadow-2xl flex flex-col h-full overflow-hidden border-l border-black/5"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#2D2A26]/5 flex justify-between items-center bg-white/70 backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag size={20} className="text-[#1A4B21]" />
                  <span className="font-serif text-xl md:text-2xl text-[#2D2A26] font-bold">Your Shopping Bag</span>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-1.5 rounded-full hover:bg-black/5 text-gray-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center pb-12">
                    <div className="w-16 h-16 rounded-full bg-[#1A4B21]/5 flex items-center justify-center mb-4 text-[#1A4B21]/50">
                      <ShoppingBag size={28} />
                    </div>
                    <h3 className="font-serif text-xl text-[#2D2A26] mb-2 font-bold">Your bag is empty</h3>
                    <p className="text-sm text-gray-400 max-w-[280px] mb-6">Explore our curated collections of botanical formulas and start your beauty ritual.</p>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="bg-[#1A4B21] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#0f2e14] transition-colors shadow-md hover:shadow-lg active:scale-95"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => {
                    const isCombo = item.isCombo;
                    const productDetails = isCombo ? comboProducts.find(c => c.id === item.productId) : products.find(p => p.id === item.productId);
                    if (!productDetails) return null;

                    return (
                      <motion.div
                        key={item.cartId}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-2xl p-4 shadow-sm border border-[#2D2A26]/5 flex gap-4 relative group"
                      >
                        {/* Product Thumbnail */}
                        <div className="w-20 h-20 bg-[#FAF9F5] rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-2.5 border border-[#2D2A26]/5">
                          <img
                            src={productDetails.image}
                            alt={productDetails.title}
                            className="w-full h-full object-contain mix-blend-multiply"
                          />
                        </div>

                        {/* Product Text Details */}
                        <div className="flex-1 flex flex-col justify-between py-0.5">
                          <div>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">
                              {isCombo ? 'Special Bundle' : (productDetails as any).subtitle}
                            </span>
                            <span className="font-serif text-base text-[#2D2A26] font-bold block leading-tight">{productDetails.title}</span>
                            
                            {isCombo && (
                              <div className="text-[9px] text-[#2D2A26]/60 mt-1 leading-snug">
                                {((productDetails as any).variants?.find((v:any) => v.sizeName === item.size)?.subtitle || "Multiple items")}
                              </div>
                            )}

                            {isCombo ? (
                              <div className="mt-2">
                                <select
                                  value={item.size}
                                  onChange={(e) => updateSize(item.cartId, e.target.value)}
                                  className="bg-[#F5F2EE] text-[#2D2A26] text-[10px] font-semibold px-2 py-0.5 rounded-md border-0 focus:ring-0 cursor-pointer outline-none"
                                >
                                  {(productDetails as any).variants?.map((v:any) => (
                                    <option key={v.sizeName} value={v.sizeName}>{v.sizeName}</option>
                                  ))}
                                </select>
                              </div>
                            ) : (productDetails as any).sizes && (productDetails as any).sizes.length > 1 ? (
                              <div className="mt-1">
                                <select
                                  value={item.size}
                                  onChange={(e) => updateSize(item.cartId, e.target.value)}
                                  className="bg-[#F5F2EE] text-[#2D2A26] text-[10px] font-semibold px-2 py-0.5 rounded-md border-0 focus:ring-0 cursor-pointer outline-none"
                                >
                                  {(productDetails as any).sizes.map((s:any) => (
                                    <option key={s.size} value={s.size}>{s.size}</option>
                                  ))}
                                </select>
                              </div>
                            ) : (
                              <span className="inline-block bg-[#F5F2EE] text-[#2D2A26]/60 text-[10px] font-semibold px-2 py-0.5 rounded-md mt-1">
                                Size: {item.size}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity Selector */}
                            <div className="flex items-center gap-1 bg-[#F5F2EE] rounded-full p-1 border border-[#2D2A26]/5">
                              <button
                                onClick={() => updateQuantity(item.cartId, -1)}
                                className="w-6 h-6 rounded-full hover:bg-white flex items-center justify-center text-[#2D2A26] transition-colors"
                              >
                                <Minus size={11} />
                              </button>
                              <span className="w-5 text-center text-xs font-bold text-[#2D2A26]">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.cartId, 1)}
                                className="w-6 h-6 rounded-full hover:bg-white flex items-center justify-center text-[#2D2A26] transition-colors"
                              >
                                <Plus size={11} />
                              </button>
                            </div>

                            {/* Price */}
                            <span className="font-bold text-base text-[#2D2A26]" style={{ fontFamily: "'Inter', sans-serif" }}>
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.cartId)}
                          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 p-1 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* Drawer Footer / Checkout Summary */}
              {cartItems.length > 0 && (
                <div className="p-6 bg-white border-t border-[#2D2A26]/5 space-y-4 shadow-[0_-8px_30px_rgba(0,0,0,0.02)]">
                  
                  {/* Promo Code Input */}
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Enter promo or reward code" 
                      className="flex-1 bg-[#F5F2EE] border border-transparent focus:border-[#1A4B21]/20 rounded-xl px-4 py-3 text-xs text-[#2D2A26] placeholder-gray-400 focus:outline-none transition-colors font-medium"
                    />
                    <button 
                      onClick={() => alert('Promo code applied successfully!')}
                      className="bg-[#2D2A26] hover:bg-[#1A4B21] text-white px-5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all active:scale-95 whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>

                  <div className="flex justify-between items-center text-sm pt-2 border-t border-black/5">
                    <span className="text-gray-400 font-medium uppercase tracking-wider">Subtotal</span>
                    <span className="font-bold text-xl text-[#2D2A26]" style={{ fontFamily: "'Inter', sans-serif" }}>
                      ₹{cartSubtotal.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-normal">Shipping, taxes, and discounts calculated at checkout. Free shipping on orders above ₹799.</p>
                  
                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      onClick={() => alert("Checkout initiated! Thank you for purchasing from Smitha Purelife.")}
                      className="w-full bg-[#1A4B21] text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#0f2e14] transition-colors shadow-lg active:scale-95 text-center"
                    >
                      Proceed to Checkout
                    </button>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="w-full bg-transparent text-[#1A4B21] py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black/5 transition-colors text-center"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
