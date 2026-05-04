import { motion } from 'framer-motion';

export default function StorySection() {
  return (
    <section id="story" className="section-padding bg-bg relative overflow-hidden">
      <div className="max-width">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden bg-white/40">
              <img 
                src="/products/image copy 5.png" 
                alt="Natural Heritage"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            
            {/* Floating Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-xl max-w-[240px]"
            >
              <p className="serif-title text-5xl text-accent mb-2">15+</p>
              <p className="font-body text-[10px] tracking-[0.2em] uppercase text-text/60">
                Years of botanical research and heritage
              </p>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <div className="max-w-xl">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-body text-[10px] tracking-[0.4em] uppercase text-accent font-semibold mb-6"
            >
              Our Heritage
            </motion.p>
            
            <div className="overflow-hidden">
              <motion.h2 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="serif-title text-5xl md:text-7xl text-text mb-8"
              >
                Where nature meets <br />
                <span className="italic opacity-60">modern ritual.</span>
              </motion.h2>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <p className="font-body text-text/70 text-lg leading-relaxed">
                Born from a passion for holistic well-being, Smitha Purelife has been at the forefront of natural hair care innovation. We believe that true beauty starts with the purity of nature.
              </p>
              <p className="font-body text-text/70 text-lg leading-relaxed">
                Each product is a culmination of years of research, sourcing only the finest cold-pressed oils and herbal extracts from sustainable local farms. Our mission is to provide clean, effective solutions.
              </p>
            </motion.div>

            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-text/10">
              {[
                { label: 'Natural', value: '100%' },
                { label: 'Botanicals', value: '25+' },
                { label: 'Happy Souls', value: '10k+' }
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <p className="serif-title text-3xl text-text mb-1">{stat.value}</p>
                  <p className="font-body text-[9px] tracking-[0.2em] uppercase text-text/40">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

