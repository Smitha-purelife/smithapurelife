import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook, X } from 'lucide-react';

// WhatsApp SVG icon (lucide doesn't have it)
function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const WHATSAPP_NUMBER = '916385338676';
const WHATSAPP_MESSAGE = encodeURIComponent("Hi! I'm interested in Smitha Purelife products. Can you help me?");

const socialLinks = [
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/smitha_purelife?igsh=MWd1cjgyeWp3eG0wdw==',
    icon: <Instagram size={18} />,
    bg: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
    color: '#fff',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1HJQ6T762s/',
    icon: <Facebook size={18} />,
    bg: '#1877F2',
    color: '#fff',
  },
];

export default function FloatingSocialButtons() {
  const [socialOpen, setSocialOpen] = useState(false);

  return (
    <>
      {/* ── Floating WhatsApp Button (bottom-right) ── */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      className="fixed bottom-24 right-5 z-[99999] group"
        style={{ filter: 'drop-shadow(0 4px 16px rgba(37,211,102,0.45))' }}
      >
        <motion.div
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.94 }}
          className="w-14 h-14 rounded-full flex items-center justify-center text-white relative"
          style={{ background: '#25D366' }}
        >
          <WhatsAppIcon size={28} />
          {/* Ping ring animation */}
          <span className="absolute inset-0 rounded-full animate-ping opacity-25" style={{ background: '#25D366' }} />
        </motion.div>
        {/* Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#052B08] text-white text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Chat with us
        </span>
      </a>

      {/* ── Floating Social Media Cluster (bottom-left) ── */}
      <div className="fixed bottom-24 left-5 z-[99999] flex flex-col-reverse items-center gap-2.5">
        {/* Social links (expand upwards) */}
        <AnimatePresence>
          {socialOpen && socialLinks.map((link, i) => (
            <motion.a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              initial={{ opacity: 0, y: 20, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.7 }}
              transition={{ delay: i * 0.06, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg relative group"
              style={{ background: link.bg, color: link.color, filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.25))' }}
            >
              {link.icon}
              {/* Tooltip */}
              <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-[#052B08] text-white text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {link.label}
              </span>
            </motion.a>
          ))}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          onClick={() => setSocialOpen(v => !v)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          aria-label="Toggle social media links"
          className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300"
          style={{ background: socialOpen ? '#052B08' : 'linear-gradient(135deg,#1877F2,#833ab4)', filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.3))' }}
        >
          <AnimatePresence mode="wait">
            {socialOpen ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={18} />
              </motion.span>
            ) : (
              <motion.span key="share" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
