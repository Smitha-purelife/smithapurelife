import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const concerns = [
  { label: 'Hair Fall', emoji: '🍃', color: '#DDF1E9', products: ['avosilk-bloom', 'follicra-regrowth'] },
  { label: 'Dry & Frizzy', emoji: '💧', color: '#D4E2D4', products: ['avosilk-bloom', 'pro-repair-serum'] },
  { label: 'Scalp Health', emoji: '🌿', color: '#EBF3EB', products: ['herbal-wash', 'radiance-oil'] },
  { label: 'Hair Growth', emoji: '✨', color: '#F9F3CC', products: ['follicra-regrowth', 'radiance-oil'] },
  { label: 'Oily Scalp', emoji: '🧴', color: '#D4E2D4', products: ['herbal-wash'] },
  { label: 'Damaged Hair', emoji: '🌸', color: '#DBCDF0', products: ['pro-repair-serum', 'avosilk-bloom'] },
];

export default function ShopByConcern() {
  return (
    <section className="py-20 bg-[#C1CDBF]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[11px] uppercase tracking-[0.4em] text-[#1A4B21] font-bold mb-3"
          >
            Personalised Care
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-[#2D2A26]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Shop by Concern
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#2D2A26]/60 mt-4 max-w-md mx-auto"
          >
            Every scalp is unique. Find the ritual crafted precisely for your hair goals.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {concerns.map((concern, i) => {
            const relatedProduct = products.find(p => concern.products.includes(p.id));
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <Link to={relatedProduct ? `/product/${relatedProduct.id}` : '/'}>
                  <div
                    className="rounded-2xl p-5 flex flex-col items-center gap-3 cursor-pointer hover:shadow-lg transition-all duration-300 group"
                    style={{ backgroundColor: concern.color }}
                  >
                    <span className="text-3xl">{concern.emoji}</span>
                    {relatedProduct && (
                      <img
                        src={relatedProduct.image}
                        alt={concern.label}
                        className="w-16 h-16 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300 mix-blend-multiply"
                      />
                    )}
                    <span className="text-xs font-bold text-[#2D2A26] text-center uppercase tracking-wide">{concern.label}</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
