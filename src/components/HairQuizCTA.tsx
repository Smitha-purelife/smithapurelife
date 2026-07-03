import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, ShoppingBag, Sparkles, Check } from 'lucide-react';
import { products } from '../data/products';

interface QuizQuestion {
  id: 'texture' | 'scalp' | 'concern' | 'goal';
  label: string;
  question: string;
  description: string;
  options: { value: string; label: string; emoji: string }[];
  color: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'texture',
    label: 'Hair Texture',
    question: 'How would you describe your hair texture?',
    description: 'Knowing your hair texture helps us recommend formulas with the perfect weight and level of absorption.',
    color: '#DDF1E9',
    options: [
      { value: 'Fine', label: 'Fine & Thin', emoji: '🌱' },
      { value: 'Medium', label: 'Medium / Normal', emoji: '🌿' },
      { value: 'Thick', label: 'Thick & Coarse', emoji: '🌳' },
      { value: 'Coarse', label: 'Curly / Textured', emoji: '🌀' }
    ]
  },
  {
    id: 'scalp',
    label: 'Scalp Type',
    question: 'What is your primary scalp condition?',
    description: 'Healthy hair begins at the roots. Select the option that best describes your scalp daily behavior.',
    color: '#F9F3CC',
    options: [
      { value: 'Oily', label: 'Oily & Shiny', emoji: '💧' },
      { value: 'Dry', label: 'Dry & Flaky', emoji: '🍂' },
      { value: 'Normal', label: 'Balanced / Normal', emoji: '✨' },
      { value: 'Sensitive', label: 'Sensitive / Irritated', emoji: '🌸' }
    ]
  },
  {
    id: 'concern',
    label: 'Main Concern',
    question: 'What is your primary hair concern right now?',
    description: 'This is the focus of your custom ritual. We will recommend active herbal extracts to rescue your scalp.',
    color: '#DBCDF0',
    options: [
      { value: 'Hair Fall', label: 'Excessive Hair Fall', emoji: '📉' },
      { value: 'Bald Spot', label: 'Bald Spot / Receding', emoji: '🦲' },
      { value: 'Thinning Areas', label: 'Thinning Areas', emoji: '🌾' },
      { value: 'Open Scalp', label: 'Open Scalp', emoji: '🔍' },
      { value: 'Visible Scalp', label: 'Visible Scalp Areas', emoji: '🔎' },
      { value: 'Frizz', label: 'Dry & Frizzy Hair', emoji: '💨' },
      { value: 'Growth', label: 'Growth & Thickness', emoji: '🚀' },
      { value: 'Dandruff', label: 'Dandruff & Scalp Care', emoji: '❄️' }
    ]
  },
  {
    id: 'goal',
    label: 'Your Goal',
    question: 'What is your primary goal for your hair?',
    description: 'Select your dream aesthetic result. We will make sure your custom routine drives towards this goal.',
    color: '#E9D5CA',
    options: [
      { value: 'Repair', label: 'Damaged Hair Repair', emoji: '🩹' },
      { value: 'Hydrate', label: 'Deep Hydration & Silkiness', emoji: '🌊' },
      { value: 'Strengthen', label: 'Root Strength & Thickness', emoji: '💪' },
      { value: 'Shine', label: 'Natural Gloss & Radiance', emoji: '✨' }
    ]
  }
];

export default function HairQuizCTA() {
  const steps = [
    { num: '01', label: 'Tell us about your hair' },
    { num: '02', label: 'Share your concerns' },
    { num: '03', label: 'Get your ritual' },
  ];

  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0 to 4 (4 is results)
  const [answers, setAnswers] = useState<Record<string, string>>({
    texture: '',
    scalp: '',
    concern: '',
    goal: ''
  });

  const handleSelectOption = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 300);
  };

  const handleResetQuiz = () => {
    setAnswers({ texture: '', scalp: '', concern: '', goal: '' });
    setCurrentStep(0);
  };

  // Dynamic Personalized Ritual Matching Logic
  const getRecommendedRitual = () => {
    const { concern, goal } = answers;
    
    // Default recommendations based on concern or goal
    if (concern === 'Frizz') {
      return {
        title: 'Frizz Control & Smoothness Ritual',
        description: 'A deep conditioning and smoothening treatment formulated to lock in moisture, block out humidity, and restore silky elasticity.',
        products: ['avosilk-bloom', 'pro-repair-serum', 'satin-scrunchies']
      };
    }
    if (concern === 'Hair Fall' || concern === 'Bald Spot' || concern === 'Thinning Areas' || concern === 'Open Scalp' || concern === 'Visible Scalp') {
      return {
        title: 'Hair Fall & Regrowth Rescue Ritual',
        description: 'An intensive root strengthening and follicle activation routine that prevents breakage, stimulates dormant areas, and balances your scalp environment.',
        products: ['radiance-oil', 'herbal-wash', 'follicra-regrowth']
      };
    }
    if (concern === 'Growth') {
      return {
        title: 'Intensive Growth & Volume Ritual',
        description: 'Ayurvedic formulations focused on boosting blood circulation in the scalp, increasing hair density, and fostering thick, shiny strands.',
        products: ['radiance-oil', 'follicra-regrowth', 'satin-pillowcase']
      };
    }
    if (concern === 'Dandruff') {
      return {
        title: 'Dandruff Cleanse & Balance Ritual',
        description: 'A pure herbal purification cleanse that eliminates flaky buildup, balances natural scalp oils, and soothes itchiness organically.',
        products: ['herbal-wash', 'radiance-oil', 'satin-scrunchies']
      };
    }
    if (goal === 'Repair') {
      return {
        title: 'Overnight Structural Damage Repair Ritual',
        description: 'A high-potency protein and lipid replacement therapy that detangles instantly and rebuilds broken structural bonds within the hair shaft.',
        products: ['avosilk-bloom', 'pro-repair-serum', 'radiance-oil']
      };
    }
    
    // Fallback: Premium Daily Maintenance Ritual
    return {
      title: 'Botanical Harmony Maintenance Ritual',
      description: 'The ultimate daily care routine to preserve hair elasticity, cleanse without harsh sulfates, and keep your strands glossy and hydrated.',
      products: ['radiance-oil', 'herbal-wash', 'avosilk-bloom']
    };
  };

  // Bulk add recommended products to the shopping bag
  const handleAddRitualToBag = (recommendedIds: string[]) => {
    try {
      const existing = localStorage.getItem('smitha_purelife_cart');
      let cart = existing ? JSON.parse(existing) : [];

      recommendedIds.forEach(prodId => {
        const prod = products.find(p => p.id === prodId);
        if (prod) {
          const defaultSize = prod.sizes[0];
          const cartId = `${prod.id}-${defaultSize.size}`;
          const existingIndex = cart.findIndex((item: any) => item.cartId === cartId);
          if (existingIndex > -1) {
            cart[existingIndex].quantity += 1;
          } else {
            cart.push({
              cartId,
              productId: prod.id,
              size: defaultSize.size,
              price: defaultSize.price,
              quantity: 1
            });
          }
        }
      });

      localStorage.setItem('smitha_purelife_cart', JSON.stringify(cart));
      localStorage.setItem('smitha_purelife_cart_auto_open', 'true');
      window.dispatchEvent(new Event('cart-updated'));
      setIsQuizOpen(false);
    } catch (e) {
      console.error("Failed to add quiz ritual to bag:", e);
    }
  };

  const currentQuestion = quizQuestions[currentStep];
  const matchedRitual = currentStep === 4 ? getRecommendedRitual() : null;
  const ritualPrice = matchedRitual 
    ? matchedRitual.products.reduce((acc, pId) => {
        const prod = products.find(p => p.id === pId);
        return acc + (prod ? prod.sizes[0].price : 0);
      }, 0)
    : 0;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #1A4B21 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-[#EBF3EB] rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 md:p-16 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Left Block */}
          <div className="text-left">
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

            {/* Quiz Step Checklist representation */}
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
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  handleResetQuiz();
                  setIsQuizOpen(true);
                }}
                className="bg-[#1A4B21] text-white px-8 py-4 rounded-full font-bold tracking-widest uppercase text-xs flex items-center gap-3 hover:bg-[#052B08] transition-colors shadow-lg cursor-pointer"
              >
                Take the Hair Quiz
                <ArrowRight size={16} />
              </motion.button>
            </motion.div>
          </div>

          {/* Right Column: Dynamic choices representation cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative cursor-pointer"
            onClick={() => {
              handleResetQuiz();
              setIsQuizOpen(true);
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Hair Texture', options: ['Fine', 'Medium', 'Thick', 'Coarse'], color: '#DDF1E9' },
                { label: 'Scalp Type', options: ['Oily', 'Dry', 'Normal', 'Sensitive'], color: '#F9F3CC' },
                { label: 'Main Concern', options: ['Hair Fall', 'Bald Spot', 'Thinning Areas', 'Open Scalp', 'Visible Scalp', 'Frizz', 'Growth', 'Dandruff'], color: '#DBCDF0' },
                { label: 'Your Goal', options: ['Repair', 'Hydrate', 'Strengthen', 'Shine'], color: '#E9D5CA' },
              ].map((card, i) => (
                <div key={i} className="rounded-2xl p-4 transition-all duration-300 hover:shadow-md" style={{ backgroundColor: card.color }}>
                  <p className="text-[10px] uppercase tracking-widest text-[#2D2A26]/50 font-bold mb-3">{card.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {card.options.map((opt, j) => (
                      <span
                        key={j}
                        className={`text-[11px] px-2.5 py-1 rounded-full border font-semibold transition-colors ${
                          j === 0 ? 'bg-[#1A4B21] text-white border-[#1A4B21]' : 'text-[#2D2A26]/60 border-[#2D2A26]/20 bg-white/40'
                        }`}
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

      {/* ─── Fully Interactive Hair Quiz Modal ─── */}
      <AnimatePresence>
        {isQuizOpen && (
          <>
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQuizOpen(false)}
              className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm"
            />

            {/* Quiz Container Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-4 top-[8%] bottom-[8%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[650px] md:max-w-full z-[999999] bg-[#FAF8F5] rounded-[2.5rem] shadow-2xl overflow-y-auto md:overflow-hidden flex flex-col border border-black/5"
            >
              
              {/* Modal Header */}
              <div 
                className="p-6 md:p-8 flex justify-between items-center border-b border-[#2D2A26]/5 transition-colors duration-500"
                style={{ backgroundColor: currentStep < 4 ? currentQuestion.color + '45' : '#EBF3EB' }}
              >
                <div className="text-left">
                  <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#1A4B21] block mb-1">
                    {currentStep < 4 ? `Step 0${currentStep + 1} / 04` : 'Ritual Curated'}
                  </span>
                  <h3 className="font-serif text-2xl text-[#2D2A26] font-bold flex items-center gap-2">
                    {currentStep < 4 ? (
                      <>
                        <Sparkles size={18} className="text-[#1A4B21]" />
                        {currentQuestion.label}
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} className="text-[#FF7B89]" />
                        Your Tailored Routine
                      </>
                    )}
                  </h3>
                </div>
                <button
                  onClick={() => setIsQuizOpen(false)}
                  className="p-2 rounded-full hover:bg-black/5 text-gray-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col">
                
                {/* ─── Question Slides ─── */}
                {currentStep < 4 && (
                  <div className="flex-1 flex flex-col justify-between text-left">
                    <div>
                      <h4 className="font-serif text-xl sm:text-2xl text-[#2D2A26] mb-3 leading-snug font-bold">
                        {currentQuestion.question}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-8">
                        {currentQuestion.description}
                      </p>

                      {/* Options Pills */}
                      <div className="grid grid-cols-1 gap-3.5">
                        {currentQuestion.options.map((opt) => {
                          const isSelected = answers[currentQuestion.id] === opt.value;
                          return (
                            <motion.button
                              key={opt.value}
                              whileHover={{ x: 6 }}
                              onClick={() => handleSelectOption(currentQuestion.id, opt.value)}
                              className={`w-full flex items-center justify-between p-4.5 rounded-2xl border text-left transition-all duration-300 ${
                                isSelected 
                                  ? 'bg-[#1A4B21] border-[#1A4B21] text-white shadow-md' 
                                  : 'bg-white border-[#2D2A26]/10 text-[#2D2A26] hover:border-[#1A4B21]/50 hover:bg-[#FAF9F5]'
                              }`}
                            >
                              <div className="flex items-center gap-3.5">
                                <span className="text-2xl">{opt.emoji}</span>
                                <span className="text-xs sm:text-sm font-bold tracking-wide uppercase">{opt.label}</span>
                              </div>
                              {isSelected && <Check size={18} className="text-white" />}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Back / Navigation footer */}
                    {currentStep > 0 && (
                      <button
                        onClick={() => setCurrentStep(prev => prev - 1)}
                        className="text-left text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-[#1A4B21] transition-colors mt-8 inline-block self-start"
                      >
                        ← Back to Previous Step
                      </button>
                    )}
                  </div>
                )}

                {/* ─── Results Showcase Slide ─── */}
                {currentStep === 4 && matchedRitual && (
                  <div className="flex-1 flex flex-col text-left">
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-2">Highly Recommended Custom Treatment:</p>
                    <h4 className="font-serif text-2xl text-[#2D2A26] mb-3 leading-snug font-bold">
                      {matchedRitual.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#2D2A26]/70 leading-relaxed mb-6">
                      {matchedRitual.description}
                    </p>

                    {/* 3 Recommended Products checklist */}
                    <div className="space-y-3 mb-8">
                      {matchedRitual.products.map((prodId, idx) => {
                        const prod = products.find(p => p.id === prodId);
                        if (!prod) return null;

                        return (
                          <div 
                            key={prodId} 
                            className="bg-white rounded-2xl p-3 border border-[#2D2A26]/5 flex items-center gap-4 hover:shadow-xs transition-shadow"
                          >
                            {/* Step Badge */}
                            <span className="w-6 h-6 rounded-full bg-[#1A4B21]/10 text-[#1A4B21] text-[10px] font-bold flex items-center justify-center shrink-0">
                              0{idx + 1}
                            </span>
                            
                            {/* Thumbnail */}
                            <div className="w-12 h-12 bg-[#FAF9F5] rounded-xl overflow-hidden p-1.5 border border-[#2D2A26]/5 shrink-0 flex items-center justify-center">
                              <img src={prod.image} alt={prod.title} className="w-full h-full object-contain mix-blend-multiply" />
                            </div>

                            {/* Text Info */}
                            <div className="flex-1 min-w-0">
                              <h5 className="font-serif text-sm text-[#2D2A26] font-bold truncate leading-tight">{prod.title}</h5>
                              <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">{prod.subtitle} • {prod.sizes[0].size}</p>
                            </div>

                            {/* Price */}
                            <span className="font-bold text-xs sm:text-sm text-[#2D2A26] pr-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                              ₹{prod.sizes[0].price}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Grand Buy Button */}
                    <div className="mt-auto bg-[#EBF3EBF5] border border-[#1A4B21]/15 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-left w-full sm:w-auto">
                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block">Total Ritual Routine Price</span>
                        <span className="font-bold text-2xl text-[#2D2A26]" style={{ fontFamily: "'Inter', sans-serif" }}>
                          ₹{ritualPrice.toLocaleString()}
                        </span>
                        <span className="text-[9px] text-[#1A4B21] font-semibold block uppercase tracking-wider mt-0.5">Shipping: UPI ₹70 | COD ₹110</span>
                      </div>

                      <button
                        onClick={() => handleAddRitualToBag(matchedRitual.products)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1A4B21] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#0f2e14] transition-all shadow-md hover:shadow-lg active:scale-95 shrink-0 cursor-pointer"
                      >
                        Add Ritual to Bag <ShoppingBag size={14} />
                      </button>
                    </div>

                    {/* Reset Button */}
                    <button
                      onClick={handleResetQuiz}
                      className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-[#1A4B21] transition-colors mt-6 underline"
                    >
                      Retake the Hair Quiz
                    </button>
                  </div>
                )}

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
