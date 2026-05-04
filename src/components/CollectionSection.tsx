import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const products = [
  { name: 'Avosilky Bloom Conditioner', category: 'Hair Therapy', price: 'Starting from ₹146.00', image: '/products/avosilk_bloom.png' },
  { name: 'Herbal Hair Wash Powder', category: 'Cleansing', price: 'Starting from ₹142.00', image: '/products/hair_wash_powder.png' },
  { name: 'Herbal Radiance Hair Oil', category: 'Growth Revival', price: 'Starting from ₹249.00', image: '/products/image copy 6.png' },
  { name: 'Silk Gloss Pro Repair Serum', category: 'Advanced Care', price: '₹399.00', image: '/products/skin_glow_pro_repair_hairserum.png' },
  { name: 'Follicra Regrowth Serum', category: 'Regrowth', price: '₹699.00', image: '/products/hexagen-image (1).png' },
];

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ 
        rotateX: 15,
        rotateY: -15,
        z: 50,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
      className="group cursor-pointer"
    >
      <div 
        className="relative aspect-[4/5] bg-white/30 rounded-3xl overflow-hidden mb-6 transition-transform duration-700"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700"
          style={{ translateZ: 60 }}
        />
        <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500" />
        
        {/* Quick Add Overlay */}
        <div 
          className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
          style={{ translateZ: 80 }}
        >
          <button className="w-full py-4 bg-white text-text rounded-full font-body text-[10px] tracking-[0.2em] uppercase shadow-xl hover:bg-text hover:text-white transition-colors">
            Quick Add — {product.price}
          </button>
        </div>
      </div>

      <div className="flex justify-between items-start" style={{ translateZ: 40 }}>
        <div>
          <p className="font-body text-[10px] tracking-[0.2em] uppercase text-text/40 mb-1">{product.category}</p>
          <h3 className="serif-title text-2xl text-text group-hover:text-accent transition-colors">{product.name}</h3>
        </div>
        <p className="font-body text-sm text-text/60 mt-1">{product.price}</p>
      </div>
    </motion.div>
  );
}


export default function CollectionSection() {
  return (
    <section id="collections" className="section-padding bg-bg">
      <div className="max-width">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-body text-[10px] tracking-[0.4em] uppercase text-accent font-semibold mb-6"
            >
              The Essential Collection
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="serif-title text-5xl md:text-6xl text-text"
            >
              Crafted by nature, <br />
              <span className="italic opacity-60">perfected by us.</span>
            </motion.h2>
          </div>
          
          <motion.button 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 font-body text-[11px] tracking-[0.25em] uppercase text-text group border-b border-text/10 pb-2 hover:border-accent transition-colors"
          >
            View All Products
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {products.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

