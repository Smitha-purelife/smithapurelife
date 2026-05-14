import { products } from '../data/products';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';

export default function KBeautyBestsellers() {
  return (
    <section className="py-20 bg-[#FCF9F9]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-[#2D2A26] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Trending Now
            </h2>
            <p className="text-[#2D2A26]/60">Cult favorites loved by the community.</p>
          </div>
          <button className="text-sm font-medium text-[#FF7B89] hover:underline">View All</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 5).map((product, i) => {
            const dummyBadges = ["Bestseller", "Trending", "Viral", "Must Have", "New"];
            const dummyPrices = ["₹1,200", "₹1,450", "₹999", "₹1,150", "₹1,800"];
            const dummyDiscounts = ["15%", "20%", "", "10%", "5%"];
            const dummyRatings = [4.8, 4.9, 4.7, 4.9, 5.0];
            const dummyReviews = [1204, 3400, 5800, 4200, 890];
            
            return (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-shadow group relative"
            >
              <div className="absolute top-6 right-6 z-10 cursor-pointer text-gray-300 hover:text-[#FF7B89] transition-colors">
                <Heart size={20} />
              </div>

              {dummyBadges[i] && (
                <div className="absolute top-6 left-6 z-10 bg-[#FF7B89] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                  {dummyBadges[i]}
                </div>
              )}

              <div className="aspect-square bg-[#F8F9FA] rounded-xl overflow-hidden mb-4 p-6 relative">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-contain rounded-md group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" 
                />
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-[#FF7B89] uppercase tracking-wide">Smitha Purelife</p>
                <h3 className="font-medium text-[#2D2A26] line-clamp-2 leading-tight h-10">{product.title}</h3>
                
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs font-medium text-[#2D2A26]">{dummyRatings[i]}</span>
                  <span className="text-xs text-[#2D2A26]/40">({dummyReviews[i]})</span>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <span className="font-bold text-lg text-[#2D2A26]">{dummyPrices[i]}</span>
                  {dummyDiscounts[i] && (
                    <span className="text-xs font-medium text-[#FF7B89] bg-[#FFE5E5] px-1.5 py-0.5 rounded">
                      {dummyDiscounts[i]} OFF
                    </span>
                  )}
                </div>
              </div>
              
              <button className="w-full mt-4 bg-white border-2 border-[#2D2A26] text-[#2D2A26] py-2.5 rounded-lg font-semibold hover:bg-[#2D2A26] hover:text-white transition-colors">
                Add to Bag
              </button>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
