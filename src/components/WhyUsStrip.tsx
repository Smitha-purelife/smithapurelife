import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, FlaskConical, Truck, RotateCcw, Star } from 'lucide-react';

const pillars = [
  { icon: Leaf, label: '100% Botanical', desc: 'No sulphates, parabens or harmful chemicals — ever.' },
  { icon: FlaskConical, label: 'Clinically Tested', desc: 'Every formula verified for efficacy and safety.' },
  { icon: ShieldCheck, label: 'Dermatologist Approved', desc: 'Recommended for all scalp types including sensitive.' },
  { icon: Star, label: '50,000+ Happy Customers', desc: 'India\'s growing community of natural hair believers.' },
  { icon: Truck, label: 'Free Shipping ₹499+', desc: 'Pan-India delivery within 3–5 business days.' },
  { icon: RotateCcw, label: 'Easy 30-Day Returns', desc: 'Not happy? Return with zero questions asked.' },
];

export default function WhyUsStrip() {
  return (
    <section className="bg-[#1A4B21] py-14">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-white/60 text-[11px] uppercase tracking-[0.4em] font-bold mb-12"
        >
          Why Smitha Purelife
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {pillars.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="flex flex-col items-center text-center gap-3 group"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#FF7B89]/20 transition-colors duration-300">
                <Icon size={20} className="text-[#F8CD71]" />
              </div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wide leading-tight">{label}</h4>
              <p className="text-white/50 text-[11px] leading-relaxed hidden lg:block">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
