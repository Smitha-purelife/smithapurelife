import { products } from '../data/products';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function KBeautyCategories() {
  const getCategoryName = (id: string) => {
    switch(id) {
      case 'avosilk-bloom': return 'Conditioners';
      case 'radiance-oil': return 'Hair Oils';
      case 'herbal-wash': return 'Cleansers';
      case 'pro-repair-serum': return 'Serums';
      default: return 'Treatments';
    }
  };

  return (
    <section className="py-6 bg-[#FDF9F6]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-start md:justify-center gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
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
                className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: product.bg }}
              >
                <img src={product.image} alt={product.title} className="w-[85%] h-[85%] object-contain drop-shadow-sm group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#2D2A26]/15 rounded-full shadow-sm group-hover:border-[#2D2A26]/40 transition-colors">
                <span className="text-[13px] md:text-sm font-medium text-[#2D2A26]">{getCategoryName(product.id)}</span>
                <span className="text-[#2D2A26] text-[10px] md:text-xs">›</span>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
