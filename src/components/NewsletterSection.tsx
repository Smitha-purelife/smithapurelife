import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="section-padding bg-bg relative overflow-hidden">
      <div className="max-width">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="organic-card p-12 md:p-24 text-center relative overflow-hidden"
        >
          {/* Subtle background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

          <div className="relative z-10 max-w-xl mx-auto">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-body text-[10px] tracking-[0.4em] uppercase text-accent font-semibold mb-6"
            >
              The Inner Circle
            </motion.p>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="serif-title text-4xl md:text-6xl text-text mb-6"
            >
              Discover the <span className="italic opacity-60">Purelife ritual.</span>
            </motion.h2>
            <p className="font-body text-text/60 text-lg mb-10 leading-relaxed">
              Be the first to discover new botanical collections and receive 
              exclusive invitations to our seasonal rituals.
            </p>

            {!submitted ? (
              <motion.form 
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col md:flex-row gap-4"
              >
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address" 
                  className="flex-1 px-8 py-5 bg-white rounded-full font-body text-sm text-text placeholder:text-text/30 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all border border-text/5"
                  required 
                />
                <button 
                  type="submit" 
                  className="px-10 py-5 bg-text text-bg rounded-full font-body text-[10px] tracking-[0.2em] uppercase hover:bg-accent transition-colors flex items-center justify-center gap-3 group"
                >
                  Join Us
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-4 text-accent"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Check size={20} />
                </div>
                <span className="serif-title text-2xl">Thank you for joining.</span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

