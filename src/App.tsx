import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import ScrollPinnedShowcase from './components/ScrollPinnedShowcase';
import ProductShowcase from './components/ProductShowcase';
import CollectionSection from './components/CollectionSection';
import StorySection from './components/StorySection';
import IngredientsSection from './components/IngredientsSection';
import AtelierSection from './components/AtelierSection';
import TestimonialsSection from './components/TestimonialsSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';
import SectionTransition from './components/SectionTransition';
import Loader from './components/Loader';
import SmoothScroll from './components/SmoothScroll';

const sections = [
  CollectionSection,
  StorySection,
  IngredientsSection,
  AtelierSection,
  TestimonialsSection,
  NewsletterSection
];

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScroll>
      <div className="bg-[#052B08] min-h-screen selection:bg-accent selection:text-bg overflow-hidden" style={{ perspective: '2000px' }}>
        <AnimatePresence mode="wait">
          {loading && <Loader key="loader" />}
        </AnimatePresence>

        <motion.div
          initial={{ scale: 0.9, opacity: 0, rotateX: 10, y: 100 }}
          animate={{ 
            scale: loading ? 0.9 : 1, 
            opacity: loading ? 0 : 1, 
            rotateX: loading ? 10 : 0,
            y: loading ? 100 : 0
          }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: loading ? 0 : 0.2 }}
          className="bg-bg min-h-screen origin-top shadow-[0_0_100px_rgba(0,0,0,0.5)] relative z-10"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Navbar />
          
          {/* Vera Nourish-style scroll-pinned hero showcase */}
          <ScrollPinnedShowcase />
          
          <main className="relative z-10">
            {sections.map((Section, i) => (
              <SectionTransition key={i} index={i}>
                <Section />
              </SectionTransition>
            ))}
          </main>
          <Footer />
        </motion.div>
      </div>
    </SmoothScroll>
  );
}
