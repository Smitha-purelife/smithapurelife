import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const cardY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const cardZ = useTransform(scrollYProgress, [0, 0.5, 1], [20, 100, 20]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <section id="story" ref={containerRef} className="section-padding bg-bg relative overflow-hidden" style={{ perspective: '1000px' }}>
      <div className="max-width">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image Side */}
          <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
            <motion.div 
              style={{ y: imgY, translateZ: -50 }}
              className="aspect-[4/5] rounded-[40px] overflow-hidden bg-white/40 shadow-2xl"
            >
              <img 
                src="/products/image copy 5.png" 
                alt="Natural Heritage"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110"
              />
            </motion.div>
            
            {/* Floating Card */}
            <motion.div 
              style={{ 
                y: cardY, 
                z: cardZ,
                rotateZ: cardRotate,
                transformStyle: 'preserve-3d'
              }}
              className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] max-w-[240px] z-20"
            >
              <p className="serif-title text-5xl text-accent mb-2">15+</p>
              <p className="font-body text-[10px] tracking-[0.2em] uppercase text-text/60">
                Years of botanical research and heritage
              </p>
            </motion.div>
          </div>

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

