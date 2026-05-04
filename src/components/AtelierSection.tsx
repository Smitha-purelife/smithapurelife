import { motion } from 'framer-motion';

const process = [
  { step: '01', title: 'Sourcing', description: 'We source the purest cold-pressed oils and organic botanicals from sustainable local farms.' },
  { step: '02', title: 'Blending', description: 'Our experts carefully blend these natural essences using traditional methods to ensure maximum potency.' },
  { step: '03', title: 'Infusion', description: 'The formulas are allowed to sit, letting the botanical extracts fully infuse with the carrier oils.' },
  { step: '04', title: 'Quality Check', description: 'Every batch is hand-inspected to ensure it meets our rigorous standards for purity.' },
];

export default function AtelierSection() {
  return (
    <section id="atelier" className="section-padding bg-bg">
      <div className="max-width">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-body text-[10px] tracking-[0.4em] uppercase text-accent font-semibold mb-6"
            >
              The Atelier
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="serif-title text-5xl md:text-7xl text-text mb-12"
            >
              Crafted with <br />
              <span className="italic opacity-60">precision.</span>
            </motion.h2>
            
            <div className="space-y-6">
              {process.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-8 group"
                >
                  <span className="serif-title text-4xl text-text/10 group-hover:text-accent transition-colors duration-500">{item.step}</span>
                  <div>
                    <h3 className="serif-title text-2xl text-text mb-2">{item.title}</h3>
                    <p className="font-body text-sm text-text/60 leading-relaxed max-w-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-square rounded-full border border-text/5 flex items-center justify-center p-12">
              <div className="absolute inset-0 border border-dashed border-text/10 rounded-full animate-[spin_60s_linear_infinite]" />
              <div className="w-full h-full rounded-full overflow-hidden bg-white/40">
                <img 
                  src="/products/image copy 5.png" 
                  alt="Craftsmanship"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
            </div>
            
            {/* Floating Badges */}
            <div className="absolute top-10 right-0 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl">
              <p className="font-body text-[9px] tracking-[0.2em] uppercase text-text font-bold">Hand-crafted Batch</p>
            </div>
            <div className="absolute bottom-10 left-0 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl">
              <p className="font-body text-[9px] tracking-[0.2em] uppercase text-text font-bold">100% Organic</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
