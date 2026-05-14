import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const navLinks = [
  { name: 'Shop All', href: '/' },
  { name: 'Our Story', href: '/#story' },
  { name: 'Atelier', href: '/#atelier' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-700 ${
          isScrolled 
            ? 'py-4 bg-white/95 backdrop-blur-xl border-b border-black/5 shadow-sm' 
            : 'py-5 bg-white/80 backdrop-blur-md border-b border-black/5'
        }`}
      >
        <div className="max-width px-6 md:px-12">
          <div className="flex items-center justify-between">
            {/* Left Nav */}
            <div className="hidden md:flex items-center gap-8 flex-1">
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="font-body text-[12px] tracking-[0.2em] uppercase text-[#2D2A26] hover:text-[#FF7B89] transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Logo */}
            <Link
              to="/"
              className="text-2xl md:text-3xl tracking-tight text-[#2D2A26] text-center flex-1 font-serif font-medium flex items-center justify-center gap-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
              Smitha Purelife
            </Link>

            {/* Right Nav */}
            <div className="hidden md:flex items-center justify-end gap-8 flex-1">
              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="font-body text-[12px] tracking-[0.2em] uppercase text-[#2D2A26] hover:text-[#FF7B89] transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center gap-6 ml-4">
                <User size={20} className="text-[#2D2A26] cursor-pointer hover:text-[#FF7B89] transition-colors" />
                <div className="relative cursor-pointer group">
                  <ShoppingBag size={20} className="text-[#2D2A26] group-hover:text-[#FF7B89] transition-colors" />
                  <span className="absolute -top-1.5 -right-2 text-[10px] bg-[#FF7B89] text-white font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full">0</span>
                </div>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-text p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center gap-10 md:hidden"
          >
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
                  className="serif-title text-4xl text-text"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

