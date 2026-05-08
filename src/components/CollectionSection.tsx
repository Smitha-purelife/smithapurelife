import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import { Link } from 'react-router-dom';

function ProductCard({ product, index, scrollYProgress }: { product: typeof products[0]; index: number; scrollYProgress: any }) {
  const y = useTransform(scrollYProgress, [0, 1], [50 * (index % 3), -50 * (index % 3)]);
  const z = useTransform(scrollYProgress, [0, 0.5, 1], [0, 60, 0]);

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        style={{ y, z, perspective: 1200, transformStyle: 'preserve-3d' }}
        whileHover={{ 
          rotateX: 10,
          rotateY: -10,
          scale: 1.05,
          transition: { duration: 0.4, ease: "easeOut" }
        }}
        className="group cursor-pointer"
      >
        <div 
          className="relative aspect-[4/5] bg-white/30 rounded-3xl overflow-hidden mb-6 transition-transform duration-700"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700"
            style={{ transform: 'translateZ(60px)' }}
          />
          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500" />
          
          {/* Quick Add Overlay */}
          <div 
            className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
            style={{ transform: 'translateZ(80px)' }}
          >
            <button className="w-full py-4 bg-white text-text rounded-full font-body text-[10px] tracking-[0.2em] uppercase shadow-xl hover:bg-text hover:text-white transition-colors">
              Explore Ritual
            </button>
          </div>
        </div>

        <div className="flex justify-between items-start" style={{ transform: 'translateZ(40px)' }}>
          <div>
            <p className="font-body text-[10px] tracking-[0.2em] uppercase text-text/40 mb-1">{product.subtitle}</p>
            <h3 className="serif-title text-xl text-text group-hover:text-accent transition-colors leading-tight">{product.title}</h3>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}


export default function CollectionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section id="collections" ref={containerRef} className="section-padding bg-bg" style={{ perspective: '2000px' }}>
      <div className="max-width">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8" style={{ transformStyle: 'preserve-3d' }}>
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

