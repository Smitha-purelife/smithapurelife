import { products } from '../data/products';
import { motion } from 'framer-motion';

export default function KBeautyTexture() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif text-[#2D2A26] mb-6 leading-tight" 
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Experience the <br />
              <span className="italic text-[#FF7B89]">Sensory Textures</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-[#2D2A26]/70 text-lg mb-10 max-w-md"
            >
              Our botanical formulas are designed to provide a rich, sensory experience. Dive into silky serums, nourishing oils, and cloud-like powders that make your routine a joy.
            </motion.p>

            <div className="space-y-6">
              {products.slice(0, 3).map((product, i) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  viewport={{ once: true }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-[#2D2A26]/10">
                    <img src={product.texture} alt={product.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2D2A26]">{product.title} Texture</h4>
                    <p className="text-sm text-[#2D2A26]/60 line-clamp-1">{product.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-10 border-b-2 border-[#FF7B89] text-[#FF7B89] font-semibold pb-1 hover:text-[#2D2A26] hover:border-[#2D2A26] transition-colors uppercase tracking-widest text-sm"
            >
              Shop by Texture
            </motion.button>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[320px] sm:h-[420px] md:h-[520px] lg:h-[600px] rounded-[3rem] overflow-hidden"
          >
            <img 
              src={products[0].lifestyleImage} 
              alt="Texture" 
              className="absolute inset-0 w-full h-full object-cover object-left"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-10">
              <p className="text-white text-2xl font-serif italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                "Like a drink of water for your hair."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
