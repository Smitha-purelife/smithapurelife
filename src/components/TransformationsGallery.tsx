import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X, MessageSquare, Check } from 'lucide-react';

interface ResultCard {
  id: string;
  title: string;
  tag: string;
  image: string;
  description: string;
  reviewText?: string;
  reviewer?: string;
}

const resultsData: ResultCard[] = [
  {
    id: 'braid-growth',
    title: 'Hair Development & Thickness',
    tag: 'Regrowth & Volume',
    image: '/products/results_braid_growth.png',
    description: '1 month transformation showing noticeable braid density and length development without hairfall.',
    reviewer: 'Verified Customer chat',
    reviewText: 'Thank you so much sister.. it\'s a wow product really I can see my hair development without dandruff and hairfall. This product perfectly suited to my hair and within 1 month I saw my hair\'s result. It was easy and smoothen to apply and has a lovely fragrance. And at last it was an good and amazing product.. Thank you for your recommendation..'
  },
  {
    id: 'dandruff-control',
    title: 'Scalp Cleansing & Dandruff Control',
    tag: 'Scalp Detox',
    image: '/products/results_dandruff.jpg',
    description: 'Before & After scalp view showing complete reduction of dandruff flakes and dry patch clearance.',
    reviewer: 'Scalp Treatment User',
    reviewText: 'My dandruff flakes are completely gone after just 3 washes with the Herbal Hair Wash powder paste. My scalp doesn\'t itch anymore and feels extremely clean and refreshed!'
  },
  {
    id: 'comb-hairfall',
    title: 'Comb Test Hair Fall Reduction',
    tag: 'Hair Fall Control',
    image: '/products/results_comb_hairfall.png',
    description: 'Significant decrease in daily hair breakage and loss on comb after 4 weeks of Radiance Hair Oil massage.',
    reviewer: 'Verified Buyer',
    reviewText: 'Look at the difference on my comb! I used to lose a handful of hair every time I combed. Now, after using the Radiance Hair Oil for a few weeks, my hair breakage is almost zero. Highly recommended!'
  },
  {
    id: 'palm-hairfall',
    title: 'Root Strengthening Progress',
    tag: 'Anti Hair Fall',
    image: '/products/results_hairfall_palm.png',
    description: 'Daily hairfall reduction verified from actual customer progress, showing root strengthening results.',
    reviewer: 'Customer review chat',
    reviewText: 'Thank you so much mam! The hair fall has reduced by 85% in just two weeks of applying the oil warm. The roots feel so much stronger and my hair texture has improved.'
  },
  {
    id: 'nivetha-oil-conditioner',
    title: 'Hair Texture & Fall Control',
    tag: 'Hair Fall Control',
    image: '/products/results_nivetha_chat.png',
    description: 'Customer feedback verifying significant hairfall reduction and avocado conditioner fragrance.',
    reviewer: 'Verified Buyer',
    reviewText: 'Hii mam unga hair oil romba nallarukku En hair fall nallave reduce agiduchi i loved it 🥰 ennala nambave mudiyala mam and avacado conditioner really super fregrance romba nallarukku mam. 1/2 litre bottle available irukka'
  },
  {
    id: 'instagram-comb-test',
    title: '7-Wash Visible Progress',
    tag: 'Anti Hair Fall',
    image: '/products/results_instagram_comb.png',
    description: 'Daily hair fall control progress showing strong, healthy hair and comb test results.',
    reviewer: 'Verified Buyer',
    reviewText: 'Gud afternoon mam After just 7 washes I saw visible hair fall reduction . I am so happy because before using this product I couldn\'t even comb my hair properly ena avlo hair fall irundhuchu 😢. But once I left chemicals and started using your natural products, I feel a big difference .sathiyama Now my hair feels healthy and strong. Romba happy ah iruku... thank you mam keep on doing.'
  },
  {
    id: 'altogether-wash-powder',
    title: 'One-Wash Softness & Shine',
    tag: 'Frizz & Softness',
    image: '/products/results_altogether_wash.png',
    description: 'Wholesome, frizz-free and soft hair transformation after a single wash.',
    reviewer: 'Verified Buyer',
    reviewText: 'Altogether in one wash itself was wholesome sooo good frizz free and so soft .many asked about it they liked this ingredients and product just by seeing its ingredients itself many orders are awaiting for you soon will say you🥰🫶. Just loved it 😻'
  },
  {
    id: 'complete-haircare-kit',
    title: 'Complete Haircare Kit Results',
    tag: 'Hair Care Kit',
    image: '/products/results_haircare_kit.png',
    description: 'Visible hair fall and dandruff reduction with natural scent addiction.',
    reviewer: 'Verified Buyer',
    reviewText: 'Hai mam I purchased hair care kit from you it\'s really awesome result and I\'m completely love with natureee 💯 my hair is too strong and healthy now , i saw my visible hair fall redhction and dandruff. Your condtiner is next level mam I\'m just addicted to thta natural smell 😍🥰'
  },
  {
    id: 'nafia-smoothness-dandruff',
    title: 'Smoothness & Dandruff Clearance',
    tag: 'Scalp Detox',
    image: '/products/results_nafia_chat.png',
    description: 'Smooth hair feel and dandruff clearance from the first wash.',
    reviewer: 'Verified Buyer',
    reviewText: 'Actual from the first use itself i feel my hair become so smooth. And how to use that shampoo. I just take some amount and mix with water and applied. And i feel like dandruff also gone. I really liked i will inform my journey. And will stay connect with u'
  }
];

export default function TransformationsGallery() {
  const [activePhoto, setActivePhoto] = useState<ResultCard | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleReviews = isExpanded ? resultsData : resultsData.slice(0, 4);

  return (
    <section className="py-20 bg-[#FAF9F5]/70 border-t border-[#052B08]/5 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#FF7B89] mb-2.5 block">Proof in Pictures</span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#052B08] font-bold leading-tight">Real Customer Proof</h2>
          <p className="text-sm text-[#052B08]/60 mt-4 max-w-md mx-auto leading-relaxed">
            Unretouched photos and real WhatsApp conversations shared by our customers showing their hair transformations.
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleReviews.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="bg-white rounded-3xl overflow-hidden border border-[#052B08]/5 shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col h-full group"
            >
              {/* Photo Area */}
              <div 
                onClick={() => setActivePhoto(item)}
                className="aspect-[4/5] bg-[#C1CDBF]/10 relative overflow-hidden cursor-pointer"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700" 
                  loading="lazy"
                />
                
                {/* Overlay Hover Effect */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-full text-[#052B08] shadow-lg scale-90 group-hover:scale-100 transition-all duration-500 flex items-center gap-2">
                    <ZoomIn size={16} />
                    <span className="text-[9px] uppercase font-bold tracking-wider">View Chat & Details</span>
                  </div>
                </div>

                {/* Badge Tag */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-[#FAF9F5] text-[#052B08] border border-[#052B08]/10 text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                    {item.tag}
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 flex-1 flex flex-col justify-between text-left">
                <div>
                  <h3 className="font-serif text-lg text-[#052B08] font-bold mb-2 group-hover:text-[#FF7B89] transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#052B08]/60 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
                
                {/* Open Chat Trigger */}
                <button
                  onClick={() => setActivePhoto(item)}
                  className="mt-4 w-full py-2 bg-[#F5F7F5] group-hover:bg-[#EEF7EE] text-[#052B08] border border-black/5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare size={12} className="text-[#FF7B89]" />
                  Read Customer Feedback
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {resultsData.length > 4 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-8 py-3.5 bg-[#052B08] hover:bg-[#08400C] text-white border border-[#052B08]/20 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer inline-flex items-center gap-2"
            >
              {isExpanded ? 'View Less' : 'View All Proofs'}
            </button>
          </div>
        )}
      </div>

      {/* Lightbox / Popup Modal */}
      <AnimatePresence>
        {activePhoto && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
              className="fixed inset-0 z-[999999] bg-black/85 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-x-4 top-[8%] bottom-[8%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[850px] md:max-w-full z-[9999999] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-black/5"
            >
              {/* Left Side: Photo Frame */}
              <div className="w-full md:w-1/2 bg-[#C1CDBF]/10 relative flex items-center justify-center p-4 min-h-[300px] md:min-h-0 border-b md:border-b-0 md:border-r border-black/5 overflow-hidden">
                <img 
                  src={activePhoto.image} 
                  alt={activePhoto.title} 
                  className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-xs"
                />
                
                {/* Photo Badge */}
                <span className="absolute top-4 left-4 bg-black/60 text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-xs">
                  {activePhoto.tag}
                </span>
              </div>

              {/* Right Side: Conversation Details */}
              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between text-left overflow-y-auto max-h-[40vh] md:max-h-full">
                <div>
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest font-bold text-[#FF7B89] block mb-1">Before & After Proof</span>
                      <h3 className="font-serif text-xl md:text-2xl text-[#052B08] font-bold leading-tight">{activePhoto.title}</h3>
                    </div>
                    <button
                      onClick={() => setActivePhoto(null)}
                      className="p-2 rounded-full hover:bg-black/5 text-gray-500 transition-colors shrink-0"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3">Conversation Log:</p>

                  {/* Chat bubble styling */}
                  <div className="bg-[#FAF9F5] border border-[#052B08]/5 p-5 rounded-3xl relative mb-6">
                    <QuoteIcon className="absolute -top-3 -left-3 text-[#FF7B89]/15 w-8 h-8 pointer-events-none" />
                    <p className="text-sm text-[#052B08]/85 leading-relaxed font-medium italic relative z-10">
                      "{activePhoto.reviewText}"
                    </p>
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#052B08]/5">
                      <div className="w-6 h-6 rounded-full bg-[#052B08]/10 text-[#052B08] font-bold text-[10px] flex items-center justify-center">
                        ✓
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#052B08]/60">
                        {activePhoto.reviewer}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer trust badge */}
                <div className="mt-4 pt-4 border-t border-black/5 flex items-center gap-3 text-gray-400">
                  <div className="w-5 h-5 rounded-full bg-[#2D7A3A]/10 text-[#2D7A3A] flex items-center justify-center text-[10px] shrink-0 font-bold">✓</div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 leading-tight">
                    100% genuine unedited customer screenshot
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

function QuoteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}
