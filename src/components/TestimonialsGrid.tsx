import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, X } from 'lucide-react';

const reviews = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    product: 'Radiance Hair Oil',
    text: 'I have been struggling with hair fall for 3 years. After just 6 weeks of using the Radiance Hair Oil, I can see new baby hairs growing! Absolutely incredible results.',
    tag: 'Hair Fall',
    initials: 'PS',
    color: '#DDF1E9',
  },
  {
    name: 'Anjali Reddy',
    location: 'Hyderabad',
    rating: 5,
    product: 'Avosilky Bloom',
    text: 'My hair was extremely dry and damaged after coloring. The Avosilky Bloom transformed it completely — silky smooth, hydrated, and full of life. I tell everyone about it!',
    tag: 'Dry Hair',
    initials: 'AR',
    color: '#E9D5CA',
  },
  {
    name: 'Deepa Nair',
    location: 'Bangalore',
    rating: 5,
    product: 'Herbal Hair Wash',
    text: 'Finally a shampoo that is completely chemical-free. My scalp feels so healthy and clean. No more dandruff after the very first wash. Pure magic in a powder!',
    tag: 'Scalp Health',
    initials: 'DN',
    color: '#D4E2D4',
  },
  {
    name: 'Meera Pillai',
    location: 'Chennai',
    rating: 5,
    product: 'Pro Repair Serum',
    text: 'The Pro Repair Serum is a game changer for my frizzy hair. One pump and my hair looks professionally blow-dried instantly. The botanical scent is heavenly too!',
    tag: 'Frizz Control',
    initials: 'MP',
    color: '#DBCDF0',
  },
  {
    name: 'Sunita Joshi',
    location: 'Delhi',
    rating: 5,
    product: 'Follicra Regrowth',
    text: 'My dermatologist recommended Follicra for my thinning crown. Within 3 months my hair density has noticeably improved. This is backed by real Ayurvedic science.',
    tag: 'Hair Growth',
    initials: 'SJ',
    color: '#F9F3CC',
  },
  {
    name: 'Kavitha Menon',
    location: 'Kochi',
    rating: 5,
    product: 'Radiance Hair Oil',
    text: 'I love that every ingredient is listed and explained. As someone conscious about what I put on my body, Smitha Purelife is the only brand I trust completely.',
    tag: 'Ingredient Trust',
    initials: 'KM',
    color: '#EBF3EB',
  },
];

const colors = ['#DDF1E9', '#E9D5CA', '#D4E2D4', '#DBCDF0', '#F9F3CC', '#EBF3EB'];

export default function TestimonialsGrid() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [customReviews, setCustomReviews] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('smitha_purelife_reviews');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 5,
    product: 'Radiance Hair Oil',
    text: '',
    tag: 'Hair Fall',
  });

  const saveReviews = (newReviews: any[]) => {
    setCustomReviews(newReviews);
    try {
      localStorage.setItem('smitha_purelife_reviews', JSON.stringify(newReviews));
    } catch (e) {
      console.error('Error saving review to localstorage:', e);
    }
  };

  const getInitials = (name: string) => {
    return name
      .trim()
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'UR';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.location || !formData.text) return;

    // Pick a card color sequentially
    const colorIndex = (reviews.length + customReviews.length) % colors.length;
    const newReview = {
      name: formData.name,
      location: formData.location,
      rating: formData.rating,
      product: formData.product,
      text: formData.text,
      tag: formData.tag,
      initials: getInitials(formData.name),
      color: colors[colorIndex],
    };

    const updated = [newReview, ...customReviews];
    saveReviews(updated);

    // Reset Form & Close Modal
    setFormData({
      name: '',
      location: '',
      rating: 5,
      product: 'Radiance Hair Oil',
      text: '',
      tag: 'Hair Fall',
    });
    setIsModalOpen(false);

    // Trigger Toast
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 4000);
  };

  const allReviews = [...reviews, ...customReviews];

  return (
    <section id="testimonials" className="py-24 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[11px] uppercase tracking-[0.4em] text-[#1A4B21] font-bold mb-3"
          >
            Real Stories, Real Results
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-[#2D2A26] leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Loved by Thousands
          </motion.h2>

          {/* Rating Summary & Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-6"
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#F8CD71" className="text-[#F8CD71]" />
                ))}
              </div>
              <span className="font-bold text-[#2D2A26]">4.9</span>
              <span className="text-[#2D2A26]/50 text-sm">from 12,400+ verified reviews</span>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2.5 bg-[#1A4B21] hover:bg-[#25612e] text-white border border-[#1A4B21]/10 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer inline-flex items-center gap-1.5"
            >
              Write a Review
            </button>
          </motion.div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allReviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.05, 0.3) }}
              className="rounded-2xl p-6 relative hover:shadow-xl transition-shadow duration-300 group flex flex-col justify-between"
              style={{ backgroundColor: review.color }}
            >
              <div>
                <Quote size={28} className="text-[#1A4B21]/15 absolute top-6 right-6 group-hover:text-[#1A4B21]/30 transition-colors" />

                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} size={14} fill="#F8CD71" className="text-[#F8CD71]" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-[#2D2A26]/80 text-sm leading-relaxed mb-6 italic">"{review.text}"</p>
              </div>

              <div>
                {/* Tag */}
                <span className="inline-block text-[10px] uppercase tracking-widest font-bold text-[#1A4B21] bg-[#1A4B21]/10 px-2 py-1 rounded-full mb-4">
                  {review.tag}
                </span>

                {/* Reviewer Info */}
                <div className="flex items-center gap-3 mt-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                    style={{ backgroundColor: '#1A4B21' }}
                  >
                    {review.initials}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm text-[#2D2A26]">{review.name}</p>
                    <p className="text-[11px] text-[#2D2A26]/50">{review.location} · {review.product}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Review Dialog Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black z-[9999] cursor-pointer"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="fixed inset-x-4 top-[8%] bottom-[8%] md:bottom-auto md:top-[12%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[480px] bg-white rounded-[2.5rem] p-8 shadow-2xl z-[10000] overflow-y-auto border border-black/5 flex flex-col"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="text-left">
                  <h3 className="font-serif text-2xl text-[#2D2A26] font-bold">Share Your Experience</h3>
                  <p className="text-xs text-[#2D2A26]/60 mt-1">Help others choose the best pure life care</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-black/5 text-gray-500 transition-colors shrink-0"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5 text-left flex-1">
                {/* Name & Location */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#2D2A26] uppercase tracking-wider mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAF9F5] border border-black/5 rounded-xl text-sm focus:outline-none focus:border-[#1A4B21] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#2D2A26] uppercase tracking-wider mb-2">Location</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mumbai"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAF9F5] border border-black/5 rounded-xl text-sm focus:outline-none focus:border-[#1A4B21] transition-colors"
                    />
                  </div>
                </div>

                {/* Rating Selector */}
                <div>
                  <label className="block text-[10px] font-bold text-[#2D2A26] uppercase tracking-wider mb-2">Star Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          size={24}
                          fill={star <= formData.rating ? '#F8CD71' : 'none'}
                          className={star <= formData.rating ? 'text-[#F8CD71]' : 'text-gray-300'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Select */}
                <div>
                  <label className="block text-[10px] font-bold text-[#2D2A26] uppercase tracking-wider mb-2">Product Purchased</label>
                  <select
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FAF9F5] border border-black/5 rounded-xl text-sm focus:outline-none focus:border-[#1A4B21] transition-colors cursor-pointer"
                  >
                    <option value="Radiance Hair Oil">Radiance Hair Oil</option>
                    <option value="Avosilky Bloom">Avosilky Bloom</option>
                    <option value="Herbal Hair Wash">Herbal Hair Wash</option>
                    <option value="Pro Repair Serum">Pro Repair Serum</option>
                    <option value="Follicra Regrowth">Follicra Regrowth</option>
                  </select>
                </div>

                {/* Tag / Concern Select */}
                <div>
                  <label className="block text-[10px] font-bold text-[#2D2A26] uppercase tracking-wider mb-2">Primary Hair Focus</label>
                  <select
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FAF9F5] border border-black/5 rounded-xl text-sm focus:outline-none focus:border-[#1A4B21] transition-colors cursor-pointer"
                  >
                    <option value="Hair Fall">Hair Fall</option>
                    <option value="Dry Hair">Dry Hair</option>
                    <option value="Scalp Health">Scalp Health</option>
                    <option value="Frizz Control">Frizz Control</option>
                    <option value="Hair Growth">Hair Growth</option>
                    <option value="Ingredient Trust">Ingredient Trust</option>
                  </select>
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-[10px] font-bold text-[#2D2A26] uppercase tracking-wider mb-2">Review Content</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your hair transformation journey..."
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FAF9F5] border border-black/5 rounded-xl text-sm focus:outline-none focus:border-[#1A4B21] transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-4 py-3 bg-[#1A4B21] hover:bg-[#25612e] text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#1A4B21] text-white px-6 py-4 rounded-full shadow-2xl z-[999999] flex items-center gap-3 border border-[#1A4B21]/10 font-bold text-[10px] tracking-widest uppercase"
          >
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">✓</div>
            <span>Review submitted successfully! Thank you.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
