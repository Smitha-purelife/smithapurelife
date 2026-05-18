import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Copy } from 'lucide-react';

export default function NewsletterVIP() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const code = 'PURE15';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 bg-[#1A4B21] relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#F8CD71]/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#FF7B89]/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[11px] uppercase tracking-[0.4em] text-[#F8CD71] font-bold mb-3"
        >
          Join the Smitha Purelife Family
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif text-white mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Get 15% off your<br />
          <span className="italic text-[#F8CD71]">first order</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/60 mb-10 max-w-sm mx-auto"
        >
          Subscribe to our newsletter for exclusive offers, early access to new launches, and personalised hair care tips from our botanists.
        </motion.p>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm outline-none focus:border-[#F8CD71]/60 focus:bg-white/15 transition-all"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-4 bg-[#F8CD71] text-[#1A4B21] rounded-full font-bold text-sm uppercase tracking-wider flex items-center gap-2 whitespace-nowrap hover:bg-white transition-colors"
              >
                Subscribe <ArrowRight size={16} />
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 border border-white/20 rounded-2xl p-8 max-w-md mx-auto"
            >
              <CheckCircle2 size={40} className="text-[#F8CD71] mx-auto mb-4" />
              <h3 className="text-white font-serif text-2xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Welcome to the family! 🌿
              </h3>
              <p className="text-white/60 text-sm mb-6">
                Your exclusive discount code is ready. Use it at checkout:
              </p>
              <div className="flex items-center justify-center gap-3 bg-white/10 rounded-xl px-5 py-4 border border-[#F8CD71]/30">
                <span className="text-[#F8CD71] font-bold text-xl tracking-widest font-mono">{code}</span>
                <button
                  onClick={handleCopy}
                  className="text-white/50 hover:text-[#F8CD71] transition-colors"
                >
                  {copied ? <CheckCircle2 size={18} className="text-[#F8CD71]" /> : <Copy size={18} />}
                </button>
              </div>
              {copied && <p className="text-[#F8CD71] text-xs mt-2">Copied to clipboard!</p>}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-white/30 text-[11px] mt-6"
        >
          No spam, ever. Unsubscribe at any time. By subscribing you agree to our privacy policy.
        </motion.p>
      </div>
    </section>
  );
}
