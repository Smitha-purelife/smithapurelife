import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#A8B8A8] border-t border-[#052B08]/10 pt-12 pb-6 mt-10">
      <div className="max-width px-6 md:px-12 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img 
                src="/logo.png" 
                alt="Smitha Purelife" 
                className="h-12 w-auto object-contain mix-blend-multiply filter contrast-[1.15] brightness-[1.08]" 
              />
            </div>
            <p className="font-body text-xs text-[#2D2A26]/70 leading-relaxed mb-4 max-w-xs">
              Curated Korean skincare and beauty essentials for a luminous, hydrated glass-skin glow.
            </p>
            <div className="flex gap-4">
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
              <h4 className="font-body text-[10px] tracking-[0.2em] uppercase text-[#2D2A26]/50 font-bold mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
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
        <div className="mt-10 pt-6 border-t border-[#FF7B89]/10 flex flex-col md:flex-row justify-between items-center gap-6">
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

