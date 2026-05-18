import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function HairQuizCTA() {
  const steps = [
    { num: '01', label: 'Tell us about your hair' },
    { num: '02', label: 'Share your concerns' },
    { num: '03', label: 'Get your ritual' },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #1A4B21 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-[#EBF3EB] rounded-[3rem] p-12 md:p-16 grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[11px] uppercase tracking-[0.4em] text-[#1A4B21] font-bold mb-3"
            >
              Personalised Ritual Finder
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif text-[#2D2A26] mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Not sure where<br />
              <span className="italic text-[#1A4B21]">to start?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#2D2A26]/70 mb-8 max-w-sm leading-relaxed"
            >
              Take our 60-second hair quiz and our botanists will curate the perfect 3-step ritual tailored specifically to your unique hair type, scalp condition, and goals.
            </motion.p>

            {/* Steps */}
            <div className="flex flex-col gap-4 mb-10">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <span className="text-[#1A4B21]/30 font-bold text-2xl font-mono">{step.num}</span>
                  <div className="flex-1 h-[1px] bg-[#1A4B21]/10" />
                  <span className="text-sm text-[#2D2A26]/70 font-medium">{step.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#1A4B21] text-white px-8 py-4 rounded-full font-bold tracking-widest uppercase text-xs flex items-center gap-3 hover:bg-[#052B08] transition-colors shadow-lg"
                >
                  Take the Hair Quiz
                  <ArrowRight size={16} />
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Hair Texture', options: ['Fine', 'Medium', 'Thick', 'Coarse'], color: '#DDF1E9' },
                { label: 'Scalp Type', options: ['Oily', 'Dry', 'Normal', 'Sensitive'], color: '#F9F3CC' },
                { label: 'Main Concern', options: ['Hair Fall', 'Frizz', 'Growth', 'Dullness'], color: '#DBCDF0' },
                { label: 'Your Goal', options: ['Repair', 'Hydrate', 'Strengthen', 'Shine'], color: '#E9D5CA' },
              ].map((card, i) => (
                <div key={i} className="rounded-2xl p-4" style={{ backgroundColor: card.color }}>
                  <p className="text-[10px] uppercase tracking-widest text-[#2D2A26]/50 font-bold mb-3">{card.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {card.options.map((opt, j) => (
                      <span
                        key={j}
                        className={`text-[11px] px-2 py-1 rounded-full border font-medium transition-colors ${j === 0 ? 'bg-[#1A4B21] text-white border-[#1A4B21]' : 'text-[#2D2A26]/60 border-[#2D2A26]/20'}`}
                      >
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
