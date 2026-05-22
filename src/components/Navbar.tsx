import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const navLinks = [
  { name: 'Shop All', href: '/' },
  { name: 'Our Story', href: '/#story' },
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
            ? 'py-2 bg-[#C1CDBF]/90 backdrop-blur-xl border-b border-black/5 shadow-sm' 
            : 'py-3 bg-[#C1CDBF]/70 backdrop-blur-md border-b border-black/5'
        }`}
      >
        <div className="max-width px-6 md:px-12">
          <div className="flex items-center justify-between">
            {/* Left Nav */}
            <div className="hidden md:flex items-center gap-8 flex-1">
              {navLinks.slice(0, 1).map((link) => (
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
              className="flex-1 flex items-center md:justify-center gap-2 md:gap-3 transition-opacity hover:opacity-90 duration-300"
            >
              <img 
                src="/logo.png" 
                alt="Smitha Purelife" 
                className="hidden md:block h-8 md:h-9 lg:h-10 w-auto object-contain mix-blend-multiply filter contrast-[1.15] brightness-[1.08]" 
              />
              <span 
                className="text-[22px] sm:text-2xl md:text-2xl lg:text-3xl tracking-[0.15em] sm:tracking-[0.2em] text-[#2D2A26] font-bold uppercase whitespace-nowrap mx-auto md:mx-0"
              >
                Smitha Purelife
              </span>
            </Link>

            {/* Right Nav */}
            <div className="hidden md:flex items-center justify-end gap-8 flex-1">
              {navLinks.slice(1, 2).map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="font-body text-[12px] tracking-[0.2em] uppercase text-[#2D2A26] hover:text-[#FF7B89] transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
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

