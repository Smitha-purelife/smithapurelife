import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const navLinks = [
  { name: 'Shop All', href: '/' },
  { name: 'Our Story', href: '/#story' },
];

export interface CartItem {
  cartId: string; // productId + '-' + size
  productId: string;
  size: string;
  price: number;
  quantity: number;
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
              {navLinks.slice(0, 1).map((link) => (
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
              className="flex-1 flex items-center md:justify-center gap-2 md:gap-3 transition-opacity hover:opacity-90 duration-300"
            >
              <img 
                src="/logo.png" 
                alt="Smitha Purelife" 
                className="hidden md:block h-8 md:h-9 lg:h-10 w-auto object-contain mix-blend-multiply filter contrast-[1.15] brightness-[1.08]" 
              />
              <span 
                className="text-[20px] sm:text-2xl md:text-2xl lg:text-3xl tracking-[0.15em] sm:tracking-[0.2em] text-[#2D2A26] font-bold uppercase whitespace-nowrap"
              >
                Smitha Purelife
              </span>
            </Link>

            {/* Right Nav Links & Cart Icon */}
            <div className="hidden md:flex items-center justify-end gap-8 flex-1">
              {navLinks.slice(1, 2).map((link) => (
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

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9999] bg-[#C1CDBF] flex flex-col items-center justify-center gap-10 md:hidden"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-[#2D2A26]"
            >
              <X size={28} />
            </button>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
              >
                <Link
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-serif italic text-4xl text-[#2D2A26] hover:text-[#FF7B89] transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
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
                    const productDetails = products.find(p => p.id === item.productId);
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
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">{productDetails.subtitle}</span>
                            <span className="font-serif text-base text-[#2D2A26] font-bold block leading-tight">{productDetails.title}</span>
                            <span className="inline-block bg-[#F5F2EE] text-[#2D2A26]/60 text-[10px] font-semibold px-2 py-0.5 rounded-md mt-1">
                              Size: {item.size}
                            </span>
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
                          className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 p-1 rounded-lg"
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
                  <div className="flex justify-between items-center text-sm">
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
