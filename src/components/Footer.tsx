import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#FFF5F5] border-t border-[#FF7B89]/10 pt-24 pb-12 mt-10">
      <div className="max-width px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <h3 className="text-3xl text-[#2D2A26] mb-8 font-serif" style={{ fontFamily: "'Playfair Display', serif" }}>K-Beauty by Smitha</h3>
            <p className="font-body text-sm text-[#2D2A26]/70 leading-relaxed mb-8 max-w-xs">
              Curated Korean skincare and beauty essentials for a luminous, hydrated glass-skin glow.
            </p>
            <div className="flex gap-6">
              {[
                { Icon: Instagram, href: 'https://www.instagram.com/smitha_purelife?igsh=MWd1cjgyeWp3eG0wdw==' },
                { Icon: Facebook, href: '#' },
                { Icon: Twitter, href: '#' }
              ].map(({ Icon, href }, i) => (
                <a 
                  key={i} 
                  href={href} 
                  className="text-[#2D2A26]/40 hover:text-[#FF7B89] transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {[
            { title: 'Shop', links: ['All Products', 'Best Sellers', 'New Arrivals', 'Gifts'] },
            { title: 'Maison', links: ['Our Story', 'Ingredients', 'Sustainability', 'Atelier'] },
            { title: 'Support', links: ['Contact Us', 'Shipping & Returns', 'FAQ', 'Privacy Policy'] }
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-body text-[11px] tracking-[0.2em] uppercase text-[#2D2A26]/50 font-bold mb-8">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-body text-sm text-[#2D2A26] hover:text-[#FF7B89] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter / Bottom */}
        <div className="mt-20 pt-12 border-t border-[#FF7B89]/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="font-body text-xs text-[#2D2A26]/50">
            &copy; 2026 K-Beauty by Smitha. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="font-body text-[10px] tracking-[0.2em] uppercase text-[#2D2A26]/50 hover:text-[#FF7B89] transition-colors">Instagram</a>
            <a href="#" className="font-body text-[10px] tracking-[0.2em] uppercase text-[#2D2A26]/50 hover:text-[#FF7B89] transition-colors">Pinterest</a>
            <a href="#" className="font-body text-[10px] tracking-[0.2em] uppercase text-[#2D2A26]/50 hover:text-[#FF7B89] transition-colors">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

