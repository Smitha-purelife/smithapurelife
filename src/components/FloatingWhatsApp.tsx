import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function FloatingWhatsApp() {
  const whatsappNumber = "916385338676";
  const whatsappMessage = encodeURIComponent("Hello! I have a question about Smitha Purelife products.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  
  const [isDraggingWa, setIsDraggingWa] = useState(false);
  const [isDraggingGift, setIsDraggingGift] = useState(false);
  
  const dragRefWa = useRef<HTMLDivElement>(null);
  const dragRefGift = useRef<HTMLDivElement>(null);
  
  const navigate = useNavigate();

  const handleWaClick = (e: React.MouseEvent) => {
    if (isDraggingWa) e.preventDefault();
  };

  const handleGiftClick = (e: React.MouseEvent) => {
    if (isDraggingGift) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    navigate('/rewards');
  };

  return (
    <>
      {/* Rewards/Gift Button (Independently Draggable) */}
      <motion.div
        ref={dragRefGift}
        drag
        dragConstraints={{ left: -1000, right: 0, top: -1000, bottom: 0 }}
        dragElastic={0.1}
        dragMomentum={false}
        onDragStart={() => setIsDraggingGift(true)}
        onDragEnd={() => {
          setTimeout(() => setIsDraggingGift(false), 100);
        }}
        className="fixed bottom-[5.5rem] right-6 z-[9999] cursor-grab active:cursor-grabbing"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 20 }}
      >
        <button
          onClick={handleGiftClick}
          className="flex items-center justify-center w-20 h-20 bg-transparent rounded-full group pointer-events-auto relative"
          aria-label="Send Gifts & Rewards"
        >
          {/* Animated Sparkles */}
          <span className="absolute inset-0 pointer-events-none">
            <span className="absolute top-0 right-0 text-yellow-300 text-sm animate-[twinkle_1.4s_ease-in-out_infinite]">✦</span>
            <span className="absolute top-1 left-0 text-yellow-200 text-xs animate-[twinkle_1.8s_ease-in-out_0.4s_infinite]">✧</span>
            <span className="absolute bottom-1 left-1 text-yellow-400 text-xs animate-[twinkle_1.5s_ease-in-out_0.8s_infinite]">✦</span>
            <span className="absolute top-1/2 -right-1 text-yellow-200 text-xs animate-[twinkle_2s_ease-in-out_0.2s_infinite]">✧</span>
            <span className="absolute -top-1 left-1/2 text-white text-xs animate-[twinkle_1.6s_ease-in-out_1s_infinite]">✦</span>
          </span>

          {/* Realistic 3D Gift Box Photo */}
          <motion.img
            src="/gift_box_3d.png"
            alt="Rewards & Gifts"
            className="w-20 h-20 object-contain pointer-events-none"
            style={{ filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.4))' }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.15 }}
          />

          {/* Tooltip */}
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white text-[#052B08] text-xs font-bold rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Send Gifts & Rewards
          </span>
        </button>
      </motion.div>

      {/* WhatsApp Button (Independently Draggable) */}
      <motion.div
        ref={dragRefWa}
        drag
        dragConstraints={{ left: -1000, right: 0, top: -1000, bottom: 0 }}
        dragElastic={0.1}
        dragMomentum={false}
        onDragStart={() => setIsDraggingWa(true)}
        onDragEnd={() => {
          setTimeout(() => setIsDraggingWa(false), 100);
        }}
        className="fixed bottom-6 right-6 z-[9999] cursor-grab active:cursor-grabbing"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWaClick}
          className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg shadow-[#25D366]/30 hover:bg-[#20bd5a] transition-colors duration-300 group pointer-events-auto relative"
          aria-label="Chat with us on WhatsApp"
          draggable="false"
        >
          <svg 
            viewBox="0 0 24 24" 
            width="32" 
            height="32" 
            className="fill-current pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          
          <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-75 pointer-events-none"></span>

          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white text-[#052B08] text-xs font-bold rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Chat with us!
          </span>
        </a>
      </motion.div>
    </>
  );
}
