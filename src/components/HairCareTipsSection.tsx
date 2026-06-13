import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  ShieldCheck, 
  Droplet, 
  Moon, 
  Utensils, 
  Heart, 
  Smile, 
  Scissors, 
  Flame, 
  Sparkles, 
  Sun, 
  Wind, 
  CalendarCheck 
} from 'lucide-react';

export default function HairCareTipsSection() {
  const tips = [
    {
      text: "Avoid harsh chemical-based hair products whenever possible and choose natural hair care alternatives.",
      icon: ShieldCheck,
      color: "bg-emerald-50 text-emerald-700 border-emerald-100"
    },
    {
      text: "Drink enough water daily.",
      icon: Droplet,
      color: "bg-sky-50 text-sky-700 border-sky-100"
    },
    {
      text: "Sleep 7–8 hours every night.",
      icon: Moon,
      color: "bg-indigo-50 text-indigo-700 border-indigo-100"
    },
    {
      text: "Eat protein-rich foods regularly.",
      icon: Utensils,
      color: "bg-amber-50 text-amber-700 border-amber-100"
    },
    {
      text: "Include iron-rich foods in your diet.",
      icon: Heart,
      color: "bg-rose-50 text-rose-700 border-rose-100"
    },
    {
      text: "Manage stress for healthier hair.",
      icon: Smile,
      color: "bg-teal-50 text-teal-700 border-teal-100"
    },
    {
      text: "Trim split ends regularly.",
      icon: Scissors,
      color: "bg-gray-50 text-gray-700 border-gray-100"
    },
    {
      text: "Avoid excessive heat styling.",
      icon: Flame,
      color: "bg-orange-50 text-orange-700 border-orange-100"
    },
    {
      text: "Keep your scalp clean and healthy.",
      icon: Sparkles,
      color: "bg-violet-50 text-violet-700 border-violet-100"
    },
    {
      text: "Protect your hair from excessive sun exposure.",
      icon: Sun,
      color: "bg-yellow-50 text-yellow-700 border-yellow-100"
    },
    {
      text: "Be gentle while detangling wet hair.",
      icon: Wind,
      color: "bg-cyan-50 text-cyan-700 border-cyan-100"
    },
    {
      text: "Consistency is key — regular hair care gives the best long-term results.",
      icon: CalendarCheck,
      color: "bg-green-50 text-green-700 border-green-100"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 120, damping: 15 } }
  };

  return (
    <section className="py-20 md:py-28 bg-[#FAF9F5]/40 border-t border-[#052B08]/5 relative overflow-hidden">
      {/* Background Decorative Elemements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#CDD5AE]/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#E9D5CA]/15 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex p-3 rounded-full bg-[#052B08]/5 text-[#052B08] mb-4 shadow-inner border border-[#052B08]/5"
          >
            <Lightbulb size={24} className="animate-pulse" />
          </motion.div>
          <span className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#FF7B89] mb-2 block">Aesthetic Rituals</span>
          <h2 className="serif-title text-3xl sm:text-4xl md:text-5xl text-[#052B08]">Daily Hair Care Tips</h2>
          <div className="w-12 h-1 bg-[#FF7B89] mx-auto mt-4 rounded-full opacity-60" />
        </div>

        {/* Tips Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tips.map((tip, idx) => {
            const Icon = tip.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-black/5 shadow-xs hover:shadow-lg transition-all duration-300 flex items-start gap-4 text-left group"
              >
                {/* Icon Wrapper */}
                <div className={`p-3 rounded-xl border shrink-0 transition-transform duration-300 group-hover:scale-110 ${tip.color}`}>
                  <Icon size={18} />
                </div>
                
                {/* Text Content */}
                <div className="flex flex-col justify-center">
                  <p className="text-xs sm:text-[13px] text-[#052B08]/85 leading-relaxed font-semibold">
                    {tip.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
