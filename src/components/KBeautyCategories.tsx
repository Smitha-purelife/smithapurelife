import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'haircare',
    name: 'Haircare',
    count: '5 Products',
    image: '/products/hair_icon.png',
    href: '/#trending',
    bg: '#F0F5F1',
  },
  {
    id: 'accessories',
    name: 'Essentials',
    count: '2 Products',
    image: '/products/essentials_icon.jpg',
    href: '/#trending',
    bg: '#FAF3EE',
  },
  {
    id: 'combos',
    name: 'Combos',
    count: '4 Bundles',
    image: '/products/combos_icon.jpg',
    href: '/#combos',
    bg: '#FAF9F5',
  }
];

export default function KBeautyCategories() {
  return (
    <section className="py-8 md:py-10 bg-[#FDF9F6] border-b border-[#2D2A26]/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-center items-center gap-4 md:gap-8">
          {categories.map((cat, i) => (
            <Link 
              to={cat.href} 
              key={cat.id}
              onClick={(e) => {
                if (cat.id !== 'combos') {
                  localStorage.setItem('smitha_selected_category', cat.id);
                  window.dispatchEvent(new Event('category-filter-updated'));
                }
                // Robust smooth scrolling for both active Lenis instances and standard viewport jumps
                if (window.location.pathname === '/') {
                  const targetId = cat.id === 'combos' ? 'combos' : 'trending';
                  const element = document.getElementById(targetId);
                  const lenis = (window as any).lenis;
                  if (element) {
                    e.preventDefault();
                    if (lenis) {
                      lenis.scrollTo(element, { offset: -96, duration: 1.5 });
                    } else {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }
              }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center gap-3 cursor-pointer group"
              >
                {/* Premium Round Container */}
                <div 
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-105 border border-[#2D2A26]/5 shadow-sm group-hover:shadow-md relative bg-white"
                >
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Styled Badge */}
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 bg-white border border-[#2D2A26]/10 rounded-full shadow-xs group-hover:border-[#1A4B21]/45 group-hover:bg-[#EEF7EE]/10 transition-all duration-300">
                    <span className="text-[12px] md:text-[13px] font-bold tracking-wider text-[#2D2A26] uppercase group-hover:text-[#1A4B21] transition-colors">{cat.name}</span>
                    <span className="text-[#2D2A26]/40 text-xs group-hover:text-[#1A4B21]/60 transition-colors">›</span>
                  </div>
                  <span className="text-[9px] md:text-[10px] text-gray-400 mt-1 font-semibold uppercase tracking-widest">{cat.count}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
