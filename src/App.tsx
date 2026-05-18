import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
const HeroSlider = lazy(() => import('./components/HeroSlider'));
const KBeautyFeatures = lazy(() => import('./components/KBeautyFeatures'));
const KBeautyCategories = lazy(() => import('./components/KBeautyCategories'));
const KBeautyBestsellers = lazy(() => import('./components/KBeautyBestsellers'));
const KBeautyTexture = lazy(() => import('./components/KBeautyTexture'));
import Footer from './components/Footer';
import Loader from './components/Loader';
import SmoothScroll from './components/SmoothScroll';
import SidePagination from './components/SidePagination';
const ProductDetailPage = lazy(() => import('./components/ProductDetailPage'));
import ScrollToHash from './components/ScrollToHash';

function HomePage() {
  return (
    <div className="bg-[#C1CDBF] min-h-screen relative z-10">
      <Suspense fallback={null}>
        <HeroSlider />
        <KBeautyFeatures />
        <KBeautyCategories />
        <KBeautyBestsellers />
        <KBeautyTexture />
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
              </Routes>
            </Suspense>
          </div>
      </SmoothScroll>
    </Router>
  );
}

