import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Are Smitha Purelife products suitable for all hair types?',
    a: 'Yes! All our formulas are designed for universal hair types — whether you have straight, wavy, curly, or coily hair. Our botanical range caters to oily, dry, normal, and sensitive scalp types. If you\'re unsure, try our Hair Quiz for a personalised recommendation.',
  },
  {
    q: 'How long does it take to see results?',
    a: 'Most customers report visible improvements within 2–4 weeks of consistent use. For concerns like hair regrowth and density, we recommend a 90-day ritual for clinical-grade results. Our formulas work with your hair\'s natural growth cycle.',
  },
  {
    q: 'Are your products 100% chemical-free?',
    a: 'All our products are free from sulphates, parabens, silicones, mineral oils, and artificial fragrances. We use only naturally-derived, cold-processed botanical ingredients. Every batch is dermatologist tested and certified safe.',
  },
  {
    q: 'Can I use multiple Smitha Purelife products together?',
    a: 'Absolutely! Our products are formulated to work synergistically as a complete haircare ritual. For example, combining the Herbal Hair Wash with the Radiance Hair Oil and Avosilky Bloom creates a comprehensive care routine addressing cleansing, nourishment, and growth.',
  },

  {
    q: 'Are the products safe to use during pregnancy?',
    a: 'Our products are made from natural, botanical ingredients and are generally considered safe. However, we always recommend consulting your gynaecologist or healthcare provider before starting any new hair or skincare routine during pregnancy as a precaution.',
  },
  {
    q: 'How should I store the Herbal Hair Wash powder?',
    a: 'Store the Herbal Hair Wash powder in a cool, dry place away from moisture and direct sunlight. Always use a dry spoon to scoop the powder. Ensure the lid is tightly closed after each use. Shelf life is 18 months from manufacture date.',
  },
  {
    q: 'Do you offer bulk or wholesale pricing?',
    a: 'Yes! We offer special wholesale and bulk pricing for salons, wellness centres, and corporate gifting. Contact us at smithapurelife3@gmail.com or WhatsApp us at +91-9876543210 for a custom quote.',
  },
  {
    q: 'Why did hair fall increase after using your natural products?',
    a: "Some customers may notice temporary hair shedding in the first few weeks. This can happen when weak, old hairs that were already in the shedding phase fall out, making way for healthier new hair growth. Many people stop using the product at this stage, thinking it's causing hair fall. However, customers who continued using it often experienced reduced hair fall, healthier hair growth, and improved hair thickness over time. Trust the process sometimes old, weak hairs need to shed before stronger, healthier hair can grow. 🌱 Results may vary depending on individual hair and scalp conditions.",
  },
  {
    q: 'How should I use the conditioner?',
    a: 'After shampooing, gently squeeze out excess water from your hair (must). Apply the conditioner only to the mid-lengths and ends (avoid the scalp). Leave it on for 3–5 minutes, then rinse thoroughly with water.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Orders are dispatched within 1-2 business days and typically arrive in 3-5 business days across all of India.',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-[#CDD5AE] scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[11px] uppercase tracking-[0.4em] text-[#1A4B21] font-bold mb-3"
          >
            We Have Answers
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-[#2D2A26]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden border border-black/5 hover:border-[#1A4B21]/25 transition-all shadow-xs"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left gap-4"
              >
                <span className="font-semibold text-[#2D2A26] text-sm md:text-base leading-snug">{faq.q}</span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 text-[#1A4B21]"
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-[#2D2A26]/70 text-sm leading-relaxed border-t border-[#1A4B21]/10 pt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
