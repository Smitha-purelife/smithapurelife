import { motion } from 'framer-motion';

const ingredients = [
  { name: 'Rosemary Extract', benefit: 'Stimulates blood circulation to scalp for accelerated hair growth', origin: 'Mediterranean', emoji: '🌿' },
  { name: 'Cold-Pressed Avocado', benefit: 'Deep penetrating fatty acids that restore moisture balance from root to tip', origin: 'Mexico', emoji: '🥑' },
  { name: 'Amla (Gooseberry)', benefit: 'Nature\'s richest source of Vitamin C — strengthens follicles and prevents premature graying', origin: 'India', emoji: '🍈' },
  { name: 'Bhringraj', benefit: 'The King of Herbs in Ayurveda — clinically proven to increase hair density by 15%', origin: 'India', emoji: '🌱' },
  { name: 'Golden Jojoba Oil', benefit: 'Mimics natural sebum to perfectly balance oily scalp conditions', origin: 'Sonoran Desert', emoji: '✨' },
  { name: 'Argan Oil', benefit: 'Liquid gold for instant frizz control and long-lasting heat protection', origin: 'Morocco', emoji: '🌟' },
  { name: 'Hibiscus Petals', benefit: 'Conditions hair naturally and prevents premature greying with Anthocyanins', origin: 'India', emoji: '🌺' },
  { name: 'Castor Oil', benefit: 'Ricinoleic acid nourishes roots, thickens strands and combats hair thinning', origin: 'India', emoji: '🫒' },
];

export default function IngredientsTransparency() {
  return (
    <section id="ingredients" className="py-24 bg-[#052B08] overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[11px] uppercase tracking-[0.4em] text-[#F8CD71] font-bold mb-3"
          >
            Botanical Alchemy
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            We believe in complete<br />
            <span className="italic text-[#F8CD71]">ingredient transparency</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/50 mt-4 max-w-md mx-auto"
          >
            Every botanical is ethically sourced, cold-processed, and scientifically validated. We never use sulphates, parabens, mineral oils, or artificial fragrances.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ingredients.map((ing, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#F8CD71]/30 transition-all duration-300 group"
            >
              <div className="text-3xl mb-3">{ing.emoji}</div>
              <h4 className="text-[#F8CD71] font-bold text-sm mb-1">{ing.name}</h4>
              <p className="text-[10px] uppercase tracking-widest text-white/30 mb-3">From {ing.origin}</p>
              <p className="text-white/60 text-xs leading-relaxed">{ing.benefit}</p>
            </motion.div>
          ))}
        </div>

        {/* No Nasties */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 p-8 bg-white/5 border border-white/10 rounded-2xl flex flex-wrap justify-center gap-6 md:gap-10"
        >
          {['No Sulphates', 'No Parabens', 'No Mineral Oil', 'No Artificial Fragrance', 'No Silicon', 'Cruelty Free', 'Vegan Friendly'].map((badge, i) => (
            <div key={i} className="flex items-center gap-2 text-white/70 text-xs font-semibold uppercase tracking-wider">
              <span className="text-[#F8CD71]">✓</span> {badge}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
