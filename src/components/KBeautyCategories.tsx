import { products } from '../data/products';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function KBeautyCategories() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-serif text-[#2D2A26] mb-8 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
          Shop by Ritual
        </h2>
        
        <div className="flex justify-start md:justify-center gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x">
          {products.map((product, i) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              key={product.id} 
              className="flex flex-col items-center gap-3 snap-center cursor-pointer group flex-shrink-0"
            >
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md"
                style={{ backgroundColor: product.accent }}
              >
                <img src={product.image} alt={product.title} className="w-[80%] h-[80%] object-contain drop-shadow-md group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-sm font-medium text-[#2D2A26]/80 text-center max-w-[100px] leading-tight">{product.subtitle}</span>
            </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
