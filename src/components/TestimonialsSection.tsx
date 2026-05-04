import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  { quote: 'The Avocado Growth Oil has completely transformed my hair. I noticed less hair fall and more volume within just two weeks!', author: 'Priya Sharma', title: 'Loyal Customer', rating: 5 },
  { quote: "Finally a natural serum that doesn't feel greasy! My hair stays smooth and shiny all day long. Highly recommend Smitha Purelife.", author: 'Anita Nair', title: 'Wellness Consultant', rating: 5 },
  { quote: 'The hair care kit is my new daily ritual. The products are so gentle yet effective. My scalp feels healthier than ever.', author: 'Deepika K.', title: 'Beauty Enthusiast', rating: 5 },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 8000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.8,
      z: -200
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      z: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.8,
      z: -200,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section className="section-padding bg-bg overflow-hidden">
      <div className="max-width">
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-body text-[10px] tracking-[0.4em] uppercase text-accent font-semibold mb-6"
          >
            Praise & Accolades
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto relative h-[450px]" style={{ perspective: '2000px' }}>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex flex-col items-center justify-center p-12 bg-white/40 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white/20"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* 3D Floating Stars */}
              <div className="flex gap-2 justify-center mb-10">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <motion.div
                    key={`${current}-${i}`}
                    initial={{ translateZ: 50, opacity: 0 }}
                    animate={{ translateZ: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <Star size={16} className="text-accent fill-accent" />
                  </motion.div>
                ))}
              </div>
              
              <motion.h3 
                key={`quote-${current}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="serif-title text-3xl md:text-5xl text-text leading-tight mb-12 italic text-center"
                style={{ translateZ: 100 }}
              >
                "{testimonials[current].quote}"
              </motion.h3>
              
              <motion.div 
                key={`author-${current}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center"
                style={{ translateZ: 50 }}
              >
                <p className="font-body text-[11px] tracking-[0.3em] uppercase text-text font-bold">
                  {testimonials[current].author}
                </p>
                <p className="font-body text-[10px] tracking-[0.2em] uppercase text-text/40 mt-1">
                  {testimonials[current].author} | {testimonials[current].title}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* 3D Navigation Dots */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-12">
            <button 
              onClick={() => paginate(-1)}
              className="text-text/30 hover:text-accent transition-all duration-500 p-4 group"
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <div className="flex gap-4 items-center">
              {testimonials.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`pagination-dot ${current === i ? 'active' : ''}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={() => paginate(1)}
              className="text-text/30 hover:text-accent transition-all duration-500 p-4 group"
            >
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


