import { useParams, Link } from 'react-router-dom';
import { motion, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, memo, useCallback } from 'react';
import { products } from '../data/products';
import { ArrowLeft, ArrowRight, Sparkles, Camera, X, Star, Check, ChevronDown, ChevronUp } from 'lucide-react';
import ComparisonSection from './ComparisonSection';
import TransformationsGallery from './TransformationsGallery';

// Interactive Floating Particle Component
const FloatingDebris = memo(({ index }: { index: number }) => {
  return (
    <motion.div
      animate={{ 
        y: [0, -40, 0],
        x: [0, index % 2 === 0 ? 20 : -20, 0],
        rotate: [0, 360],
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.3, 0.1]
      }}
      transition={{ 
        duration: 5 + index * 2, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: index * 0.5
      }}
      className="absolute w-4 h-4 rounded-full bg-accent/20 blur-[1px]"
      style={{
        left: `${20 + (index * 20) % 60}%`,
        top: `${10 + (index * 15) % 80}%`,
      }}
    />
  );
});

// ─── Customer Review Types ──────────────────────────────────────────────────
interface CustomerReview {
  id?: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  photos?: string[]; // base64 data URLs
  verified?: boolean;
}

const productDetailData: Record<string, {
  benefits: string[];
  reviews: CustomerReview[];
}> = {
  'avosilk-bloom': {
    benefits: [
      'Deeply Hydrates Dry & Brittle Hair (Avocado)',
      'Strengthens and Softens Hair (Almond)',
      'Locks in Deep Moisture (Shea Butter)',
      'Adds Shine, Silkiness & Tames Frizz (Argan Oil)',
      'Supports Healthy Hair Growth (Rosemary)'
    ],
    reviews: [
      { name: 'R. S.', rating: 5, text: 'This avocado conditioner works wonders on my dry frizzy ends! I leave it on for 5 mins and my hair is incredibly smooth and detangled.', date: '2 weeks ago' },
      { name: 'K. K.', rating: 5, text: 'Amazing hydration without weighting my hair down. The scent is very premium and natural.', date: '1 month ago' },
      { name: 'P. G.', rating: 4, text: 'Love the thick texture. My hair cuticles feel very sealed and protected.', date: '3 days ago' }
    ]
  },
  'radiance-oil': {
    benefits: [
      'Controls Hair Fall & Dandruff in 1st Wash',
      'Boosts Hair Growth & Root Strength',
      'Repairs Dry, Damaged Hair',
      'Adds Natural Shine & Smoothness',
      '100% Natural, Handcrafted With Care'
    ],
    reviews: [
      { name: 'Verified Customer', rating: 5, text: 'Thank you so much sister.. it\'s a wow product really! I can see my hair development without dandruff and hairfall. This product perfectly suited to my hair and within 1 month I saw my hair\'s results. It was easy and smoothen to apply and has a lovely fragrance.', date: '1 month ago' },
      { name: 'H. S.', rating: 5, text: 'Visible hair fall reduction in 3 weeks! My scalp feels nourished and healthy. I massage it slightly warm as recommended.', date: '1 week ago' },
      { name: 'S. M.', rating: 5, text: 'Non-greasy but very deep action. Smells botanical and has definitely improved my hair density.', date: '3 weeks ago' },
      { name: 'A. R.', rating: 5, text: 'Excellent oil. Reduces dryness and flaky scalp completely.', date: '2 months ago' }
    ]
  },
  'herbal-wash': {
    benefits: [
      'Reduces Hair Fall in 40 Days',
      'Clears Dandruff from the 1st Wash',
      'Makes Hair Silky, Smooth & Strong',
      '100% Natural & Handmade with 20+ Herbs'
    ],
    reviews: [
      { name: 'G. K.', rating: 5, text: 'No chemicals, just pure natural therapy! Cleanses oily scalp completely and leaves a fresh natural bounce.', date: '5 days ago' },
      { name: 'N. P.', rating: 5, text: 'My dandruff is completely gone after 3 washes. I mix it with water to a paste. Love this traditional wash.', date: '1 month ago' },
      { name: 'V. S.', rating: 4, text: 'Excellent natural alternative to chemical shampoos. Scalp feels very healthy.', date: '2 weeks ago' }
    ]
  },
  'pro-repair-serum': {
    benefits: [
      'Gives Instant Soft, Shiny & Spongy Feel',
      'Repairs Damaged Hair & Split Ends',
      'Creates Smooth, Glossy & Frizz-Free Hair',
      'Forms a 100% Natural Protective Coat',
      'Lightweight, Non-Sticky Finish'
    ],
    reviews: [
      { name: 'S. P.', rating: 5, text: 'Just 2 drops after air-drying gives a gorgeous mirror shine! Frizz is completely gone.', date: 'Yesterday' },
      { name: 'M. R.', rating: 5, text: 'Amazing slip! It makes combing through my damp hair so easy. Very lightweight.', date: '2 weeks ago' },
      { name: 'D. K.', rating: 5, text: 'Smells heavenly and works like magic on frizzy weather.', date: '1 month ago' }
    ]
  },
  'follicra-regrowth': {
    benefits: [
      'Baby Hairs Start Appearing in Thinning Areas',
      'Hair Fall Gradually Reduces',
      'Weak Hair Roots Feel Stronger',
      'Scalp Feels Healthier, Calmer & Nourished',
      'Hair Looks Fuller and More Alive'
    ],
    reviews: [
      { name: 'S. B.', rating: 5, text: 'Highly recommend this Ayurvedic serum. Visible root activation on my crown within 2 months.', date: '1 month ago' },
      { name: 'R. V.', rating: 5, text: 'Non-sticky formula that is easy to apply. Hair feels much stronger at the roots.', date: '3 weeks ago' },
      { name: 'P. S.', rating: 5, text: 'Noticeable reduction in scalp showing. New baby hairs are growing.', date: '2 months ago' }
    ]
  },
  'satin-pillowcase': {
    benefits: [
      'Frictionless Silk Sleep',
      'Prevents Hair Breakage & Frizz',
      'Gentle on Sensitive Skin',
      'Retains Dermal Moisture'
    ],
    reviews: [
      { name: 'A. S.', rating: 5, text: 'My hair is so smooth in the morning! No more wake-up knots or frizz. Feels very cool to sleep on.', date: '3 days ago' },
      { name: 'J. B.', rating: 5, text: 'My skin creases are gone! This is a must-have beauty accessory.', date: '1 month ago' },
      { name: 'S. K.', rating: 5, text: 'Premium fabric, washes well and works perfectly for frizz control.', date: '2 weeks ago' }
    ]
  },
  'satin-scrunchies': {
    benefits: [
      'Zero Crease Hold',
      'Prevents Tension Headaches',
      'Reduces Hair Snagging',
      'Premium Satin Slip'
    ],
    reviews: [
      { name: 'A. P.', rating: 5, text: 'Super soft scrunchies that hold my bun perfectly without pulling. No headaches!', date: '1 week ago' },
      { name: 'R. V.', rating: 5, text: 'Zero breakage when taking them out. Beautiful pastel shades.', date: '3 weeks ago' },
      { name: 'T. S.', rating: 4, text: 'Very gentle hold, perfect for overnight hair protection.', date: '1 month ago' }
    ]
  }
};

const ritualSteps = [
  {
    step: 1,
    title: 'Apply Hair Oil',
    targetProducts: ['radiance-oil'],
    bulletPoints: [
      'Warm the oil slightly.',
      'Apply it to your scalp and hair lengths.',
      'Massage gently for 5 minutes.',
      'Leave it on for 1 to 1.5 hours.'
    ]
  },
  {
    step: 2,
    title: 'Wash with Herbal Hair Wash Powder',
    targetProducts: ['herbal-wash'],
    bulletPoints: [
      'Mix the powder with enough water to make a smooth paste.',
      'Wet your hair and scalp well with water.',
      'Apply the paste gently and massage lightly.',
      'Rinse thoroughly with water.'
    ]
  },
  {
    step: 3,
    title: 'Apply Avocado Conditioner',
    targetProducts: ['avosilk-bloom'],
    bulletPoints: [
      'After rinsing, squeeze out extra water from your hair.',
      'Apply conditioner only on hair lengths and mid-ends (not on scalp).',
      'Leave it on for 5-10 minutes.',
      'Rinse with normal water.'
    ]
  },
  {
    step: 4,
    title: 'Dry Naturally',
    targetProducts: [],
    bulletPoints: [
      'Let your hair air-dry naturally under sunlight.'
    ]
  },
  {
    step: 5,
    title: 'Apply Smooth Serum',
    targetProducts: ['pro-repair-serum'],
    bulletPoints: [
      'Take 1-3 drops of serum.',
      'Rub the serum between your palms to warm it.',
      'Apply to dry or damp hair (about 70-75% dry).',
      'Apply from mid-lengths to ends.',
      'Use a wide-tooth comb for even distribution.',
      'Also use at night before bedtime for best results and wake up with smoother, silkier, healthier-looking hair.'
    ]
  },
  {
    step: 6,
    title: 'Apply Follicra Serum',
    targetProducts: ['follicra-regrowth'],
    bulletPoints: [
      'Apply a few drops of Follicra serum directly to the scalp, focusing on thinning areas.',
      'Massage gently with fingertips in circular motions for 2-3 minutes.',
      'Do not rinse out; leave it on to stimulate hair follicles.',
      'Use daily (preferably at night) for best results.'
    ]
  },
  {
    step: 7,
    title: 'Use Satin Scrunchie',
    targetProducts: ['satin-scrunchies'],
    bulletPoints: [
      'Gently tie your hair with the satin scrunchie to help reduce friction, breakage, and hair damage.'
    ]
  },
  {
    step: 8,
    title: 'Use Satin Pillow Cover',
    targetProducts: ['satin-pillowcase'],
    bulletPoints: [
      'Use as your regular pillow cover and sleep on it every night for smoother, less frizzy, healthier-looking hair.'
    ]
  }
];

function ProductBenefitsVisual({ productId, productImage, additionalImage }: { productId: string; productImage: string; additionalImage?: string }) {
  if (additionalImage) {
    return (
      <section className="py-24 bg-[#FAF9F5]/80 border-t border-[#052B08]/5 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center">
          <h2 className="serif-title text-4xl sm:text-5xl lg:text-6xl text-[#052B08] mb-16 text-center">Benefits</h2>
          <div className="w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-xl border border-[#052B08]/5 bg-white p-2">
            <img 
              src={additionalImage} 
              alt="Product Benefits Infographic" 
              className="w-full h-auto object-contain rounded-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    );
  }

  const data = productDetailData[productId] || { benefits: ['Natural Sourcing', 'Premium Quality', 'Chemical Free', 'Scalp Safe'] };
  
  return (
    <section className="py-24 bg-[#FAF9F5]/80 border-t border-[#052B08]/5 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="serif-title text-4xl sm:text-5xl lg:text-6xl text-[#052B08] mb-16">Benefits</h2>
        
        <div className="relative w-full max-w-[500px] aspect-square mx-auto flex items-center justify-center">
          {/* SVG Dotted Pointers Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100">
            {/* Top Left Path */}
            <path d="M 18,25 Q 32,23 40,32" stroke="#052B08" strokeWidth="0.5" strokeDasharray="1.5,1.5" fill="none" />
            <circle cx="40" cy="32" r="1" fill="#052B08" />

            {/* Top Right Path */}
            <path d="M 82,28 Q 68,26 60,34" stroke="#052B08" strokeWidth="0.5" strokeDasharray="1.5,1.5" fill="none" />
            <circle cx="60" cy="34" r="1" fill="#052B08" />

            {/* Mid Left Path */}
            <path d="M 12,52 Q 28,52 36,46" stroke="#052B08" strokeWidth="0.5" strokeDasharray="1.5,1.5" fill="none" />
            <circle cx="36" cy="46" r="1" fill="#052B08" />

            {/* Bottom Right Path */}
            <path d="M 85,76 Q 70,76 60,64" stroke="#052B08" strokeWidth="0.5" strokeDasharray="1.5,1.5" fill="none" />
            <circle cx="60" cy="64" r="1" fill="#052B08" />
          </svg>

          {/* Floating Badges */}
          <div className="absolute left-[2%] top-[22%] -translate-y-1/2 z-20">
            <span className="bg-[#EEF7EE] text-[#052B08] border border-[#052B08]/10 px-4 py-2 rounded-full text-xs font-bold shadow-xs whitespace-nowrap block">
              {data.benefits[0]}
            </span>
          </div>

          <div className="absolute right-[2%] top-[25%] -translate-y-1/2 z-20">
            <span className="bg-[#FAF3EE] text-[#052B08] border border-[#052B08]/10 px-4 py-2 rounded-full text-xs font-bold shadow-xs whitespace-nowrap block">
              {data.benefits[1]}
            </span>
          </div>

          <div className="absolute left-[0%] top-[55%] -translate-y-1/2 z-20">
            <span className="bg-[#EBF3EB] text-[#052B08] border border-[#052B08]/10 px-4 py-2 rounded-full text-xs font-bold shadow-xs whitespace-nowrap block">
              {data.benefits[2]}
            </span>
          </div>

          <div className="absolute right-[0%] top-[78%] -translate-y-1/2 z-20">
            <span className="bg-[#FAF9F5] text-[#052B08] border border-[#052B08]/10 px-4 py-2 rounded-full text-xs font-bold shadow-xs whitespace-nowrap block">
              {data.benefits[3]}
            </span>
          </div>

          {/* Center Swatch/Product Image */}
          <div className="w-[45%] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-[#052B08]/10 bg-white relative flex items-center justify-center p-4 hover:scale-102 transition-transform duration-500">
            <img 
              src={productImage} 
              alt="Swatch view" 
              className="w-full h-full object-contain mix-blend-multiply drop-shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductUsageSection({ productId }: { productId: string }) {
  // Find which step is active for this product
  let activeStepNum = 4; // default to Dry Naturally if not matched
  if (productId === 'radiance-oil') activeStepNum = 1;
  else if (productId === 'herbal-wash') activeStepNum = 2;
  else if (productId === 'avosilk-bloom') activeStepNum = 3;
  else if (productId === 'pro-repair-serum') activeStepNum = 5;
  else if (productId === 'follicra-regrowth') activeStepNum = 6;

  const currentStep = ritualSteps.find(s => s.step === activeStepNum) || ritualSteps[3];

  return (
    <section className="py-24 bg-white border-t border-[#052B08]/5">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#FF7B89] mb-2 block">Optimal Routine</span>
          <h2 className="serif-title text-4xl sm:text-5xl text-[#052B08] leading-tight">How to Use</h2>
        </div>

        {/* 5-Step Checklist / Timeline Row */}
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-4 mb-20 border-b border-[#052B08]/5 pb-12">
          {ritualSteps.map((s) => {
            const isActive = s.step === activeStepNum;
            return (
              <div key={s.step} className="flex flex-row md:flex-col items-center gap-4 text-left md:text-center flex-1 relative w-full group">
                {/* Visual Circle Indicator */}
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-500 border ${
                    isActive 
                      ? 'bg-[#052B08] text-white border-[#052B08] scale-110 shadow-md shadow-[#052B08]/20 ring-4 ring-[#052B08]/15' 
                      : 'bg-[#F5F7F5] text-[#052B08]/40 border-black/5 hover:bg-[#EEF7EE]/40 hover:text-[#052B08]'
                  }`}
                >
                  {s.step}
                </div>
                
                {/* Step Title Label */}
                <div className="flex flex-col md:items-center">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-[#052B08]' : 'text-gray-400'}`}>
                    Step {s.step}
                  </span>
                  <span className={`text-xs font-semibold leading-tight max-w-[120px] ${isActive ? 'text-[#052B08] font-bold' : 'text-gray-400/80'}`}>
                    {s.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Active Step Instructions Panel */}
        <div className="max-w-2xl mx-auto bg-[#FAF9F5] border border-[#052B08]/5 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
          <div className="text-left mb-6">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF7B89] block mb-1">Instruction Details</span>
            <h3 className="font-serif text-2xl text-[#052B08] font-bold">{currentStep.title}</h3>
          </div>
          
          <ul className="space-y-4 text-left">
            {currentStep.bulletPoints.map((bullet, idx) => (
              <li key={idx} className="flex gap-4 items-start text-sm text-[#052B08]/80 leading-relaxed font-medium">
                <span className="w-5 h-5 rounded-full bg-[#052B08]/5 border border-[#052B08]/10 text-[#052B08] font-bold text-[10px] flex items-center justify-center mt-0.5 shrink-0">
                  {idx + 1}
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* General Hair Care Tips Panel */}
        <div className="max-w-2xl mx-auto mt-8 bg-[#EEF7EE] border border-[#2D7A3A]/20 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
          <div className="text-left mb-6 flex items-center gap-3">
            <span className="text-[28px]">💡</span>
            <h3 className="font-serif text-xl text-[#052B08] font-bold uppercase tracking-widest">General Hair Care Tips</h3>
          </div>
          
          <ul className="space-y-4 text-left">
            {[
              { icon: '🔸', text: 'Avoid harsh chemical-based hair products whenever possible and choose natural hair care alternatives.' },
              { icon: '❯', text: 'Drink enough water daily.' },
              { icon: '❯', text: 'Sleep 7–8 hours every night.' },
              { icon: '❱', text: 'Eat protein-rich foods regularly.' },
              { icon: '❱', text: 'Include iron-rich foods in your diet.' },
              { icon: '➤', text: 'Manage stress for healthier hair.' },
              { icon: '➤', text: 'Trim split ends regularly.' },
              { icon: '➟', text: 'Avoid excessive heat styling.' },
              { icon: '➟', text: 'Keep your scalp clean and healthy.' },
              { icon: '➲', text: 'Protect your hair from excessive sun exposure.' },
              { icon: '➲', text: 'Be gentle while detangling wet hair.' },
              { icon: '⟢', text: 'Consistency is key — regular hair care gives the best long-term results.' },
            ].map((tip, idx) => (
              <li key={idx} className="flex gap-4 items-start text-sm text-[#052B08]/80 leading-relaxed font-medium">
                <span className="text-[#2D7A3A] font-bold shrink-0 text-[12px] mt-0.5">{tip.icon}</span>
                <span>{tip.text}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}

function StarRatingInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="text-2xl transition-transform hover:scale-110 active:scale-95"
          aria-label={`Rate ${star} stars`}
        >
          <Star
            size={28}
            className="transition-colors duration-150"
            fill={(hovered || value) >= star ? '#F8CD71' : 'none'}
            stroke={(hovered || value) >= star ? '#F8CD71' : '#D1D5DB'}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewPhotoGrid({ photos }: { photos: string[] }) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  if (!photos || photos.length === 0) return null;
  return (
    <>
      <div className="flex flex-wrap gap-2 mt-4">
        {photos.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightbox(src)}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-black/10 hover:scale-105 transition-transform duration-200 flex-shrink-0"
          >
            <img src={src} alt={`Review photo ${i+1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[999999] bg-black/90 flex items-center justify-center p-4"
          >
            <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white/80 hover:text-white">
              <X size={28} />
            </button>
            <img src={lightbox} alt="Full size review photo" className="max-w-full max-h-[90vh] rounded-2xl object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ProductReviewsSection({ productId }: { productId: string }) {
  const staticData = productDetailData[productId] || { reviews: [] };
  const storageKey = `smitha_reviews_${productId}`;

  // Load persisted customer reviews from localStorage
  const [customerReviews, setCustomerReviews] = useState<CustomerReview[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(0);
  const [formText, setFormText] = useState('');
  const [formPhotos, setFormPhotos] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{rating?: string; text?: string}>({});
  const fileRef = useRef<HTMLInputElement>(null);

  // Combine static + customer reviews, showing customer first
  const allReviews: CustomerReview[] = [
    ...customerReviews,
    ...staticData.reviews.map(r => ({ ...r, id: r.name + r.date, verified: true }))
  ];

  const avgRating = allReviews.length > 0
    ? Math.round((allReviews.reduce((a, r) => a + r.rating, 0) / allReviews.length) * 10) / 10
    : 0;

  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.slice(0, 3 - formPhotos.length).forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setFormPhotos(prev => [...prev, ev.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
    // reset input so same file can be re-selected
    if (fileRef.current) fileRef.current.value = '';
  }, [formPhotos.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {rating?: string; text?: string} = {};
    if (formRating === 0) newErrors.rating = 'Please select a star rating.';
    if (formText.trim().length < 10) newErrors.text = 'Please write at least 10 characters.';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    const newReview: CustomerReview = {
      id: Date.now().toString(),
      name: formName.trim() || 'Anonymous',
      rating: formRating,
      text: formText.trim(),
      date: 'Just now',
      photos: formPhotos,
      verified: false,
    };

    const updated = [newReview, ...customerReviews];
    setCustomerReviews(updated);
    try { localStorage.setItem(storageKey, JSON.stringify(updated)); } catch {}

    // Reset form
    setFormName('');
    setFormRating(0);
    setFormText('');
    setFormPhotos([]);
    setErrors({});
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowForm(false); }, 3000);
  };

  return (
    <section className="py-16 md:py-24 bg-[#FAF9F5]/50 border-t border-[#052B08]/5">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#052B08]/40 mb-2 block">Verified Feedback</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#052B08]">Customer Reviews</h2>
            {allReviews.length > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={14}
                      fill={avgRating >= s ? '#F8CD71' : avgRating >= s - 0.5 ? '#F8CD71' : 'none'}
                      stroke="#F8CD71" strokeWidth={1.5}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#052B08]">{avgRating}</span>
                <span className="text-xs text-gray-400">({allReviews.length} reviews)</span>
              </div>
            )}
          </div>
          <button
            onClick={() => setShowForm(v => !v)}
            className="flex items-center gap-2 bg-[#052B08] text-white px-5 sm:px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#1A4B21] transition-all shadow-sm active:scale-95 shrink-0"
          >
            Write a Review
            {showForm ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* Write a Review Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden mb-10"
            >
              <div className="bg-white rounded-[2rem] border border-[#052B08]/8 shadow-sm p-6 sm:p-8">
                {submitted ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-3 py-8 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#EEF7EE] flex items-center justify-center">
                      <Check size={24} className="text-[#2D7A3A]" />
                    </div>
                    <h3 className="font-serif text-xl text-[#052B08]">Thank you for your review!</h3>
                    <p className="text-sm text-gray-400">Your feedback helps other customers make better choices.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="font-serif text-xl sm:text-2xl text-[#052B08] font-bold mb-1">Share Your Experience</h3>
                    <p className="text-xs text-gray-400 -mt-4">Your honest review helps others make informed decisions.</p>

                    {/* Star Rating */}
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#052B08]/60 block mb-2">Your Rating *</label>
                      <StarRatingInput value={formRating} onChange={v => { setFormRating(v); setErrors(e => ({...e, rating: undefined})); }} />
                      {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
                    </div>

                    {/* Name */}
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#052B08]/60 block mb-2">Your Name (optional)</label>
                      <input
                        type="text"
                        value={formName}
                        onChange={e => setFormName(e.target.value)}
                        placeholder="e.g. Priya S."
                        maxLength={60}
                        className="w-full sm:w-72 px-4 py-3 bg-[#F5F7F5] border border-black/8 rounded-full text-sm text-[#052B08] focus:outline-none focus:border-[#052B08]/40 focus:ring-1 focus:ring-[#052B08]/10 placeholder:text-gray-400"
                      />
                    </div>

                    {/* Review Text */}
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#052B08]/60 block mb-2">Your Review *</label>
                      <textarea
                        value={formText}
                        onChange={e => { setFormText(e.target.value); setErrors(e2 => ({...e2, text: undefined})); }}
                        placeholder="Tell us what you love about this product, any results you noticed, or tips for using it..."
                        rows={4}
                        maxLength={800}
                        className="w-full px-4 py-3 bg-[#F5F7F5] border border-black/8 rounded-2xl text-sm text-[#052B08] focus:outline-none focus:border-[#052B08]/40 focus:ring-1 focus:ring-[#052B08]/10 placeholder:text-gray-400 resize-none"
                      />
                      <div className="flex justify-between mt-1">
                        {errors.text ? <p className="text-red-500 text-xs">{errors.text}</p> : <span />}
                        <span className="text-[10px] text-gray-300">{formText.length}/800</span>
                      </div>
                    </div>

                    {/* Photo Upload */}
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#052B08]/60 block mb-2">Add Photos (optional, max 3)</label>
                      <div className="flex flex-wrap gap-3 items-center">
                        {formPhotos.map((src, i) => (
                          <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-black/10 group">
                            <img src={src} alt={`Preview ${i+1}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setFormPhotos(prev => prev.filter((_, j) => j !== i))}
                              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={10} />
                            </button>
                          </div>
                        ))}
                        {formPhotos.length < 3 && (
                          <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className="w-20 h-20 rounded-xl border-2 border-dashed border-[#052B08]/20 hover:border-[#052B08]/50 flex flex-col items-center justify-center gap-1 text-[#052B08]/40 hover:text-[#052B08]/70 transition-all"
                          >
                            <Camera size={20} />
                            <span className="text-[9px] font-bold uppercase tracking-wider">Add Photo</span>
                          </button>
                        )}
                      </div>
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <p className="text-[10px] text-gray-400 mt-1.5">JPG, PNG, WEBP supported. Max 3 photos.</p>
                    </div>

                    {/* Submit */}
                    <div className="flex gap-3 pt-2">
                      <button
                        type="submit"
                        className="flex items-center gap-2 bg-[#052B08] text-white px-6 sm:px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#1A4B21] transition-all shadow-sm active:scale-95"
                      >
                        Submit Review
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-5 sm:px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-gray-400 hover:bg-black/5 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews Grid */}
        {allReviews.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-[2rem] border border-[#052B08]/5">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-2">No reviews yet</p>
            <p className="text-sm text-[#052B08]/50">Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-6">
            {allReviews.map((rev, idx) => (
              <div key={rev.id || idx} className="bg-white rounded-3xl p-5 sm:p-6 border border-black/5 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between h-full text-left">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={14}
                          fill={rev.rating >= s ? '#F8CD71' : 'none'}
                          stroke={rev.rating >= s ? '#F8CD71' : '#E5E7EB'}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{rev.date}</span>
                  </div>
                  <p className="text-sm text-[#052B08]/80 leading-relaxed italic mb-4">"{rev.text}"</p>
                  {/* Review Photos */}
                  {rev.photos && rev.photos.length > 0 && (
                    <ReviewPhotoGrid photos={rev.photos} />
                  )}
                </div>

                <div className="flex items-center gap-3 border-t border-black/5 pt-4 mt-4">
                  <div className="w-8 h-8 rounded-full bg-[#052B08] text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {(rev.name || 'A').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#052B08]">{rev.name || 'Anonymous'}</h4>
                    <span className="text-[9px] font-bold uppercase tracking-wider flex items-center gap-1" style={{color: rev.verified ? '#2D7A3A' : '#888'}}>
                      <span className="text-[10px]">{rev.verified ? '✓' : '●'}</span>
                      {rev.verified ? 'Verified Buyer' : 'Customer Review'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const productIndex = products.findIndex(p => p.id === id);
  const product = products[productIndex];

  // State for size selection
  const [selectedSize, setSelectedSize] = useState(product ? product.sizes[0] : null);
  // State for active image index in the product gallery
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Update selected size when product changes
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  // Enhanced 3D Motion Values for the product jar
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 120, damping: 20 });
  const translateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 100, damping: 25 });
  const translateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), { stiffness: 100, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIndex(0);
  }, [id]);

  if (!product || !selectedSize) return <div className="h-screen flex items-center justify-center font-display text-2xl">Product not found</div>;

  // Dynamic list of gallery images for each product page
  const gallery: { src: string; label: string; isTransparent: boolean }[] = [
    { src: product.image, label: 'Main View', isTransparent: true },
  ];
  if (product.additionalImage) {
    gallery.push({ src: product.additionalImage, label: 'Benefits Info', isTransparent: false });
  }
  if (product.ingredientsImage) {
    gallery.push({ src: product.ingredientsImage, label: 'Ingredients Info', isTransparent: false });
  }

  // Add to Bag action handler
  const handleAddToBag = () => {
    const cartId = `${product.id}-${selectedSize.size}`;
    const cartItem = {
      cartId,
      productId: product.id,
      size: selectedSize.size,
      price: selectedSize.price,
      quantity: 1
    };

    try {
      const existing = localStorage.getItem('smitha_purelife_cart');
      let cart = existing ? JSON.parse(existing) : [];
      const existingIndex = cart.findIndex((item: any) => item.cartId === cartId);
      if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
      } else {
        cart.push(cartItem);
      }
      localStorage.setItem('smitha_purelife_cart', JSON.stringify(cart));
      // Auto-open cart drawer when item is added
      localStorage.setItem('smitha_purelife_cart_auto_open', 'true');
      window.dispatchEvent(new Event('cart-updated'));
    } catch (e) {
      console.error("Cart action failed:", e);
    }
  };

  return (
    <div className="bg-[#C1CDBF] min-h-screen selection:bg-accent selection:text-bg overflow-x-hidden pt-[76px]">
      
      {/* Floating Pagination Arrows */}
      {productIndex > 0 && (
        <Link 
          to={`/product/${products[productIndex - 1].id}`}
          className="fixed left-2 md:left-6 top-1/2 -translate-y-1/2 z-[90] w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/80 backdrop-blur shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#052B08]/5 flex items-center justify-center text-[#052B08] hover:bg-[#052B08] hover:text-white transition-all duration-300 group"
          aria-label="Previous Product"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </Link>
      )}
      
      {productIndex < products.length - 1 && (
        <Link 
          to={`/product/${products[productIndex + 1].id}`}
          className="fixed right-2 md:right-6 top-1/2 -translate-y-1/2 z-[90] w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/80 backdrop-blur shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#052B08]/5 flex items-center justify-center text-[#052B08] hover:bg-[#052B08] hover:text-white transition-all duration-300 group"
          aria-label="Next Product"
        >
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
      
      {/* Full-width Lifestyle Hero Banner */}
      <div className="w-full h-[calc(100svh-76px)] min-h-[500px] relative mb-16 lg:mb-24 flex flex-col">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={product.lifestyleImage}
            alt={`${product.title} Lifestyle`}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#052B08]/50 via-[#052B08]/20 to-transparent flex items-center justify-center">
            <div className="text-center px-4 md:px-6 w-full max-w-6xl mx-auto mt-20">
              <motion.h2 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="serif-title text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
              >
                Exquisite Formulation
              </motion.h2>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="font-body text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] uppercase text-white/95 drop-shadow-md max-w-4xl mx-auto leading-relaxed font-bold"
              >
                {product.results}
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Standard Product Layout */}
      <div className="pb-20 lg:pb-32 max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left: 3D Interactive Product Image + Gallery Carousel */}
          <div className="w-full lg:w-1/2 flex flex-col-reverse sm:flex-row gap-4 items-start h-[50vh] sm:h-[60vh] lg:h-[80vh] relative min-h-[350px]">
            
            {/* Gallery Thumbnails (Horizontal on mobile, Vertical Stack on sm+) */}
            <div className="flex flex-row sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto pr-1 select-none hide-scrollbar max-w-full sm:max-h-full scroll-smooth shrink-0 py-2 w-full sm:w-16 md:w-20">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 relative bg-white shadow-xs hover:scale-105 active:scale-95 shrink-0 ${
                    activeImageIndex === idx 
                      ? 'border-[#052B08] scale-102 ring-2 ring-[#052B08]/15' 
                      : 'border-[#052B08]/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={img.src} 
                    alt={img.label} 
                    className={`w-full h-full object-cover ${img.isTransparent ? 'mix-blend-multiply p-1.5' : ''}`}
                  />
                  <div className="absolute inset-0 bg-black/3 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
                </button>
              ))}
            </div>

            {/* Main Interactive Image Frame */}
            <motion.div 
              onMouseMove={handleMouseMove} 
              onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
              style={{ 
                rotateX, 
                rotateY, 
                x: translateX,
                y: translateY,
                z: 200, 
                transformStyle: 'preserve-3d',
              }}
              className="flex-1 h-full relative flex flex-col items-center justify-center perspective-2000 bg-white/20 rounded-[2.5rem] border border-[#052B08]/5 overflow-hidden p-6 md:p-10 select-none group shadow-xs hover:shadow-lg transition-shadow duration-500"
            >
              {/* Background Decorative Particles (only for transparent product jars) */}
              {gallery[activeImageIndex].isTransparent && (
                <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                  {[...Array(6)].map((_, i) => (
                    <FloatingDebris key={i} index={i} />
                  ))}
                </div>
              )}              {/* Main Image View */}
              <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                {gallery[activeImageIndex].isTransparent ? (
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent blur-[80px] lg:blur-[120px] rounded-full pointer-events-none" style={{ transform: 'translateZ(-100px)' }} />
                ) : null}
                
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIndex}
                    src={gallery[activeImageIndex].src}
                    alt={gallery[activeImageIndex].label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.4}
                    onDragEnd={(e, info) => {
                      const swipeThreshold = 50;
                      if (info.offset.x < -swipeThreshold) {
                        setActiveImageIndex((prev) => (prev + 1) % gallery.length);
                      } else if (info.offset.x > swipeThreshold) {
                        setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
                      }
                    }}
                    className={`w-full h-full object-contain cursor-grab active:cursor-grabbing drop-shadow-[0_15px_30px_rgba(5,43,8,0.15)] z-50 ${gallery[activeImageIndex].isTransparent ? 'mix-blend-multiply' : 'rounded-3xl'}`}
                    style={{ transformStyle: 'preserve-3d' }}
                  />
                </AnimatePresence>
              </div>

              {/* Left/Right manual click arrows */}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-[60] p-2.5 rounded-full bg-white/80 hover:bg-white text-[#052B08] border border-[#052B08]/10 shadow-md transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center cursor-pointer active:scale-95"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev + 1) % gallery.length);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-[60] p-2.5 rounded-full bg-white/80 hover:bg-white text-[#052B08] border border-[#052B08]/10 shadow-md transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center cursor-pointer active:scale-95"
                  >
                    <ArrowRight size={18} />
                  </button>
                </>
              )}
 
              {/* Navigation Dots Overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-50 bg-[#052B08]/10 backdrop-blur-md px-3.5 py-1.5 rounded-full">
                {gallery.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      activeImageIndex === idx 
                        ? 'bg-[#052B08] w-4' 
                        : 'bg-[#052B08]/40 hover:bg-[#052B08]/70'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left"
          >
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-body text-[10px] sm:text-[12px] tracking-[0.4em] uppercase text-[#052B08]/60 font-bold mb-4 block"
            >
              {product.subtitle}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="serif-title text-4xl sm:text-5xl lg:text-7xl text-[#052B08] leading-tight mb-6"
            >
              {product.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-body text-base sm:text-lg lg:text-xl text-[#052B08]/80 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0"
            >
              {product.description}
            </motion.p>
            
            {/* Dynamic Size & Pricing selector */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mb-8 text-left max-w-md mx-auto lg:mx-0 w-full"
            >
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#052B08]/50 block mb-3">Select Product Size</span>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((s) => {
                  const active = s.size === selectedSize.size;
                  const discountPercent = Math.round(((s.originalPrice - s.price) / s.originalPrice) * 100);
                  
                  return (
                    <button
                      key={s.size}
                      onClick={() => setSelectedSize(s)}
                      className={`flex-1 min-w-[130px] p-3.5 rounded-2xl border text-left transition-all duration-300 ${
                        active 
                          ? 'border-[#052B08] bg-[#052B08] text-white shadow-md' 
                          : 'border-[#052B08]/15 bg-white/40 hover:bg-white text-[#052B08]'
                      }`}
                    >
                      <span className="block text-[11px] font-bold tracking-wider uppercase block">{s.size}</span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-base font-bold font-inter">₹{s.price}</span>
                        {s.originalPrice > s.price && (
                          <span className={`text-xs line-through ${active ? 'text-white/60' : 'text-gray-400'}`}>
                            ₹{s.originalPrice}
                          </span>
                        )}
                      </div>
                      {s.originalPrice > s.price && (
                        <span className={`inline-block text-[8px] font-bold px-1.5 py-0.5 rounded-md mt-1 uppercase ${
                          active ? 'bg-white/20 text-white' : 'bg-red-50 text-red-500 border border-red-100'
                        }`}>
                          Save {discountPercent}%
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <motion.button 
              onClick={handleAddToBag}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#052B08] text-white py-4 lg:py-5 px-8 lg:px-12 rounded-full font-bold tracking-widest uppercase hover:bg-[#FF7B89] transition-colors duration-300 w-full sm:w-auto text-center shadow-xl hover:shadow-2xl self-center lg:self-start text-sm lg:text-base flex items-center justify-center gap-3"
            >
              Add to Bag • <span className="font-inter">₹{selectedSize.price.toLocaleString()}</span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* 2. Ingredients Section (Botanical Alchemy) */}
      <section className="py-24 bg-white border-t border-[#052B08]/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#FF7B89] mb-2 block">Premium Ingredients</span>
            <h2 className="serif-title text-4xl sm:text-5xl text-[#052B08]">Botanical Alchemy</h2>
          </div>

          {product.ingredientsImage && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto mb-20 rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#052B08]/5 bg-white"
            >
              <img 
                src={product.ingredientsImage} 
                alt={`${product.title} detailed ingredients`} 
                className="w-full h-auto object-contain"
              />
            </motion.div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {product.ingredients.map((ing, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-[#FAF9F5] hover:bg-white backdrop-blur-sm rounded-3xl shadow-xs hover:shadow-md border border-[#052B08]/5 transition-all duration-300 hover:-translate-y-1 text-left"
              >
                <Sparkles size={18} className="text-[#FF7B89] mb-4" />
                <h4 className="font-bold text-[#052B08] mb-1.5 text-lg leading-tight">{ing.name}</h4>
                <p className="text-xs text-[#052B08]/60 uppercase tracking-wider leading-relaxed">{ing.effect}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Benefits Section */}
      <ProductBenefitsVisual productId={product.id} productImage={product.image} additionalImage={product.additionalImage} />

      {/* 4. How to Use Section */}
      <ProductUsageSection productId={product.id} />

      {/* Comparison / Results Section - same interactive slider, different images per product */}
      {product.category === 'haircare' && (
        <>
          <ComparisonSection 
            beforeImage={product.beforeImage || "/products/before_hair.png"}
            afterImage={product.afterImage || "/products/after_hair.png"}
          />
          <TransformationsGallery />
        </>
      )}

      {/* 5. Reviews Section */}
      <ProductReviewsSection productId={product.id} />

      {/* Bottom Product Navigation */}
      <section className="py-20 lg:py-32 px-6 md:px-12 bg-white/40 backdrop-blur-md border-t border-[#052B08]/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 md:gap-10">
          {productIndex > 0 ? (
            <Link 
              to={`/product/${products[productIndex - 1].id}`}
              className="group flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left w-full md:w-auto"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: -10 }}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-[#052B08]/10 flex items-center justify-center group-hover:bg-[#052B08] group-hover:text-white transition-all duration-500"
              >
                <ArrowLeft size={18} />
              </motion.div>
              <div>
                <p className="font-body text-[8px] md:text-[10px] tracking-[0.3em] uppercase text-[#052B08]/40 mb-2">Previous Ritual</p>
                <h3 className="serif-title text-2xl md:text-3xl lg:text-4xl text-[#052B08]">{products[productIndex - 1].title}</h3>
              </div>
            </Link>
          ) : <div className="hidden md:block" />}

          {productIndex < products.length - 1 ? (
            <Link 
              to={`/product/${products[productIndex + 1].id}`}
              className="group flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-right w-full md:w-auto"
            >
              <div className="order-2 md:order-1">
                 <p className="font-body text-[8px] md:text-[10px] tracking-[0.3em] uppercase text-[#052B08]/40 mb-2">Next Ritual</p>
                 <h3 className="serif-title text-2xl md:text-3xl lg:text-4xl text-[#052B08]">{products[productIndex + 1].title}</h3>
              </div>
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-[#052B08]/10 flex items-center justify-center group-hover:bg-[#052B08] group-hover:text-white transition-all duration-500 order-1 md:order-2"
              >
                <ArrowRight size={18} />
              </motion.div>
            </Link>
          ) : <div className="hidden md:block" />}
        </div>
      </section>

      {/* Final Return CTA */}
      <section className="py-24 text-center">
        <Link to="/" className="group inline-flex flex-col items-center gap-6">
          <motion.span 
            whileHover={{ letterSpacing: "0.8em" }}
            className="font-body text-[10px] tracking-[0.6em] uppercase text-[#052B08]/50 group-hover:text-[#052B08] transition-all duration-500 font-bold"
          >
            Return to Atelier
          </motion.span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-16 bg-gradient-to-b from-[#052B08]/40 to-transparent group-hover:from-[#FF7B89] transition-colors duration-500" 
          />
        </Link>
      </section>
    </div>
  );
}
