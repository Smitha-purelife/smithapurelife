import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function KBeautyHero() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center bg-[#FFE5E5] overflow-hidden pt-20">
      {/* Soft aesthetic background circle */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-tr from-[#FFF2F2] to-[#FFD6D6] rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/4"></div>

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="order-2 lg:order-1">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block py-1 px-3 rounded-full bg-white/60 text-[#FF7B89] text-xs font-bold tracking-widest uppercase mb-6"
          >
            New Arrival
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-[#2D2A26] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Glass Skin <br />
            <span className="italic font-light text-[#FF7B89]">Simplified.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#2D2A26]/70 text-lg md:text-xl max-w-md mb-10 leading-relaxed font-body"
          >
            Discover the secret to luminous, hydrated skin with our curated Korean beauty essentials.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <button className="bg-[#FF7B89] text-white px-8 py-4 rounded-full font-medium tracking-wide flex items-center gap-2 hover:bg-[#FF6273] transition-colors shadow-lg shadow-[#FF7B89]/20">
              Shop Routine <ArrowRight size={18} />
            </button>
            <button className="bg-white/50 backdrop-blur-sm text-[#2D2A26] px-8 py-4 rounded-full font-medium hover:bg-white transition-colors">
              Take Skin Quiz
            </button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="order-1 lg:order-2 relative aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1000&auto=format&fit=crop" 
            alt="K-Beauty Routine"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
