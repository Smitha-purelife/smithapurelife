import { motion } from 'framer-motion';
import { Leaf, TestTube, ShieldCheck, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: '35 Potent Herbs',
    desc: 'Each formula contains a minimum of 35 ethically-sourced botanicals, cold-processed to preserve maximum potency.',
    color: '#DDF1E9',
  },
  {
    icon: TestTube,
    title: 'Clinically Proven',
    desc: 'Every product is dermatologist-tested, patch-tested, and backed by clinical studies for visible results.',
    color: '#F9F3CC',
  },
  {
    icon: ShieldCheck,
    title: 'Zero Harmful Chemicals',
    desc: 'Free from sulphates, parabens, silicones, mineral oils, SLS, SLES, and synthetic fragrances. Always.',
    color: '#DBCDF0',
  },
  {
    icon: Sparkles,
    title: 'Results in 14 Days',
    desc: '94% of users in our clinical study reported a visible difference in hair texture and scalp health within two weeks.',
    color: '#E9D5CA',
  },
];

export default function KBeautyFeatures() {
  return (
    <section className="bg-white py-20 border-y border-[#052B08]/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[11px] uppercase tracking-[0.4em] text-[#1A4B21] font-bold mb-3"
          >
            The Smitha Purelife Promise
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-[#2D2A26]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Science meets<br />
            <span className="italic text-[#1A4B21]">ancient botanicals</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl p-7 flex flex-col gap-4 hover:shadow-lg transition-all duration-300"
                style={{ backgroundColor: feat.color }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#1A4B21]/10 flex items-center justify-center">
                  <Icon size={22} className="text-[#1A4B21]" />
                </div>
                <h4 className="text-[#1A4B21] font-bold text-base">{feat.title}</h4>
                <p className="text-[#2D2A26]/70 text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
