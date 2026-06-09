import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  { quote: 'The Avocado Growth Oil has completely transformed my hair. I noticed less hair fall and more volume within just two weeks!', author: 'Priya Sharma', title: 'Loyal Customer', rating: 5 },
  { quote: "Finally a natural serum that doesn't feel greasy! My hair stays smooth and shiny all day long. Highly recommend Smitha Purelife.", author: 'Anita Nair', title: 'Wellness Consultant', rating: 5 },
  { quote: 'The hair care kit is my new daily ritual. The products are so gentle yet effective. My scalp feels healthier than ever.', author: 'Deepika K.', title: 'Beauty Enthusiast', rating: 5 },
  { quote: "I had dandruff and itching problems, but after using the hair wash powder it doesn't itch anymore. I used to have more hair loss with shampoo, but with this powder, it's less. I'll definitely refer to my friends and family too!", author: 'Farhana', title: 'Happy Customer', rating: 5 },
  { quote: "Smitha Purelife conditioner makes my hair feel soft and smooth after every wash, and helps reduce frizz. The hair oil is lightweight, absorbs well, and I can see reduced hair fall and better texture. It makes my hair feel stronger!", author: 'Lalli', title: 'Loyal Customer', rating: 5 },
  { quote: "I used the products for my engagement! Everyone asked me how my hair was looking so good without setting spray. Everyone else's hair was becoming frizzy, but my hair still looked the same.", author: 'Nafia', title: 'Bride-to-be', rating: 5 },
  { quote: "Every wash feels so refreshing. It gives me that traditional, clean, washed-hair feeling. I've also started noticing quite a lot of baby hair growth with the onion hair oil, which honestly makes me very happy.", author: 'Bhavani', title: 'Customer from Malaysia', rating: 5 },
  { quote: "I've been using Silk Gloss Serum regularly, and my hair feels much smoother and softer. It helps control frizz, adds a healthy shine, and leaves my hair silky without feeling greasy. I'm in love with this natural smell!", author: 'Verified Customer', title: 'Satisfied User', rating: 5 },
  { quote: "The serum is really super! It gives my hair a very nice glassy look. 💥🔥🔥", author: 'Tamilselvan', title: 'Verified Customer', rating: 5 },
  { quote: "I can clearly see a big difference in the texture of my hair. It feels much smoother, softer, and silkier than before. Frizz has reduced a lot and my hair looks healthier and more manageable after every wash. Definitely happy with the shine and softness it gives ❤️", author: 'Jency', title: 'Happy Customer', rating: 5 },
  { quote: "I've been using Follicra Hair Regrowth Serum consistently on my bald spot and I'm genuinely happy with the results. I've noticed visible regrowth, baby hairs coming in, and my scalp looks much fuller than before. I didn't expect to see such a positive change with a natural product!", author: 'Follicra User', title: 'Verified Buyer', rating: 5 },
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

  const variants: Variants = {
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
    <section id="testimonials" className="section-padding bg-bg overflow-hidden relative">
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

        {/* Existing Testimonials Carousel */}
        <div className="max-w-4xl mx-auto relative h-[450px] mb-32" style={{ perspective: '2000px' }}>
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
                    animate={{ opacity: 1, transform: 'translateZ(0px)' }}
                    initial={{ opacity: 0, transform: 'translateZ(50px)' }}
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
                style={{ transform: 'translateZ(100px)' }}
              >
                "{testimonials[current].quote}"
              </motion.h3>
              
              <motion.div 
                key={`author-${current}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center"
                style={{ transform: 'translateZ(50px)' }}
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

          {/* Carousel Navigation */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-12">
            <button onClick={() => paginate(-1)} className="text-text/30 hover:text-accent transition-all duration-500 p-4">
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-4 items-center">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`pagination-dot ${current === i ? 'active' : ''}`} />
              ))}
            </div>
            <button onClick={() => paginate(1)} className="text-text/30 hover:text-accent transition-all duration-500 p-4">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Add Review Section */}
        <div className="max-width mt-40">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ transformStyle: 'preserve-3d' }}
            className="max-w-3xl mx-auto bg-white/40 backdrop-blur-2xl p-16 rounded-[60px] border border-[#052B08]/5 shadow-2xl relative overflow-hidden"
          >
            {/* 3D background accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
            
            <div className="text-center mb-16" style={{ transform: 'translateZ(40px)' }}>
              <h4 className="serif-title text-4xl text-[#052B08] mb-4">Share your Ritual</h4>
              <p className="font-body text-[10px] tracking-[0.5em] uppercase text-[#052B08]/40">We value your botanical experience</p>
            </div>
            
            <form className="space-y-8 relative z-10" style={{ transformStyle: 'preserve-3d' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ transform: 'translateZ(20px)' }}>
                <div>
                  <label className="block font-body text-[9px] tracking-[0.3em] uppercase text-[#052B08]/60 mb-3 ml-4">Your Name</label>
                  <input type="text" className="w-full px-8 py-5 bg-white/50 border border-[#052B08]/5 rounded-full focus:outline-none focus:ring-1 focus:ring-[#052B08]/20 font-body text-sm transition-all" placeholder="Sarah J." />
                </div>
                <div>
                  <label className="block font-body text-[9px] tracking-[0.3em] uppercase text-[#052B08]/60 mb-3 ml-4">Rating</label>
                  <div className="flex gap-3 px-8 py-5 bg-white/30 rounded-full border border-[#052B08]/5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={20} className="text-[#052B08]/10 cursor-pointer hover:text-accent hover:scale-125 transition-all" />
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ transform: 'translateZ(10px)' }}>
                <label className="block font-body text-[9px] tracking-[0.3em] uppercase text-[#052B08]/60 mb-3 ml-4">Your Experience</label>
                <textarea rows={5} className="w-full px-8 py-7 bg-white/50 border border-[#052B08]/5 rounded-[40px] focus:outline-none focus:ring-1 focus:ring-[#052B08]/20 font-body text-sm resize-none transition-all" placeholder="How has Smitha Purelife transformed your ritual?" />
              </div>
              <motion.button 
                whileHover={{ scale: 1.02, z: 50 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-6 bg-[#052B08] text-white rounded-full font-body text-[11px] tracking-[0.5em] uppercase hover:bg-[#0a4a0e] transition-all duration-500 shadow-xl"
              >
                Submit Review
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


