import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import SmoothScroll from './components/SmoothScroll';
import SidePagination from './components/SidePagination';
import ScrollToHash from './components/ScrollToHash';

const HeroSlider = lazy(() => import('./components/HeroSlider'));
const KBeautyCategories = lazy(() => import('./components/KBeautyCategories'));
const WhyUsStrip = lazy(() => import('./components/WhyUsStrip'));
const StorySection = lazy(() => import('./components/StorySection'));
const KBeautyFeatures = lazy(() => import('./components/KBeautyFeatures'));
const ShopByConcern = lazy(() => import('./components/ShopByConcern'));
const KBeautyBestsellers = lazy(() => import('./components/KBeautyBestsellers'));
const HairQuizCTA = lazy(() => import('./components/HairQuizCTA'));
const IngredientsTransparency = lazy(() => import('./components/IngredientsTransparency'));
const KBeautyTexture = lazy(() => import('./components/KBeautyTexture'));
const TestimonialsGrid = lazy(() => import('./components/TestimonialsGrid'));
const FAQSection = lazy(() => import('./components/FAQSection'));
const NewsletterVIP = lazy(() => import('./components/NewsletterVIP'));
const ProductDetailPage = lazy(() => import('./components/ProductDetailPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));

function HomePage() {
  return (
    <div className="min-h-screen relative z-10">
      <Suspense fallback={null}>
        {/* 1. Full-bleed Hero Slider */}
        <HeroSlider />
        {/* Categories Side Scroll */}
        <KBeautyCategories />
        {/* 6. Trending Now — Bestsellers Grid */}
        <KBeautyBestsellers />
        {/* 4. Shop by Hair Concern */}
        <ShopByConcern />
        {/* 2. Why Us — Trust Building Strip */}
        <WhyUsStrip />
        {/* 2b. Our Story Section */}
        <StorySection />
        {/* 3. Brand Promise Feature Cards */}
        <KBeautyFeatures />
        {/* 7. Hair Quiz CTA */}
        <HairQuizCTA />
        {/* 8. Botanical Alchemy — Ingredients Transparency */}
        <IngredientsTransparency />
        {/* 9. Sensory Textures section */}
        <KBeautyTexture />
        {/* 10. Customer Reviews Grid */}
        <TestimonialsGrid />
        {/* 11. FAQ Accordion */}
        <FAQSection />
        {/* 12. VIP Newsletter */}
        <NewsletterVIP />
        {/* 13. Footer */}
        <Footer />
      </Suspense>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ScrollToHash />
      <Navbar />
      <SidePagination />
      <SmoothScroll>
        <div className="bg-[#C1CDBF] min-h-screen selection:bg-[#FF7B89] selection:text-white relative">
          <AnimatePresence mode="wait">
            {loading && <Loader key="loader" />}
          </AnimatePresence>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Suspense>
        </div>
      </SmoothScroll>
    </Router>
  );
}
