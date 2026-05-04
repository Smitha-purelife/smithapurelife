import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, User } from 'lucide-react';

const navLinks = [
  { name: 'Shop All', href: '#collections' },
  { name: 'Our Story', href: '#story' },
  { name: 'Ingredients', href: '#ingredients' },
  { name: 'Atelier', href: '#atelier' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ${
          scrolled
            ? 'bg-white/40 backdrop-blur-2xl py-4 border-b border-white/20'
            : 'bg-transparent py-10'
        }`}
      >
        <div className="max-width px-6 md:px-12">
          <div className="flex items-center justify-between">
            {/* Left Nav */}
            <div className="hidden md:flex items-center gap-8 flex-1">
              {navLinks.slice(0, 2).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-body text-[11px] tracking-[0.25em] uppercase text-text hover:text-accent transition-colors duration-500"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Logo */}
            <motion.a
              href="#"
              className="serif-title text-2xl md:text-3xl tracking-tight text-text text-center flex-1"
            >
              Smitha Purelife
            </motion.a>

            {/* Right Nav */}
            <div className="hidden md:flex items-center justify-end gap-8 flex-1">
              {navLinks.slice(2).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-body text-[11px] tracking-[0.25em] uppercase text-text hover:text-accent transition-colors duration-500"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center gap-6 ml-4">
                <User size={18} className="text-text cursor-pointer hover:text-accent transition-colors" />
                <div className="relative cursor-pointer group">
                  <ShoppingBag size={18} className="text-text group-hover:text-accent transition-colors" />
                  <span className="absolute -top-2 -right-2 text-[9px] bg-accent text-bg w-4 h-4 flex items-center justify-center rounded-full">0</span>
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
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                onClick={() => setIsOpen(false)}
                className="serif-title text-4xl text-text"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

