import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const sections = [
  { name: 'Hero', id: 'hero' },
  { name: 'Our Story', id: 'story' },
  { name: 'Concerns', id: 'concerns' },
  { name: 'Trending Now', id: 'trending' },
  { name: 'Botanical Alchemy', id: 'ingredients' },
  { name: 'Testimonials', id: 'testimonials' },
  { name: 'FAQs', id: 'faq' },
  { name: 'Newsletter', id: 'newsletter' }
];

const productItems = [
  { name: "Avosilk Bloom", id: "avosilk-bloom" },
  { name: "Radiance Hair Oil", id: "radiance-oil" },
  { name: "Herbal Hair Wash", id: "herbal-wash" },
  { name: "Pro Repair Serum", id: "pro-repair-serum" },
  { name: "Follicra Regrowth", id: "follicra-regrowth" },
  { name: "Satin Pillowcase", id: "satin-pillowcase" },
  { name: "Satin Scrunchies", id: "satin-scrunchies" }
];

export default function SidePagination() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const isProductPage = location.pathname.startsWith('/product/');
  const currentProductId = isProductPage ? location.pathname.split('/product/')[1] : null;

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection(-1);
      return;
    }

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const scrollTo = (id: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const globalLenis = (window as any).lenis;
        if (globalLenis) {
          globalLenis.scrollTo(element, { offset: -96, duration: 1.5 });
        } else {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render product items on product pages, otherwise sections
  const items = isProductPage ? productItems : sections;

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col items-end gap-5">
      {/* Vertical Progress Bar */}
      <div className="absolute right-[5px] top-0 bottom-0 w-[1px] bg-[#052B08]/5 h-full">
        <motion.div 
          style={{ scaleY, originY: 0 }}
          className="w-full h-full bg-[#052B08]/30"
        />
      </div>

      {items.map((item, i) => {
        const isActive = isProductPage 
          ? item.id === currentProductId 
          : activeSection === i;
        
        return (
          <button
            key={item.id}
            onClick={() => isProductPage ? handleProductClick(item.id) : scrollTo(item.id)}
            className="group relative flex items-center gap-4 focus:outline-none h-6"
          >
            {/* Label - Only visible on Hover to prevent content overlap */}
            <span className={`
              font-body text-[9px] tracking-[0.3em] uppercase transition-all duration-300
              opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0
              text-[#052B08] whitespace-nowrap bg-[#FDF9F6]/80 px-2 py-1 rounded-sm
            `}>
              {item.name}
            </span>

            {/* Dot Indicator */}
            <div className="relative w-3 h-3 flex items-center justify-center">
              <motion.div 
                animate={{ 
                  scale: isActive ? 1.6 : 0,
                  opacity: isActive ? 0.2 : 0
                }}
                className="absolute inset-0 rounded-full bg-[#052B08]"
              />
              <motion.div 
                animate={{ 
                  scale: isActive ? 1.2 : 1,
                  backgroundColor: isActive ? '#052B08' : '#052B0820'
                }}
                className="w-1 h-1 rounded-full"
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
