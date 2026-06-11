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
  targetProducts?: string[];
}

const resultsData: ResultCard[] = [
  {
    id: 'braid-growth',
    title: 'Hair Development & Thickness',
    tag: 'Regrowth & Volume',
    image: '/products/results_braid_growth.png',
    description: '1 month transformation showing noticeable braid density and length development without hairfall.',
    reviewer: 'Verified Customer chat',
    reviewText: 'Thank you so much sister.. it\'s a wow product really I can see my hair development without dandruff and hairfall. This product perfectly suited to my hair and within 1 month I saw my hair\'s result. It was easy and smoothen to apply and has a lovely fragrance. And at last it was an good and amazing product.. Thank you for your recommendation..',
    targetProducts: ['radiance-oil', 'herbal-wash', 'avosilk-bloom', 'complete-hair-kit']
  },
  {
    id: 'dandruff-control',
    title: 'Scalp Cleansing & Dandruff Control',
    tag: 'Scalp Detox',
    image: '/products/results_dandruff.jpg',
    description: 'Before & After scalp view showing complete reduction of dandruff flakes and dry patch clearance.',
    reviewer: 'Scalp Treatment User',
    reviewText: 'My dandruff flakes are completely gone after just 3 washes with the Herbal Hair Wash powder paste. My scalp doesn\'t itch anymore and feels extremely clean and refreshed!',
    targetProducts: ['herbal-wash', 'radiance-oil', 'complete-hair-kit']
  },
  {
    id: 'comb-hairfall',
    title: 'Comb Test Hair Fall Reduction',
    tag: 'Hair Fall Control',
    image: '/products/results_comb_hairfall.png',
    description: 'Significant decrease in daily hair breakage and loss on comb after 4 weeks of Radiance Hair Oil massage.',
    reviewer: 'Verified Buyer',
    reviewText: 'Look at the difference on my comb! I used to lose a handful of hair every time I combed. Now, after using the Radiance Hair Oil for a few weeks, my hair breakage is almost zero. Highly recommended!',
    targetProducts: ['radiance-oil', 'complete-hair-kit']
  },
  {
    id: 'palm-hairfall',
    title: 'Root Strengthening Progress',
    tag: 'Anti Hair Fall',
    image: '/products/results_hairfall_palm.png',
    description: 'Daily hairfall reduction verified from actual customer progress, showing root strengthening results.',
    reviewer: 'Customer review chat',
    reviewText: 'Thank you so much mam! The hair fall has reduced by 85% in just two weeks of applying the oil warm. The roots feel so much stronger and my hair texture has improved.',
    targetProducts: ['radiance-oil', 'complete-hair-kit']
  },
  {
    id: 'nivetha-oil-conditioner',
    title: 'Hair Texture & Fall Control',
    tag: 'Hair Fall Control',
    image: '/products/results_nivetha_chat.png',
    description: 'Customer feedback verifying significant hairfall reduction and avocado conditioner fragrance.',
    reviewer: 'Verified Buyer',
    reviewText: 'Hii mam unga hair oil romba nallarukku En hair fall nallave reduce agiduchi i loved it 🥰 ennala nambave mudiyala mam and avacado conditioner really super fregrance romba nallarukku mam. 1/2 litre bottle available irukka',
    targetProducts: ['radiance-oil', 'avosilk-bloom', 'complete-hair-kit']
  },
  {
    id: 'instagram-comb-test',
    title: '7-Wash Visible Progress',
    tag: 'Anti Hair Fall',
    image: '/products/results_instagram_comb.png',
    description: 'Daily hair fall control progress showing strong, healthy hair and comb test results.',
    reviewer: 'Verified Buyer',
    reviewText: 'Gud afternoon mam After just 7 washes I saw visible hair fall reduction . I am so happy because before using this product I couldn\'t even comb my hair properly ena avlo hair fall irundhuchu 😢. But once I left chemicals and started using your natural products, I feel a big difference .sathiyama Now my hair feels healthy and strong. Romba happy ah iruku... thank you mam keep on doing.',
    targetProducts: ['radiance-oil', 'herbal-wash', 'complete-hair-kit']
  },
  {
    id: 'altogether-wash-powder',
    title: 'One-Wash Softness & Shine',
    tag: 'Frizz & Softness',
    image: '/products/results_altogether_wash.png',
    description: 'Wholesome, frizz-free and soft hair transformation after a single wash.',
    reviewer: 'Verified Buyer',
    reviewText: 'Altogether in one wash itself was wholesome sooo good frizz free and so soft .many asked about it they liked this ingredients and product just by seeing its ingredients itself many orders are awaiting for you soon will say you🥰🫶. Just loved it 😻',
    targetProducts: ['herbal-wash', 'complete-hair-kit']
  },
  {
    id: 'complete-haircare-kit',
    title: 'Complete Haircare Kit Results',
    tag: 'Hair Care Kit',
    image: '/products/results_haircare_kit.png',
    description: 'Visible hair fall and dandruff reduction with natural scent addiction.',
    reviewer: 'Verified Buyer',
    reviewText: 'Hai mam I purchased hair care kit from you it\'s really awesome result and I\'m completely love with natureee 💯 my hair is too strong and healthy now , i saw my visible hair fall redhction and dandruff. Your condtiner is next level mam I\'m just addicted to thta natural smell 😍🥰',
    targetProducts: ['radiance-oil', 'herbal-wash', 'avosilk-bloom', 'complete-hair-kit']
  },
  {
    id: 'nafia-smoothness-dandruff',
    title: 'Smoothness & Dandruff Clearance',
    tag: 'Scalp Detox',
    image: '/products/results_nafia_chat.png',
    description: 'Smooth hair feel and dandruff clearance from the first wash.',
    reviewer: 'Verified Buyer',
    reviewText: 'Actual from the first use itself i feel my hair become so smooth. And how to use that shampoo. I just take some amount and mix with water and applied. And i feel like dandruff also gone. I really liked i will inform my journey. And will stay connect with u',
    targetProducts: ['herbal-wash', 'complete-hair-kit']
  },
  {
    id: 'volume-thickness-growth',
    title: '2-Month Hair Volume Progress',
    tag: 'Volume & Thickness',
    image: '/products/results_hair_growth_2.jpg',
    description: 'Visible improvements in thickness, volume, and texture showing healthy hair ends after 2 months.',
    reviewer: 'Volume Transformation Journey',
    reviewText: 'BEFORE Day 1: Thin Hair, Less Volume, Frizzy & Dry, Uneven Ends. AFTER After 2 Months: Thicker Hair, More Volume, Less Frizz, Healthy Ends. The results speak for themselves with a dramatic change in thickness and overall hair health!',
    targetProducts: ['radiance-oil', 'avosilk-bloom', 'herbal-wash', 'complete-hair-kit']
  },
  {
    id: 'wndha-serum-glassy',
    title: 'Glassy Shine & Softness',
    tag: 'Frizz Control',
    image: '/products/results_wndha_serum_chat.png',
    description: 'Customer feedback celebrating the glassy look and superb texture after using the hair serum.',
    reviewer: 'Tamilselvan SP91',
    reviewText: 'Wndha serum really super 💥🔥🔥 Glassy look nala eruku',
    targetProducts: ['pro-repair-serum', 'complete-hair-kit']
  },
  {
    id: 'lalli-conditioner-oil',
    title: 'Silky Texture & Nourished Roots',
    tag: 'Softness & Shine',
    image: '/products/results_conditioner_oil_chat.png',
    description: 'Detailed review highlighting frizz reduction and root strengthening with Radiance Hair Oil & Avocado Conditioner.',
    reviewer: 'Lalli',
    reviewText: 'Smitha Pure Life conditioner makes my hair feel soft and smooth after every wash. It helps reduce frizz and makes my hair more manageable. My hair feels silky and looks healthier after using this conditioner regularly. The hair oil is lightweight and absorbs well into the scalp. After regular use, I can see reduced hair fall and better hair texture. It gives good nourishment and makes my hair feel stronger.',
    targetProducts: ['radiance-oil', 'avosilk-bloom', 'complete-hair-kit']
  },
  {
    id: 'jency-hair-texture',
    title: 'Healthy Frizz-Free Texture',
    tag: 'Anti-Frizz',
    image: '/products/results_jency_hair_chat.png',
    description: 'Significant improvement in hair softness, manageability, and frizz reduction.',
    reviewer: 'Jency SP82',
    reviewText: 'I\'ve been using this hair product for a while now. My hair fall hasn\'t completely stopped yet, but I can clearly see a big difference in the texture of my hair. It feels much smoother, softer, and silkier than before. Frizz has reduced a lot and my hair looks healthier and more manageable after every wash. Even though I\'m still waiting to see results for hair fall control, I really love how this product makes my hair feel and look. Definitely happy with the shine and softness it gives ❤️',
    targetProducts: ['radiance-oil', 'avosilk-bloom', 'complete-hair-kit']
  },
  {
    id: 'follicra-bald-spot',
    title: 'Bald Spot Hair Regrowth',
    tag: 'Hair Regrowth',
    image: '/products/results_follicra_baldspot.png',
    description: 'Amazing progress tracking hair regrowth on hairline/bald spots from March 12 to April 7.',
    reviewer: 'Follicra Regrowth User',
    reviewText: 'Follicra Bald Spot Hair Regrowth Serum results showing visible progress: March 12 (initial bald spot), March 30 (new follicle growth), and April 7 (dense hairline regrowth and baby hair emergence).',
    targetProducts: ['follicra-regrowth', 'complete-hair-kit']
  },
  {
    id: 'farhana-wash-dandruff',
    title: 'Scalp Relief & Reduced Loss',
    tag: 'Scalp Detox',
    image: '/products/results_farhana_wash_chat.png',
    description: 'Farhana\'s feedback on the hair wash powder reducing dandruff, itching, and hair fall.',
    reviewer: 'Farhana SP87',
    reviewText: 'Yeahhh the hair wash powder it\'s sooo good to clean the scalp actually I have dandruff and itching problems but after wash it doesn\'t make itching and it\'s good before that I use shampoo but the hair loss while washing is more but using the powder it\'s less hair loss I felt happy to buy this I\'m damn sure I\'ll buy after finishing it. Thank you girl❤️',
    targetProducts: ['herbal-wash', 'complete-hair-kit']
  },
  {
    id: 'hairline-baby-growth',
    title: 'Hairline Baby Hair Growth',
    tag: 'Hair Regrowth',
    image: '/products/results_hairline_growth.png',
    description: 'Close-up photograph showing dense emergence of new baby hair along the hairline.',
    reviewer: 'Regrowth Progress Photo',
    reviewText: 'Customer hairline detail showing significant emergence and growth of new baby hairs after consistent serum and oil application.',
    targetProducts: ['follicra-regrowth', 'radiance-oil', 'complete-hair-kit']
  },
  {
    id: 'follicra-regrowth-feedback',
    title: 'Scalp Fuller & Baby Hair',
    tag: 'Hair Regrowth',
    image: '/products/results_follicra_feedback_chat.png',
    description: 'Happy customer sharing early results of Follicra Hair Regrowth Serum with new baby hairs.',
    reviewer: 'Verified Follicra User',
    reviewText: 'I\'ve been using Follicra Hair Regrowth Serum consistently on my bald spot ..and I\'m genuinely happy with the results. I\'ve noticed visible regrowth, baby hairs coming in, and my scalp looks much fuller than before. I didn\'t expect to see such a positive change with a natural product. I\'ll share my before & after pictures next week',
    targetProducts: ['follicra-regrowth', 'complete-hair-kit']
  },
  {
    id: 'nafia-engagement-frizz',
    title: 'Frizz-Free Event Hair',
    tag: 'Frizz Control',
    image: '/products/results_nafia_engagement_chat.png',
    description: 'Nafia\'s engagement experience with hair staying smooth and frizz-free without setting sprays.',
    reviewer: 'Nafia SP32',
    reviewText: 'And everyone asked me how ur hair is looking so good without even setting spray for hair because even i everyones hair is becoming frizzy and baby hairs are looking weird my hair still look same',
    targetProducts: ['avosilk-bloom', 'pro-repair-serum', 'complete-hair-kit']
  },
  {
    id: 'bhavani-3month-review',
    title: '3-Month Holistic Progress',
    tag: 'Hair Growth',
    image: '/products/results_bhavani_3month_chat.png',
    description: 'Detailed feedback after 3 months of using the wash powder, avocado conditioner, and onion hair oil.',
    reviewer: 'Bhavani SP13',
    reviewText: 'Coming to the products, I truly enjoy using the hair wash powder. Every wash feels so refreshing and the smell is lovely. It gives me that traditional, clean, washed-hair feeling that I really love. The avocado conditioner has helped reduce my frizz and my hair feels much softer after using it. I also got the onion hair oil. I\'m still testing it, but so far it\'s been good. I\'ve started noticing quite a lot of baby hair growth, which honestly makes me very happy.',
    targetProducts: ['radiance-oil', 'herbal-wash', 'avosilk-bloom', 'complete-hair-kit']
  },
  {
    id: 'silk-gloss-chat',
    title: 'Silk Gloss Frizz Control',
    tag: 'Frizz Control',
    image: '/products/results_silk_gloss_chat.png',
    description: 'Customer review praising the Silk Gloss Serum for controlling frizz and adding shine without grease.',
    reviewer: 'Verified Buyer',
    reviewText: 'I\'m been using Silk Gloss Serum regularly, and my hair feels much smoother, softer, and easier to manage. It helps control frizz, adds a healthy shine, and leaves my hair looking silky without feeling greasy. I\'m really loving the results! I\'m in love with this serum and this natural smell , so satisfied',
    targetProducts: ['pro-repair-serum', 'complete-hair-kit']
  },
  {
    id: 'hair-transformation-3',
    title: 'Frizz Control & Smoothness',
    tag: 'Frizz Control',
    image: '/products/results_hair_transformation_3.jpg',
    description: 'Amazing before & after hair transformation showing frizz control and smooth texture alignment.',
    reviewer: 'Smooth Hair Transformation',
    reviewText: 'BEFORE vs AFTER: Complete frizz removal and silky alignment. Visible shine and smoothness improvement after using the Silk Gloss Serum.',
    targetProducts: ['pro-repair-serum', 'radiance-oil', 'complete-hair-kit']
  },
  {
    id: 'hair-transformation-4',
    title: 'Silky Straight Alignment',
    tag: 'Softness & Shine',
    image: '/products/results_hair_transformation_4.jpg',
    description: 'Before & after results showing silky, straight alignment and reduced dryness.',
    reviewer: 'Silky Alignment Journey',
    reviewText: 'BEFORE vs AFTER: Frizzy and dry hair transformed to silky, straight, and manageable hair with a healthy shine.',
    targetProducts: ['pro-repair-serum', 'radiance-oil', 'complete-hair-kit']
  }
];

export default function TransformationsGallery({ productId }: { productId?: string }) {
  const [activePhoto, setActivePhoto] = useState<ResultCard | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredData = productId ? resultsData.filter(r => {
    if (!r.targetProducts) return true;
    if (productId === 'daily-3step') {
      return r.targetProducts.some(p => ['radiance-oil', 'herbal-wash', 'avosilk-bloom', 'complete-hair-kit'].includes(p));
    }
    if (productId === 'complete-haircare') {
      return r.targetProducts.some(p => ['radiance-oil', 'herbal-wash', 'avosilk-bloom', 'pro-repair-serum', 'complete-hair-kit'].includes(p));
    }
    if (productId === 'smooth-silky') {
      return r.targetProducts.some(p => ['avosilk-bloom', 'pro-repair-serum', 'complete-hair-kit'].includes(p));
    }
    if (productId === 'transformation') {
      return true; // The full combo matches all reviews
    }
    return r.targetProducts.includes(productId);
  }) : resultsData;
  const visibleReviews = isExpanded ? filteredData : filteredData.slice(0, 4);

  if (filteredData.length === 0) return null;

  return (
    <section id="proofs" className="py-20 bg-[#FAF9F5]/70 border-t border-[#052B08]/5 scroll-mt-24">
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
              className="fixed inset-x-4 top-[8%] bottom-[8%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[850px] md:max-w-full z-[9999999] bg-white rounded-[2.5rem] shadow-2xl overflow-y-auto md:overflow-hidden flex flex-col md:flex-row border border-black/5"
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
