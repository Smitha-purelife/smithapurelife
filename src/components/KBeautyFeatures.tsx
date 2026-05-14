import { motion } from 'framer-motion';

export default function KBeautyFeatures() {
  const features = [
    { title: "AVOCADO GOODNESS", desc: "Deeply nourishes & strengthens hair from root to tip." },
    { title: "35 POTENT HERBS", desc: "A unique blend of herbs that promotes growth & reduces hair fall." },
    { title: "DEEP NOURISHMENT", desc: "Penetrates deep into scalp to restore moisture and improve texture." },
    { title: "NATURAL & SAFE", desc: "Free from harmful chemicals, sulfates & parabens." }
  ];

  return (
    <section className="bg-[#F8F6F0] py-12 border-y border-[#052B08]/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex gap-4 items-start"
            >
              <div className="w-12 h-12 rounded-full bg-[#1A4B21]/10 flex-shrink-0 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-[#1A4B21]/20" />
              </div>
              <div>
                <h4 className="text-[#1A4B21] font-bold text-xs uppercase tracking-wider mb-2">{feat.title}</h4>
                <p className="text-[#2D2A26]/70 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
