import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

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

export default function TestimonialsGrid() {
  return (
    <section id="testimonials" className="py-24 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
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
            className="text-4xl md:text-5xl font-serif text-[#2D2A26]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Loved by Thousands
          </motion.h2>
          {/* Rating Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex items-center justify-center gap-2 mt-5"
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#F8CD71" className="text-[#F8CD71]" />
              ))}
            </div>
            <span className="font-bold text-[#2D2A26]">4.9</span>
            <span className="text-[#2D2A26]/50 text-sm">from 12,400+ verified reviews</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-6 relative hover:shadow-xl transition-shadow duration-300 group"
              style={{ backgroundColor: review.color }}
            >
              <Quote size={28} className="text-[#1A4B21]/15 absolute top-6 right-6 group-hover:text-[#1A4B21]/30 transition-colors" />

              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} size={14} fill="#F8CD71" className="text-[#F8CD71]" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-[#2D2A26]/80 text-sm leading-relaxed mb-6 italic">"{review.text}"</p>

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
                <div>
                  <p className="font-bold text-sm text-[#2D2A26]">{review.name}</p>
                  <p className="text-[11px] text-[#2D2A26]/50">{review.location} · {review.product}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
