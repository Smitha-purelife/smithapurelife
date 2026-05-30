import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Heart, Sparkles, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

export default function AboutPage() {
  return (
    <div className="bg-[#F5F7F5] min-h-screen pt-24 text-left">
      
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden py-20 bg-[#C1CDBF]/40 border-b border-black/5">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #1A4B21 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-[#1A4B21] font-bold mb-4 block"
          >
            Our Philosophy & Sourcing
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#2D2A26] leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Where Traditional Ayurveda <br className="hidden sm:inline" />
            Meets <span className="italic text-[#1A4B21]">K-Beauty Science</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm md:text-base text-[#2D2A26]/70 mt-6 max-w-xl mx-auto leading-relaxed"
          >
            Smitha Purelife was founded on a simple promise: to elevate clean hair wellness to high-fashion editorial standards, blending time-tested Ayurvedic remedies with ultra-refined Korean sensory textures.
          </motion.p>
        </div>
      </section>

      {/* ─── Narrative Story block ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Story text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="text-[10px] font-bold text-[#FF7B89] uppercase tracking-widest block">The Genesis</span>
              <h2 className="text-3xl md:text-4xl font-serif text-[#2D2A26] leading-tight">
                Our Quest for Pure, Sensorially Rich Hair Solutions
              </h2>
              <p className="text-xs sm:text-sm text-[#2D2A26]/70 leading-relaxed">
                Traditional hair treatments are often heavy, greasy, and difficult to wash off. Meanwhile, conventional cosmetic formulas rely on harsh chemical fillers that temporarily mask damage while causing long-term follicle degradation.
              </p>
              <p className="text-xs sm:text-sm text-[#2D2A26]/70 leading-relaxed">
                We sought a third way. By partnering with leading trichologists in Seoul and traditional Ayurvedic vaidyas in India, we engineered formulas that deliver maximum root nourishment using lightweight, fast-absorbing textures. The result is a clean botanical line that leaves your scalp balanced and your strands looking sensorially rich and glossy.
              </p>

              <div className="pt-4">
                <Link to="/#trending">
                  <button className="flex items-center gap-2 bg-[#1A4B21] text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#0f2e14] transition-all shadow-xs active:scale-95">
                    Explore Our Catalog <ArrowRight size={13} />
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Story visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-video lg:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-lg border border-[#2D2A26]/5 bg-[#F5F7F5] flex items-center justify-center p-8"
            >
              <div className="absolute inset-0 bg-[#EBF3EB] opacity-60 pointer-events-none" />
              <img 
                src="/products/combos_icon.jpg" 
                alt="Ayurvedic Botanicals" 
                className="w-[85%] h-[85%] object-contain mix-blend-multiply z-10 relative hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── Formulation Pillars ─── */}
      <section className="py-20 bg-[#F5F7F5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#1A4B21] block mb-2">Our Standards</span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#2D2A26]" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Smitha Purelife Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sprout className="text-[#1A4B21]" size={24} />,
                title: 'Wild-Harvested Potency',
                desc: 'We source only wild-harvested herbs, cold-pressed seed oils, and premium quality satin fabrics to guarantee structural integrity and scalp-level safety.',
                bg: '#DDF1E9'
              },
              {
                icon: <Sparkles className="text-[#1A4B21]" size={24} />,
                title: 'Sensory Texture Innovation',
                desc: 'Every lotion, serum, and oil is engineered for rapid dermal absorption. No sticky residues, no synthetic silicones, just instant silken weightlessness.',
                bg: '#FAF3EE'
              },
              {
                icon: <ShieldCheck className="text-[#1A4B21]" size={24} />,
                title: 'Clinical Efficacy & Trust',
                desc: 'Our botanical ratios are meticulously standardized and dermatologically tested to treat extreme frizz, excessive hair fall, and follicle thinning organically.',
                bg: '#EBF3EB'
              }
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="p-8 rounded-[2rem] border border-black/5 flex flex-col items-start gap-4 transition-all duration-300 hover:shadow-md hover:bg-white"
                style={{ backgroundColor: value.bg + '60' }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-xs">
                  {value.icon}
                </div>
                <h3 className="text-lg font-serif font-bold text-[#2D2A26] mt-2">{value.title}</h3>
                <p className="text-xs text-[#2D2A26]/75 leading-relaxed text-left">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Ingredients Spotlight ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto mb-14">
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#FF7B89] block mb-2">Clean Formulas</span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#2D2A26] mb-4">
              Pure Ingredients, Zero Compromises
            </h2>
            <p className="text-xs sm:text-sm text-[#2D2A26]/70 leading-relaxed">
              We list every single ingredient because we are proud of our transparency. We do not use parabens, phthalates, synthetic fragrances, silicones, sulfates, or artificial colors.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Cold-Pressed Avocado', benefit: 'Fatty acid repair', tag: 'Conditioner' },
              { name: 'Marshmallow Root', benefit: 'Sensory hair slip', tag: 'Serum / Scalp' },
              { name: 'Golden Jojoba Oil', benefit: 'Seals moisture barrier', tag: 'Hair Oil' },
              { name: 'Pure Satin Silk', benefit: 'Frictionless sleep', tag: 'Essentials' }
            ].map((ing, i) => (
              <div 
                key={i}
                className="bg-[#FAF9F5] border border-[#2D2A26]/5 rounded-2xl p-6 transition-all duration-300 hover:shadow-md text-left flex flex-col justify-between"
              >
                <div>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-[#1A4B21] px-2 py-0.5 rounded bg-[#EEF7EE] inline-block mb-3">
                    {ing.tag}
                  </span>
                  <h4 className="font-serif text-base text-[#2D2A26] font-bold leading-tight mb-1">{ing.name}</h4>
                </div>
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mt-4">{ing.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
