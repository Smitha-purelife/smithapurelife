import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import SmoothScroll from './components/SmoothScroll';
import ScrollToHash from './components/ScrollToHash';
import FloatingWhatsApp from './components/FloatingWhatsApp';


const HeroSlider = lazy(() => import('./components/HeroSlider'));
const KBeautyCategories = lazy(() => import('./components/KBeautyCategories'));

const StorySection = lazy(() => import('./components/StorySection'));
const KBeautyFeatures = lazy(() => import('./components/KBeautyFeatures'));
const ShopByConcern = lazy(() => import('./components/ShopByConcern'));
const KBeautyBestsellers = lazy(() => import('./components/KBeautyBestsellers'));
const HairQuizCTA = lazy(() => import('./components/HairQuizCTA'));
const IngredientsTransparency = lazy(() => import('./components/IngredientsTransparency'));
const KBeautyTexture = lazy(() => import('./components/KBeautyTexture'));
const TestimonialsGrid = lazy(() => import('./components/TestimonialsGrid'));
const TransformationsGallery = lazy(() => import('./components/TransformationsGallery'));
const FAQSection = lazy(() => import('./components/FAQSection'));
const NewsletterVIP = lazy(() => import('./components/NewsletterVIP'));
const ProductDetailPage = lazy(() => import('./components/ProductDetailPage'));
const ComboDetailPage = lazy(() => import('./components/ComboDetailPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const RewardsPage = lazy(() => import('./components/RewardsPage'));

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
        {/* Real Customer Before & Afters Evidence */}
        <TransformationsGallery />
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
      <FloatingWhatsApp />
      <SmoothScroll>
        <div className="bg-[#CDD5AE] min-h-screen selection:bg-[#FF7B89] selection:text-white relative">
          <AnimatePresence mode="wait">
            {loading && <Loader key="loader" />}
          </AnimatePresence>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/combo/:id" element={<ComboDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/rewards" element={<RewardsPage />} />
            </Routes>
          </Suspense>
        </div>
      </SmoothScroll>
    </Router>
  );
}
