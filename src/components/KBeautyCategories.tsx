import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Heart, Star, X, Check } from 'lucide-react';


const categories = [
  {
    id: 'haircare',
    name: 'Haircare',
    count: '5 Products',
    image: '/products/hair_icon.png',
    href: '/#trending',
    bg: '#F0F5F1',
    rating: '4.9',
    likes: '1.4k'
  },
  {
    id: 'accessories',
    name: 'Essentials',
    count: '2 Products',
    image: '/products/essentials_icon.jpg',
    href: '/#trending',
    bg: '#FAF3EE',
    rating: '4.8',
    likes: '218'
  },
  {
    id: 'combos',
    name: 'Combos',
    count: '4 Bundles',
    image: '/products/combos_icon.jpg',
    href: '/#combos',
    bg: '#FAF9F5',
    rating: '4.9',
    likes: '890'
  }
];

interface CategoryReview {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

const baseCategoryReviews: Record<string, CategoryReview[]> = {
  haircare: [
    { id: '1', name: 'Aswathy P.', rating: 5, text: 'The entire haircare range is spectacular. Avosilk conditioner and Radiance oil are my daily go-to!', date: '3 days ago' },
    { id: '2', name: 'Nisha K.', rating: 5, text: 'Very happy with the results of the Herbal Wash. Clean botanical ingredients.', date: '2 weeks ago' }
  ],
  accessories: [
    { id: '1', name: 'Shreya D.', rating: 5, text: 'The satin pillowcase is a lifesaver for curly hair. Super soft fabric!', date: '1 week ago' },
    { id: '2', name: 'Meera G.', rating: 4, text: 'Scrunchies hold well and do not snag hair. Highly recommend Essentials.', date: '3 weeks ago' }
  ],
  combos: [
    { id: '1', name: 'Divya S.', rating: 5, text: 'Buying combos saves so much! Complete routine works wonders.', date: '4 days ago' },
    { id: '2', name: 'Rithvik M.', rating: 5, text: 'Bought the Daily 3-Step Combo for my mother, she loved it!', date: '1 month ago' }
  ]
};

export default function KBeautyCategories() {
  const [likedCats, setLikedCats] = useState<string[]>([]);
  const [activeReviewCat, setActiveReviewCat] = useState<any | null>(null);

  // Sync state
  useEffect(() => {
    try {
      const saved = localStorage.getItem('smitha_cat_likes');
      if (saved) setLikedCats(JSON.parse(saved));
    } catch {}
  }, []);

  const toggleCatLike = (id: string) => {
    setLikedCats((prev) => {
      const updated = prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id];
      try {
        localStorage.setItem('smitha_cat_likes', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const getCategoryRating = (catId: string) => {
    const staticReviews = baseCategoryReviews[catId] || [];
    let userReviews: any[] = [];
    try {
      const saved = localStorage.getItem(`smitha_cat_reviews_${catId}`);
      if (saved) userReviews = JSON.parse(saved);
    } catch {}
    const allReviews = [...userReviews, ...staticReviews];
    const avg = allReviews.length > 0
      ? parseFloat((allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1))
      : 5.0;
    return { avg, count: allReviews.length };
  };

  return (
    <section className="py-6 md:py-10 bg-[#FDF9F6] border-b border-[#2D2A26]/5">
      <div className="max-w-7xl mx-auto px-3 md:px-6">
        <div className="flex justify-center items-center gap-2 sm:gap-6 md:gap-8">
          {categories.map((cat, i) => {
            const categoryRating = getCategoryRating(cat.id);
            const baseLikesMap: Record<string, number> = { haircare: 1420, accessories: 218, combos: 890 };
            const categoryLikesCount = (baseLikesMap[cat.id] || 100) + (likedCats.includes(cat.id) ? 1 : 0);

            return (
              <Link 
                to={cat.href} 
                key={cat.id}
                onClick={(e) => {
                  if (cat.id !== 'combos') {
                    localStorage.setItem('smitha_selected_category', cat.id);
                    window.dispatchEvent(new Event('category-filter-updated'));
                  }
                  // Robust smooth scrolling for both active Lenis instances and standard viewport jumps
                  if (window.location.pathname === '/') {
                    const targetId = cat.id === 'combos' ? 'combos' : 'trending';
                    const element = document.getElementById(targetId);
                    const lenis = (window as any).lenis;
                    if (element) {
                      e.preventDefault();
                      if (lenis) {
                        lenis.scrollTo(element, { offset: -96, duration: 1.5 });
                      } else {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }
                }}
              >
                <motion.div 
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center gap-2 sm:gap-3 cursor-pointer group"
                >
                  {/* Premium Round Container */}
                  <div 
                    className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-105 border border-[#2D2A26]/5 shadow-sm group-hover:shadow-md relative bg-white"
                  >
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Styled Badge */}
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center gap-1 px-2.5 py-1 sm:px-4 sm:py-1.5 sm:gap-1.5 bg-white border border-[#2D2A26]/10 rounded-full shadow-xs group-hover:border-[#1A4B21]/45 group-hover:bg-[#EEF7EE]/10 transition-all duration-300">
                      <span className="text-[10px] sm:text-[12px] md:text-[13px] font-bold tracking-wider text-[#2D2A26] uppercase group-hover:text-[#1A4B21] transition-colors">{cat.name}</span>
                      <span className="text-[#2D2A26]/40 text-[10px] sm:text-xs group-hover:text-[#1A4B21]/60 transition-colors">›</span>
                    </div>
                    <span className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-400 mt-0.5 sm:mt-1 font-semibold uppercase tracking-widest">{cat.count}</span>
                    
                    {/* Community Reviews & Likes metrics */}
                    <div className="flex items-center gap-1.5 mt-1 text-[8px] sm:text-[9px] text-[#2D2A26]/50 font-bold uppercase tracking-wider relative z-30">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveReviewCat(cat);
                        }}
                        className="hover:text-amber-600 transition-colors flex items-center gap-0.5 cursor-pointer py-1 px-1.5 -my-1 -mx-1.5"
                        title="View category reviews"
                      >
                        <span className="text-amber-600">★</span> {categoryRating.avg} ({categoryRating.count})
                      </button>
                      <span className="text-gray-200 select-none">|</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleCatLike(cat.id);
                        }}
                        className="hover:text-rose-600 transition-colors flex items-center gap-0.5 cursor-pointer py-1 px-1.5 -my-1 -mx-1.5"
                        title="Like this category"
                      >
                        <Heart size={10} className={likedCats.includes(cat.id) ? 'fill-rose-500 text-rose-500 scale-110' : 'text-gray-400'} /> {categoryLikesCount}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Category reviews & write a review modal */}
      <AnimatePresence>
        {activeReviewCat && (
          <CategoryReviewsModal 
            category={activeReviewCat} 
            onClose={() => setActiveReviewCat(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function CategoryReviewsModal({ category, onClose }: { category: any; onClose: () => void }) {
  const catId = category.id;
  const storageKey = `smitha_cat_reviews_${catId}`;
  const staticReviews = baseCategoryReviews[catId] || [];

  const [customerReviews, setCustomerReviews] = useState<CategoryReview[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(0);
  const [formText, setFormText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{rating?: string; text?: string}>({});

  const allReviews = [
    ...customerReviews,
    ...staticReviews
  ];

  const avgRating = allReviews.length > 0
    ? parseFloat((allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1))
    : 5.0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {rating?: string; text?: string} = {};
    if (formRating === 0) newErrors.rating = 'Please select a star rating.';
    if (formText.trim().length < 10) newErrors.text = 'Please write at least 10 characters.';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    const newReview: CategoryReview = {
      id: Date.now().toString(),
      name: formName.trim() || 'Anonymous',
      rating: formRating,
      text: formText.trim(),
      date: 'Just now',
    };

    const updated = [newReview, ...customerReviews];
    setCustomerReviews(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {}

    setFormName('');
    setFormRating(0);
    setFormText('');
    setErrors({});
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowForm(false); }, 3000);
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[999999] bg-black/60 backdrop-blur-xs"
      />
      
      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-4 top-[10%] bottom-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[550px] z-[9999999] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-black/5 text-[#2D2A26] max-h-[80vh] md:max-h-none"
      >
        {/* Header */}
        <div className="p-5 md:p-6 flex justify-between items-center border-b border-black/5 bg-[#FAF9F5]">
          <div className="text-left">
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#1A4B21] block mb-1">Category Reviews</span>
            <h3 className="font-serif text-xl md:text-2xl text-[#2D2A26] font-bold">
              {category.name} Reviews
            </h3>
            <div className="flex items-center gap-1.5 mt-1 text-xs">
              <span className="text-amber-500">★</span>
              <span className="font-bold">{avgRating}</span>
              <span className="text-gray-400">({allReviews.length} reviews)</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5 text-gray-400 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Customer Feedback</h4>
            <button 
              onClick={() => setShowForm(!showForm)}
              className="text-[10px] font-bold uppercase tracking-wider text-[#1A4B21] hover:underline cursor-pointer"
            >
              {showForm ? 'Cancel' : 'Write a Category Review'}
            </button>
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden border-b border-black/5 pb-4 mb-4 text-left"
              >
                {submitted ? (
                  <div className="py-6 text-center space-y-2 bg-[#EEF7EE] rounded-2xl p-4">
                    <Check size={20} className="text-[#2D7A3A] mx-auto" />
                    <h5 className="font-bold text-xs text-[#052B08]">Review submitted!</h5>
                    <p className="text-[10px] text-gray-400">Thank you for sharing your botanical experience.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-widest text-[#2D2A26]/60 block mb-1.5">Rating *</label>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(s => (
                          <button
                            type="button"
                            key={s}
                            onClick={() => { setFormRating(s); setErrors(e => ({...e, rating: undefined})); }}
                            className="text-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                          >
                            <Star size={20} fill={formRating >= s ? '#F8CD71' : 'none'} stroke={formRating >= s ? '#F8CD71' : '#D1D5DB'} />
                          </button>
                        ))}
                      </div>
                      {errors.rating && <p className="text-red-500 text-[10px] mt-1">{errors.rating}</p>}
                    </div>

                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-widest text-[#2D2A26]/60 block mb-1.5">Your Name (optional)</label>
                      <input 
                        type="text" 
                        value={formName}
                        onChange={e => setFormName(e.target.value)}
                        placeholder="e.g. Anjali M."
                        className="w-full bg-[#FAF9F5] border border-black/5 px-4 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#1A4B21] text-[#2D2A26]"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-widest text-[#2D2A26]/60 block mb-1.5">Your Review *</label>
                      <textarea 
                        value={formText}
                        onChange={e => { setFormText(e.target.value); setErrors(err => ({...err, text: undefined})); }}
                        placeholder="Share your experience with this category..."
                        rows={3}
                        className="w-full bg-[#FAF9F5] border border-black/5 px-4 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#1A4B21] text-[#2D2A26] resize-none"
                      />
                      {errors.text && <p className="text-red-500 text-[10px] mt-1">{errors.text}</p>}
                    </div>

                    <button 
                      type="submit"
                      className="px-5 py-2.5 bg-[#1A4B21] hover:bg-[#0f2e14] text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-xs cursor-pointer active:scale-95 transition-all"
                    >
                      Submit Category Review
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {allReviews.length === 0 ? (
            <p className="text-center py-8 text-xs text-gray-400">No reviews yet for this category.</p>
          ) : (
            <div className="space-y-3">
              {allReviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-[#FAF9F5] rounded-2xl border border-black/5 text-left">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={11} fill={rev.rating >= s ? '#F8CD71' : 'none'} stroke={rev.rating >= s ? '#F8CD71' : '#E5E7EB'} />
                      ))}
                    </div>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{rev.date}</span>
                  </div>
                  <p className="text-xs text-[#2D2A26]/85 leading-relaxed italic">"{rev.text}"</p>
                  <span className="text-[10px] font-bold text-[#1A4B21] mt-2 block">— {rev.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
