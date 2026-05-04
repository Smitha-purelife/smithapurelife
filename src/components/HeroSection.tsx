import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center bg-bg pt-20 overflow-hidden"
    >
      <div className="max-width w-full px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Content */}
          <div className="relative z-10 order-2 lg:order-1">
            <div className="overflow-hidden">
              <motion.p 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-body text-[10px] tracking-[0.4em] uppercase text-accent font-semibold mb-6"
              >
                Nature's finest alchemy
              </motion.p>
            </div>
            
            <h1 className="serif-title text-6xl md:text-8xl text-text leading-[0.9] mb-10">
              <span className="text-reveal">
                <motion.span 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  Purity in
                </motion.span>
              </span>
              <span className="text-reveal">
                <motion.span 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="block italic opacity-60"
                >
                  Every drop.
                </motion.span>
              </span>
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-body text-text/60 text-lg md:text-xl leading-relaxed mb-12 max-w-md"
            >
              Elevating hair wellness through ancient botanical wisdom 
              and modern organic science.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-12 py-6 bg-text text-bg rounded-full font-body text-[10px] tracking-[0.2em] uppercase hover:bg-accent transition-all duration-500 flex items-center justify-center gap-3 group relative overflow-hidden"
              >
                <span className="relative z-10">Shop Rituals</span>
                <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <motion.div 
                  className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                />
              </motion.button>
              <button className="w-full sm:w-auto px-12 py-6 border border-text/10 rounded-full font-body text-[10px] tracking-[0.2em] uppercase hover:bg-white/50 transition-all duration-500">
                Our Philosophy
              </button>
            </motion.div>
          </div>

          {/* Right: Image Side with 3D Tilt */}
          <div className="relative order-1 lg:order-2" style={{ perspective: 1000 }}>
            <motion.div 
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] rounded-[40px] overflow-hidden bg-sage-dark/10 shadow-2xl"
            >
              <motion.img 
                src="/products/hero-product.png" 
                alt="Smitha Purelife"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                style={{ translateZ: 50 }}
              />
              <div className="absolute inset-0 bg-accent/5 mix-blend-multiply" />
            </motion.div>
            
            {/* Floating Info with 3D Offset */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              style={{ rotateX, rotateY, translateZ: 100, transformStyle: "preserve-3d" }}
              className="absolute -bottom-10 -right-10 hidden md:block bg-white p-8 rounded-3xl shadow-2xl max-w-[200px] border border-text/5"
            >
              <p className="serif-title text-3xl text-text mb-2">100%</p>
              <p className="font-body text-[9px] tracking-[0.1em] uppercase text-text/40 leading-relaxed">
                Cold-pressed organic botanical extracts
              </p>
            </motion.div>
          </div>
        </div>
      </div>


      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <div className="w-px h-12 bg-gradient-to-b from-text/40 to-transparent" />
        <span className="font-body text-[8px] tracking-[0.3em] uppercase text-text">Scroll</span>
      </motion.div>
    </section>
  );
}

