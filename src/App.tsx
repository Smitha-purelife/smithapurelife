import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollPinnedShowcase from './components/ScrollPinnedShowcase';
import ProductShowcase from './components/ProductShowcase';
import CollectionSection from './components/CollectionSection';
import StorySection from './components/StorySection';

import AtelierSection from './components/AtelierSection';
import TestimonialsSection from './components/TestimonialsSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';
import SectionTransition from './components/SectionTransition';
import Loader from './components/Loader';
import SmoothScroll from './components/SmoothScroll';
import SidePagination from './components/SidePagination';
import ProductDetailPage from './components/ProductDetailPage';
import ScrollToHash from './components/ScrollToHash';

const sections = [
  CollectionSection,
  StorySection,

  AtelierSection,
  TestimonialsSection,
  NewsletterSection
];

function HomePage() {
  const { scrollYProgress } = useScroll();
  
  return (
    <div className="bg-bg min-h-screen relative z-10" style={{ transformStyle: 'preserve-3d' }}>
      
      {/* Global 3D Parallax Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
        {[...Array(8)].map((_, i) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const y = useTransform(scrollYProgress, [0, 1], [0, -1000 * (i % 2 === 0 ? 1 : 1.5)]);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const rotate = useTransform(scrollYProgress, [0, 1], [0, 360 * (i % 2 === 0 ? 1 : -1)]);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const z = useTransform(scrollYProgress, [0, 1], [-200, 200]);
          
          return (
            <motion.img
              key={`global-decor-${i}`}
              src="/products/bubbles.png"
              style={{ 
                y, 
                rotate,
                z,
                left: `${(i * 15) % 100}%`,
                top: `${(i * 25) % 100}%`,
                opacity: 0.03,
                scale: 0.5 + (i * 0.2)
              }}
              className="absolute w-64 h-64 object-contain blur-[2px]"
            />
          );
        })}
      </div>

      <ScrollPinnedShowcase />
      
      <main className="relative z-10" style={{ transformStyle: 'preserve-3d' }}>
        {sections.map((Section, i) => (
          <SectionTransition key={i} index={i}>
            <Section />
          </SectionTransition>
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ScrollToHash />
      <Navbar />
      <SidePagination />
      <SmoothScroll>
          <div className="bg-[#052B08] min-h-screen selection:bg-accent selection:text-bg relative" style={{ perspective: '3000px' }}>
            <AnimatePresence mode="wait">
              {loading && <Loader key="loader" />}
            </AnimatePresence>

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
            </Routes>
          </div>
      </SmoothScroll>
    </Router>
  );
}
