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
  ProductShowcase,
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
      <div className="bg-bg min-h-screen selection:bg-accent selection:text-bg">
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>

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
    </div>
    </SmoothScroll>
  );
}
