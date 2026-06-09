import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, Send, Copy, Check, Users, MessageSquare, Instagram, Facebook, Award, Sparkles, X } from 'lucide-react';
import Footer from './Footer';
import NewsletterVIP from './NewsletterVIP';

interface RewardStep {
  title: string;
  offer: string;
  description: string;
  actionLabel: string;
  icon: any;
  color: string;
  accent: string;
  onAction: () => void;
}

export default function RewardsPage() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [showBirthdayModal, setShowBirthdayModal] = useState(false);
  const [showInfluencerModal, setShowInfluencerModal] = useState(false);
  const [birthdayWish, setBirthdayWish] = useState('');
  const [birthdayName, setBirthdayName] = useState('');
  const [birthdayEmail, setBirthdayEmail] = useState('');

  // Handle Copy Referral Link
  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://smithapurelife.com/ref?code=PURELOVE5_10');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Open WhatsApp for customized gift packs
  const handleGiftPackWhatsApp = () => {
    const text = encodeURIComponent(
      "Hi Smitha Purelife, I'm interested in designing a customized natural care gift pack. My budget is around ₹____ and the occasion is _____. Please guide me!"
    );
    window.open(`https://wa.me/916385338676?text=${text}`, '_blank');
  };

  const steps: RewardStep[] = [
    {
      title: 'Refer a Friend',
      offer: '5% / 10% OFF',
      description: 'Invite your friends to experience Smitha Purelife. They get 5% off, and you get 10% off when they order!',
      actionLabel: copiedLink ? 'Copied Link!' : 'Copy Referral Link',
      icon: Users,
      color: '#EEF7EE',
      accent: '#2D7A3A',
      onAction: handleCopyLink,
    },
    {
      title: 'Share on Story',
      offer: '5% OFF',
      description: 'Post a photo/video of our products on your Instagram or Facebook Story and tag @smitha_purelife.',
      actionLabel: 'Submit Screenshot',
      icon: Instagram,
      color: '#FAF3EE',
      accent: '#D4A373',
      onAction: () => {
        window.open('https://wa.me/916385338676?text=Hi! I shared a story tagging you. Here is my screenshot proof: ', '_blank');
      },
    },
    {
      title: 'Post & Tag Us',
      offer: '15% OFF',
      description: 'Post a dedicated photo/video on your profile feed highlighting your Smitha Purelife ritual and tag us.',
      actionLabel: 'Claim 15% Off Code',
      icon: Award,
      color: '#E9D5CA',
      accent: '#B85C38',
      onAction: () => {
        window.open('https://wa.me/916385338676?text=Hi! I created a post tagging you on social media. I would love to claim my 15% discount code.', '_blank');
      },
    },
    {
      title: 'Leave a Social Review',
      offer: '5% OFF',
      description: 'Leave an honest review on our social media pages (Facebook, Instagram, Google & other social media platforms) and share your botanical experience with us. ✨',
      actionLabel: 'Send Review Proof',
      icon: MessageSquare,
      color: '#DBCDF0',
      accent: '#6B4C8B',
      onAction: () => {
        window.open('https://wa.me/916385338676?text=Hi! I just left a review on your social page. Here is my proof to claim my 5% off code: ', '_blank');
      },
    }
  ];

  return (
    <div className="bg-[#C1CDBF] min-h-screen pt-[76px] overflow-x-hidden text-[#2D2A26]">
      
      {/* Hero Banner (Redesigned) */}
      <section className="relative pt-12 pb-20 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left pt-10 md:pt-0">
              <motion.span 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[11px] sm:text-xs tracking-[0.2em] font-bold text-[#556B47] uppercase mb-4 block"
              >
                Smitha Purelife Loyalty Program
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] text-[#2C4A22]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Rewards &<br/>Experience
              </motion.h1>
              
              {/* Divider */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center md:justify-start my-8"
              >
                <div className="h-[1px] w-24 bg-[#556B47]/40"></div>
                <div className="mx-4 text-[#556B47]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C12 22 12 16 12 14M12 14C12 14 8 15 6 12C4 9 6 6 12 6C12 6 14 5 16 7C18 9 17 13 12 14ZM12 14C12 14 16 15 18 12C20 9 18 6 12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="h-[1px] w-24 bg-[#556B47]/40"></div>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[#4A4A4A] text-base sm:text-lg max-w-lg mx-auto md:mx-0 leading-relaxed font-medium"
              >
                Earn generous discounts, customized gifts, and exclusive botanical rewards by sharing your natural hair journey with our family.
              </motion.p>
            </div>

            {/* Right Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex-1 relative flex justify-center md:justify-end"
            >
              <img 
                src="/rewards_hero_gift.png" 
                alt="Smitha Purelife Rewards Gift Box" 
                className="w-full max-w-[450px] h-auto object-contain drop-shadow-sm"
                style={{ mixBlendMode: 'multiply' }}
              />
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Rewards Steps Grid */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#FF7B89] mb-2 block">Share & Earn</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#052B08] font-bold">Steps to Unlock Discounts</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-black/5 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left group"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                      style={{ backgroundColor: step.accent }}
                    >
                      <Icon size={22} />
                    </div>
                    <span 
                      className="text-xs font-bold px-3 py-1.5 rounded-full font-inter"
                      style={{ backgroundColor: step.color, color: step.accent }}
                    >
                      {step.offer}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-[#052B08] font-bold mb-2.5 leading-tight">{step.title}</h3>
                  <p className="text-xs text-[#052B08]/75 leading-relaxed font-medium mb-6">{step.description}</p>
                </div>

                <button
                  onClick={step.onAction}
                  className="w-full py-3 bg-[#052B08] hover:bg-[#FF7B89] text-white font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-xs duration-300 active:scale-97 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {step.title === 'Refer a Friend' && copiedLink ? <Check size={12} /> : null}
                  {step.actionLabel}
                </button>
              </motion.div>
            );
          })}

          {/* Static Social Media Links Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-black/5 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left group"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                  style={{ backgroundColor: '#1877F2' }}
                >
                  <Facebook size={22} />
                </div>
                <span 
                  className="text-xs font-bold px-3 py-1.5 rounded-full font-inter"
                  style={{ backgroundColor: '#EAF4F4', color: '#1877F2' }}
                >
                  CONNECT
                </span>
              </div>

              <h3 className="font-serif text-xl text-[#052B08] font-bold mb-2.5 leading-tight">Join Our Community</h3>
              <p className="text-xs text-[#052B08]/75 leading-relaxed font-medium mb-6">Connect with us on social media for botanical hair care tips, exclusive community updates, and to chat with our support team!</p>
            </div>

            <div className="flex gap-2 mt-auto">
              <a
                href="https://www.instagram.com/smitha_purelife?igsh=MWd1cjgyeWp3eG0wdw==" target="_blank" rel="noopener noreferrer"
                className="flex-1 py-3 bg-[#FAF3EE] hover:bg-[#833AB4] text-[#833AB4] hover:text-white font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-xs duration-300 active:scale-97 flex items-center justify-center"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/share/1HJQ6T762s/" target="_blank" rel="noopener noreferrer"
                className="flex-1 py-3 bg-[#EAF4F4] hover:bg-[#1877F2] text-[#1877F2] hover:text-white font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-xs duration-300 active:scale-97 flex items-center justify-center"
              >
                Facebook
              </a>
              <a
                href="https://wa.me/916385338676?text=Hi! I'm interested in Smitha Purelife products." target="_blank" rel="noopener noreferrer"
                className="flex-1 py-3 bg-[#EEF7EE] hover:bg-[#25D366] text-[#25D366] hover:text-white font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-xs duration-300 active:scale-97 flex items-center justify-center"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Special Experiences & Perks */}
      <section className="py-20 bg-[#FAF9F5]/60 border-t border-b border-[#052B08]/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#FF7B89] mb-2 block">Premium Benefits</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#052B08] font-bold">Exclusive Club Perks</h2>
          </div>

          <div className="space-y-8 max-w-5xl mx-auto text-left">
            {/* Birthday Celebration */}
            <div className="bg-white rounded-[2.5rem] border border-black/5 p-6 md:p-10 shadow-xs flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              <div className="lg:w-2/3">
                <span className="text-3xl filter drop-shadow-sm mb-2 block">🎂</span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#052B08] font-bold mb-3">Birthday Month Celebration</h3>
                <p className="text-xs sm:text-sm text-[#052B08]/75 leading-relaxed font-medium">
                  It's your day, and we're happy to celebrate it with you! 🎉 Tell us what you'd love to receive a special gift or an exclusive offer, and if it's something we can do, we'll be happy to make it happen for you. We'll make your birthday month even more special. Because we care about our customers and love making them feel special. 💚🌿
                </p>
              </div>
              <div className="lg:w-1/3 w-full shrink-0">
                <button
                  onClick={() => setShowBirthdayModal(true)}
                  className="w-full py-4 bg-[#FF7B89] hover:bg-[#E05C6B] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-97 cursor-pointer"
                >
                  Send Birthday Request 🎉
                </button>
              </div>
            </div>

            {/* Testimonial & Influencer Rewards */}
            <div className="bg-white rounded-[2.5rem] border border-black/5 p-6 md:p-10 shadow-xs flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              <div className="lg:w-2/3">
                <span className="text-3xl filter drop-shadow-sm mb-2 block">🎥</span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#052B08] font-bold mb-3">Testimonial & Influencer Rewards</h3>
                <p className="text-xs sm:text-sm text-[#052B08]/75 leading-relaxed font-medium">
                  Love our products? Share your experience! 💚 Post a testimonial video and tag us. If you're an influencer or content creator, share our products with your audience and enjoy exciting surprise gifts, exclusive offers, and special rewards. Let's grow pure together!
                </p>
              </div>
              <div className="lg:w-1/3 w-full shrink-0">
                <button
                  onClick={() => setShowInfluencerModal(true)}
                  className="w-full py-4 bg-[#052B08] hover:bg-[#FF7B89] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-97 cursor-pointer"
                >
                  Join Creator Program 💚
                </button>
              </div>
            </div>

            {/* Customized Gift Packs */}
            <div className="bg-white rounded-[2.5rem] border border-black/5 p-6 md:p-10 shadow-xs flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              <div className="lg:w-2/3">
                <span className="text-3xl filter drop-shadow-sm mb-2 block">🎁</span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#052B08] font-bold mb-3">Customized Gift Packs</h3>
                <p className="text-xs sm:text-sm text-[#052B08]/75 leading-relaxed font-medium">
                  Want to gift something truly meaningful? 🌿 We create personalized gift packs based on your theme, occasion, and budget. <br />
                  <span className="italic block mt-3 font-semibold text-[#052B08] border-l-2 border-[#FF7B89] pl-3">
                    "Don't just give a gift—give a gift that shows you care about their health, happiness, and future."
                  </span>
                  <span className="block mt-2">
                    Tell us your idea, and we'll design a beautiful customized natural care gift pack just the way you want it.
                  </span>
                </p>
              </div>
              <div className="lg:w-1/3 w-full shrink-0">
                <button
                  onClick={handleGiftPackWhatsApp}
                  className="w-full py-4 bg-[#2D7A3A] hover:bg-[#1E5C28] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-97 cursor-pointer flex items-center justify-center gap-2"
                >
                  Design My Gift Pack (WhatsApp)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Birthday Celebration Modal */}
      <AnimatePresence>
        {showBirthdayModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBirthdayModal(false)}
              className="fixed inset-0 z-[999999] bg-black/70 backdrop-blur-xs"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="fixed inset-x-4 top-[15%] md:top-[20%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[500px] z-[9999999] bg-white p-6 md:p-8 rounded-[2rem] border border-black/5 shadow-2xl flex flex-col text-left max-h-[75vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-serif text-2xl text-[#052B08] font-bold">Make a Birthday Wish 🎂</h3>
                  <p className="text-[11px] text-gray-400 mt-1 uppercase font-bold tracking-wider">Celebrate with Smitha Purelife</p>
                </div>
                <button onClick={() => setShowBirthdayModal(false)} className="p-1 rounded-full hover:bg-black/5 text-gray-400">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Your Name</label>
                  <input 
                    type="text" 
                    value={birthdayName}
                    onChange={(e) => setBirthdayName(e.target.value)}
                    className="w-full bg-[#FAF9F5] border border-black/5 px-4 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#FF7B89] text-[#2D2A26]"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    value={birthdayEmail}
                    onChange={(e) => setBirthdayEmail(e.target.value)}
                    className="w-full bg-[#FAF9F5] border border-black/5 px-4 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#FF7B89] text-[#2D2A26]"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">What would you love to receive?</label>
                  <textarea 
                    value={birthdayWish}
                    onChange={(e) => setBirthdayWish(e.target.value)}
                    className="w-full bg-[#FAF9F5] border border-black/5 px-4 py-3 rounded-2xl text-xs font-semibold focus:outline-none focus:border-[#FF7B89] min-h-[100px] text-[#2D2A26]"
                    placeholder="E.g., A free hair serum sample, a special 20% discount code, etc."
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  if (!birthdayWish || !birthdayName || !birthdayEmail) {
                    alert("Please fill in all details!");
                    return;
                  }
                  const text = encodeURIComponent(
                    `Hi Smitha Purelife, I'd love to request a birthday gift! My Name: ${birthdayName}, Email: ${birthdayEmail}, Wish: ${birthdayWish}`
                  );
                  window.open(`https://wa.me/916385338676?text=${text}`, '_blank');
                  setShowBirthdayModal(false);
                }}
                className="mt-6 w-full py-4.5 bg-[#FF7B89] hover:bg-[#E05C6B] text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Send size={14} /> Submit Birthday Request via WhatsApp
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Influencer Program Modal */}
      <AnimatePresence>
        {showInfluencerModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInfluencerModal(false)}
              className="fixed inset-0 z-[999999] bg-black/70 backdrop-blur-xs"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="fixed inset-x-4 top-[15%] md:top-[20%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[500px] z-[9999999] bg-white p-6 md:p-8 rounded-[2rem] border border-black/5 shadow-2xl flex flex-col text-left max-h-[75vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-serif text-2xl text-[#052B08] font-bold">Join Creators Program 🎥</h3>
                  <p className="text-[11px] text-gray-400 mt-1 uppercase font-bold tracking-wider">Collaborate with Smitha Purelife</p>
                </div>
                <button onClick={() => setShowInfluencerModal(false)} className="p-1 rounded-full hover:bg-black/5 text-gray-400">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-[#052B08]/75 leading-relaxed font-semibold">
                  We love collaborating with influencers, beauty creators, and our passionate community members. <br /><br />
                  To join our creators circle, receive free PR packages, enjoy surprise gifts, and earn affiliate commissions, click below to connect with our brand manager on WhatsApp!
                </p>
              </div>

              <button
                onClick={() => {
                  const text = encodeURIComponent(
                    "Hi! I'm a content creator interested in collaborating with Smitha Purelife for testimonial videos and influencer rewards. Here is my profile handle: @____"
                  );
                  window.open(`https://wa.me/916385338676?text=${text}`, '_blank');
                  setShowInfluencerModal(false);
                }}
                className="mt-8 w-full py-4.5 bg-[#052B08] hover:bg-[#FF7B89] text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles size={14} className="text-[#F8CD71]" /> Connect on WhatsApp
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Newsletter */}
      <NewsletterVIP />

      {/* Footer */}
      <Footer />
    </div>
  );
}
