import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const sections = [
  { name: 'Hero', id: 'hero' },
  { name: 'Collections', id: 'collections' },
  { name: 'Our Story', id: 'story' },
  { name: 'Atelier', id: 'atelier' },
  { name: 'Testimonials', id: 'testimonials' },
  { name: 'Newsletter', id: 'newsletter' }
];

export default function SidePagination() {
  const [activeSection, setActiveSection] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[60] hidden lg:flex flex-col items-center gap-6">
      <div className="absolute top-0 bottom-0 right-[7px] w-[1px] bg-[#052B08]/10 h-full">
        <motion.div 
          style={{ scaleY, originY: 0 }}
          className="w-full h-full bg-[#052B08] origin-top"
        />
      </div>

      {sections.map((section, i) => (
        <div key={section.id} className="relative group flex items-center justify-end">
          <motion.span 
            initial={{ opacity: 0, x: 20 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-8 font-body text-[10px] tracking-[0.2em] uppercase text-[#052B08] whitespace-nowrap pointer-events-none bg-white/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 shadow-sm"
          >
            {section.name}
          </motion.span>
          
          <button
            onClick={() => scrollTo(section.id)}
            className="relative"
          >
            <motion.div 
              animate={{ 
                scale: activeSection === i ? 1.5 : 1,
                backgroundColor: activeSection === i ? '#052B08' : 'rgba(5, 43, 8, 0.1)',
                boxShadow: activeSection === i ? '0 0 20px rgba(5, 43, 8, 0.3)' : '0 0 0px rgba(0,0,0,0)'
              }}
              className="w-[15px] h-[15px] rounded-full border border-[#052B08]/20 transition-all duration-500"
            />
          </button>
        </div>
      ))}
    </div>
  );
}
