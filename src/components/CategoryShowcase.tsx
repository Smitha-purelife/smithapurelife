import { motion } from 'framer-motion';
import { products } from '../data/products';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function CategoryShowcase() {
  return (
    <section className="py-16 md:py-24 bg-transparent relative z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex gap-4 md:gap-8 overflow-x-auto pb-8 hide-scrollbar snap-x snap-mandatory pt-10 px-2">
          {products.map((product) => (
            <Link 
              to={`/product/${product.id}`} 
              key={product.id}
              className="flex-shrink-0 w-[140px] md:w-[220px] flex flex-col items-center gap-6 snap-center group"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-square flex items-center justify-center">
                {/* Background Shape */}
                <motion.div 
                  className="absolute bottom-0 w-full h-[90%] rounded-full shadow-sm transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundColor: product.accent }}
                />
                
                {/* Product Image */}
                <motion.img 
                  src={product.image} 
                  alt={product.title}
                  className="relative z-10 w-[85%] h-[120%] object-contain drop-shadow-xl transition-transform duration-500 group-hover:-translate-y-4 group-hover:scale-110"
                />
              </div>

              {/* Title Pill */}
              <motion.div 
                className="bg-white border border-[#052B08]/10 rounded-full px-5 py-2.5 flex items-center gap-2 shadow-sm transition-all duration-300 group-hover:border-[#052B08]/30 group-hover:shadow-md"
              >
                <span className="font-body text-[12px] md:text-[14px] text-[#052B08] font-medium whitespace-nowrap">
                  {product.title}
                </span>
                <ChevronRight size={16} className="text-[#052B08]/50 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
