import { Instagram, Facebook, Youtube, Phone, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
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
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-start">
              <Link to="/" className="hover:opacity-90 transition-opacity">
                <img 
                  src="/logo.jpg" 
                  alt="Smitha Purelife Logo" 
                  className="h-11 w-auto object-contain rounded-lg shadow-sm"
                />
              </Link>
            </div>
            <p className="text-white/50 text-xs leading-relaxed mb-4 max-w-xs">
              India's leading botanical haircare brand. Crafted with 35+ pure herbs and zero harmful chemicals for hair that truly thrives.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <a href="tel:+916385338676" className="flex items-center gap-2.5 text-white/50 hover:text-[#F8CD71] transition-colors text-xs group">
                <Phone size={14} className="text-[#F8CD71]/60 group-hover:text-[#F8CD71]" />
                +91 63853 38676
              </a>
              <a href="https://wa.me/916385338676?text=Hi! I'm interested in Smitha Purelife products." target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-white/50 hover:text-[#25D366] transition-colors text-xs group">
                <MessageCircle size={14} className="text-[#25D366]/80 group-hover:text-[#25D366]" />
                WhatsApp: +91 63853 38676
              </a>
              <a href="mailto:smithapurelife3@gmail.com" className="flex items-center gap-2.5 text-white/50 hover:text-[#F8CD71] transition-colors text-xs group">
                <Mail size={14} className="text-white/30 group-hover:text-[#F8CD71] transition-colors" />
                smithapurelife3@gmail.com
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: 'https://www.instagram.com/smitha_purelife?igsh=MWd1cjgyeWp3eG0wdw==', label: 'Instagram' },
                { Icon: Facebook, href: 'https://www.facebook.com/share/1HJQ6T762s/', label: 'Facebook' },
                { Icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#F8CD71] hover:border-[#F8CD71]/40 hover:bg-[#F8CD71]/10 transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-bold mb-3">{col.title}</h4>
              <ul className="space-y-1.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-white/60 hover:text-[#F8CD71] transition-colors"
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
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap justify-center gap-6 text-white/25 text-[9px] uppercase tracking-widest font-semibold">
          {['100% Natural', 'Dermatologist Tested', 'Cruelty Free', 'Made in India', 'GMP Certified', 'ISO 9001:2015'].map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © 2026 Smitha Purelife Natural Care Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
              <a key={link} href="#" className="text-white/30 hover:text-[#F8CD71] text-xs transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
