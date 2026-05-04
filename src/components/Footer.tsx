import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-bg border-t border-text/5">
      <div className="max-width px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <h3 className="serif-title text-3xl text-text mb-8">Smitha Purelife</h3>
            <p className="font-body text-sm text-text/60 leading-relaxed mb-8 max-w-xs">
              Honoring the purity of nature through botanical artistry and sustainable hair care rituals.
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
                  className="text-text/40 hover:text-accent transition-colors"
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
              <h4 className="font-body text-[10px] tracking-[0.3em] uppercase text-text/40 mb-8">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-body text-sm text-text hover:text-accent transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter / Bottom */}
        <div className="mt-20 pt-12 border-t border-text/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="font-body text-xs text-text/40">
            &copy; 2024 Smitha Purelife. Crafted with nature.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="font-body text-[10px] tracking-[0.2em] uppercase text-text/40 hover:text-text transition-colors">Instagram</a>
            <a href="#" className="font-body text-[10px] tracking-[0.2em] uppercase text-text/40 hover:text-text transition-colors">Pinterest</a>
            <a href="#" className="font-body text-[10px] tracking-[0.2em] uppercase text-text/40 hover:text-text transition-colors">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

