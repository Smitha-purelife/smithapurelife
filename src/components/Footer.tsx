import { Instagram, Facebook, Youtube, Phone, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const ingredients = [
    'Rosemary', 'Peppermint', 'Avocado', 'Jojoba', 'Cedarwood', 'Amla',
    'Marshmallow Root', 'Veg Glycerine', 'Papaya', 'Rose', 'Hibiscus',
    'Almond', 'Orange', 'Grapeseed', 'Broccoli Seed', 'Argan', 'Almond',
    'Sugarcane', 'Walnut', 'Arappu', 'Green Tea', 'Bhringaraj', 'Neem'
  ];

  const columns = [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', href: '/#trending' },
        { label: 'Hair Oil', href: '/product/radiance-oil' },
        { label: 'Hair Serum', href: '/product/pro-repair-serum' },
        { label: 'Hair Wash', href: '/product/herbal-wash' },
        { label: 'Treatment', href: '/product/avosilk-bloom' },
      ],
    },
    {
      title: 'Our Story',
      links: [
        { label: 'About Smitha', href: '/#story' },
        { label: 'Our Ingredients', href: '/#ingredients' },
        { label: 'Rewards & Offers', href: '/rewards' },
      ],
    },
    {
      title: 'Help',
      links: [
        { label: 'Contact Us', href: '/#contact' },
        { label: 'FAQ', href: '/#faq' },
      ],
    },
  ];

  return (
    <footer id="contact" className="bg-[#052B08] text-white scroll-mt-24">
      {/* Infinite Ingredients sliding marquee */}
      <div className="w-full bg-[#031c05] border-b border-white/5 py-2.5 sm:py-4 overflow-hidden select-none relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#031c05] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#031c05] to-transparent z-10 pointer-events-none" />
        
        <div className="flex whitespace-nowrap min-w-full animate-[marquee_40s_linear_infinite]">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex shrink-0 items-center justify-around min-w-full gap-4 sm:gap-8 px-2 sm:px-4">
              {ingredients.map((ing, idx) => (
                <div key={idx} className="flex items-center gap-4 sm:gap-8 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-200">
                  <span>{ing}</span>
                  <span className="text-[#F8CD71] font-bold text-xs sm:text-sm select-none">•</span>
                </div>
              ))}
              <div className="flex items-center gap-4 sm:gap-8 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#F8CD71]">
                <span>and more</span>
                <span className="text-[#F8CD71] font-bold text-xs sm:text-sm select-none">•</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-5 md:gap-8">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <div className="mb-3 sm:mb-4 flex items-center justify-start">
              <Link to="/" className="hover:opacity-90 transition-opacity block">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-black/5 shadow-sm">
                  <img 
                    src="/logo_icon_new.png" 
                    alt="S Icon" 
                    className="h-6 w-auto object-contain"
                  />
                  <div className="flex flex-col items-start leading-none select-none">
                    <span style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 800,
                      fontSize: '14px',
                      color: '#8FC47E',
                      letterSpacing: '0.10em',
                      lineHeight: 1,
                    }}>
                      SMITHA
                    </span>
                    <span style={{
                      fontFamily: "'Dancing Script', cursive",
                      fontWeight: 600,
                      fontSize: '9px',
                      color: '#D4A574',
                      letterSpacing: '0.04em',
                      lineHeight: 1.3,
                      marginTop: '2px',
                    }}>
                      Purelife · Natural Care
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            <p className="text-white/50 text-[11px] sm:text-xs leading-relaxed mb-3 sm:mb-4 max-w-sm">
              India's leading botanical haircare brand. Crafted with 35+ pure herbs and zero harmful chemicals for hair that truly thrives.
            </p>

            {/* Contact Info */}
            <div className="space-y-1.5 sm:space-y-2 mb-4">
              <a href="tel:+916385338676" className="flex items-center gap-2.5 text-white/50 hover:text-[#F8CD71] transition-colors text-[11px] sm:text-xs group">
                <Phone size={13} className="text-[#F8CD71]/60 group-hover:text-[#F8CD71]" />
                +91 63853 38676
              </a>
              <a href="https://wa.me/916385338676?text=Hi! I'm interested in Smitha Purelife products." target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-white/50 hover:text-[#25D366] transition-colors text-[11px] sm:text-xs group">
                <MessageCircle size={13} className="text-[#25D366]/80 group-hover:text-[#25D366]" />
                WhatsApp: +91 63853 38676
              </a>
              <a href="mailto:smithapurelife3@gmail.com" className="flex items-center gap-2.5 text-white/50 hover:text-[#F8CD71] transition-colors text-[11px] sm:text-xs group">
                <Mail size={13} className="text-white/30 group-hover:text-[#F8CD71] transition-colors" />
                smithapurelife3@gmail.com
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-2.5">
              {[
                { Icon: Instagram, href: 'https://www.instagram.com/smitha_purelife?igsh=MWd1cjgyeWp3eG0wdw==', label: 'Instagram' },
                { Icon: Facebook, href: 'https://www.facebook.com/share/1HJQ6T762s/', label: 'Facebook' },
                { Icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#F8CD71] hover:border-[#F8CD71]/40 hover:bg-[#F8CD71]/10 transition-all"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {columns.map((col) => (
            <div key={col.title} className="col-span-1">
              <h4 className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white/30 font-bold mb-2 sm:mb-3">{col.title}</h4>
              <ul className="space-y-1 sm:space-y-1.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[11px] sm:text-xs text-white/60 hover:text-[#F8CD71] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3 flex flex-wrap justify-center gap-x-4 gap-y-2 text-white/25 text-[8px] sm:text-[9px] uppercase tracking-widest font-semibold text-center">
          {['100% Natural', 'Dermatologist Tested', 'Cruelty Free', 'Made in India', 'GMP Certified', 'ISO 9001:2015'].map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 text-center sm:text-left">
          <p className="text-white/30 text-[11px] sm:text-xs">
            © 2026 Smitha Purelife Natural Care Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
              <a key={link} href="#" className="text-white/30 hover:text-[#F8CD71] text-[11px] sm:text-xs transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
