import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ingredients = [
  {
    name: 'Marshmallow Root',
    origin: 'Natural Therapy',
    description: 'Provides amazing slip and hydration, making it a key component for detangling and soothing the scalp.',
    icon: '🌸',
  },
  {
    name: 'Indian Gooseberry (Amla)',
    origin: 'Traditional Wisdom',
    description: 'Packed with Vitamin C and antioxidants, it strengthens hair from the roots and prevents premature graying.',
    icon: '🌳',
  },
  {
    name: 'Jojoba & Rosemary',
    origin: 'Growth Revival',
    description: 'A powerful duo that stimulates hair follicles, balances scalp oils, and promotes healthy, thick growth.',
    icon: '🌿',
  },
  {
    name: 'Aloe Vera',
    origin: 'Soothing Therapy',
    description: 'A natural cooling agent that soothes the scalp, provides deep hydration, and maintains the pH balance of your hair.',
    icon: '🌵',
  },
  {
    name: 'Hibiscus Petals',
    origin: 'Ayurvedic Bloom',
    description: 'Rich in amino acids and vitamin C, it prevents hair loss and encourages regrowth while adding a natural shine.',
    icon: '🌺',
  },
  {
    name: 'Black Cumin Seed',
    origin: 'Rescue Formula',
    description: 'Known for its medicinal properties, it helps in maintaining scalp health and reducing hair thinning.',
    icon: '🌑',
  },
  {
    name: 'Red Ginseng Root',
    origin: 'Advanced Repair',
    description: 'Increases the number of dermal papilla cells in the scalp, preventing hair loss by strengthening the hair cycle.',
    icon: '🪵',
  },
];

export default function IngredientsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section id="ingredients" ref={containerRef} className="section-padding bg-white/20 relative overflow-hidden" style={{ perspective: '2000px' }}>
      <div className="max-width">
        <div className="text-center mb-24">
          <div className="overflow-hidden">
            <motion.p 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              className="font-body text-[10px] tracking-[0.4em] uppercase text-accent font-semibold mb-6"
            >
              The Essence of Purity
            </motion.p>
          </div>
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="serif-title text-5xl md:text-7xl text-text"
            >
              Organic <span className="italic opacity-60">Ingredients</span>
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12" style={{ transformStyle: 'preserve-3d' }}>
          {ingredients.map((ingredient, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(scrollYProgress, [0, 1], [100 * (i % 3 - 1), -100 * (i % 3 - 1)]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const z = useTransform(scrollYProgress, [0, 0.5, 1], [0, 50 * (i % 2 === 0 ? 1 : -1), 0]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const rotateX = useTransform(scrollYProgress, [0, 1], [10, -10]);
            
            return (
              <motion.div
                key={ingredient.name}
                style={{ y, z, rotateX, transformStyle: 'preserve-3d' }}
                className="organic-card p-10 group hover:bg-white/60 transition-all duration-500 shadow-xl border border-white/10"
              >
                <div className="flex items-center justify-between mb-8" style={{ transform: 'translateZ(30px)' }}>
                  <span className="text-4xl grayscale group-hover:grayscale-0 transition-all duration-500">{ingredient.icon}</span>
                  <span className="font-body text-[9px] tracking-[0.2em] uppercase text-text/40">{ingredient.origin}</span>
                </div>
                
                <h3 className="serif-title text-2xl text-text mb-4" style={{ transform: 'translateZ(50px)' }}>{ingredient.name}</h3>
                <p className="font-body text-sm text-text/60 leading-relaxed" style={{ transform: 'translateZ(20px)' }}>
                  {ingredient.description}
                </p>
                
                <div className="mt-8 pt-8 border-t border-text/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left">
                  <button className="font-body text-[10px] tracking-[0.2em] uppercase text-accent font-semibold">
                    Learn More
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

