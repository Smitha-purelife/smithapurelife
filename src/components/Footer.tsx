import { Instagram, Facebook, Youtube, Phone, Mail, MapPin } from 'lucide-react';

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
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <img
                src="/logo.png"
                alt="Smitha Purelife"
                className="h-14 w-auto object-contain"
                style={{ filter: 'brightness(10)' }}
              />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              India's leading botanical haircare brand. Crafted with 35+ pure herbs and zero harmful chemicals for hair that truly thrives.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-7">
              <a href="tel:+919876543210" className="flex items-center gap-3 text-white/50 hover:text-[#F8CD71] transition-colors text-sm group">
                <Phone size={16} className="text-[#F8CD71]/60 group-hover:text-[#F8CD71]" />
                +91 98765 43210
              </a>
              <a href="mailto:support@smithapurelife.com" className="flex items-center gap-3 text-white/50 hover:text-[#F8CD71] transition-colors text-sm group">
                <Mail size={16} className="text-[#F8CD71]/60 group-hover:text-[#F8CD71]" />
                support@smithapurelife.com
              </a>
              <div className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin size={16} className="text-[#F8CD71]/60 flex-shrink-0 mt-0.5" />
                <span>123 Botanical Gardens Road,<br />Bangalore, Karnataka 560001</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              {[
                { Icon: Instagram, href: 'https://www.instagram.com/smitha_purelife?igsh=MWd1cjgyeWp3eG0wdw==', label: 'Instagram' },
                { Icon: Facebook, href: '#', label: 'Facebook' },
                { Icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#F8CD71] hover:border-[#F8CD71]/40 hover:bg-[#F8CD71]/10 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-bold mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 hover:text-[#F8CD71] transition-colors"
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
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap justify-center gap-8 text-white/25 text-[11px] uppercase tracking-widest font-semibold">
          {['100% Natural', 'Dermatologist Tested', 'Cruelty Free', 'Made in India', 'GMP Certified', 'ISO 9001:2015'].map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
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
