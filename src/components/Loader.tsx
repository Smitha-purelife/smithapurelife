import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ 
        y: "-100%",
        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
      }}
      className="fixed inset-0 z-[100] bg-text flex flex-col items-center justify-center"
    >
      <div className="relative overflow-hidden mb-8">
        <motion.h1 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="serif-title text-4xl md:text-6xl text-bg tracking-tight"
        >
          Smitha Purelife
        </motion.h1>
      </div>
      
      <div className="w-48 h-[1px] bg-bg/10 relative overflow-hidden">
        <motion.div 
          className="absolute inset-y-0 left-0 bg-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        className="font-body text-[10px] tracking-[0.4em] uppercase text-bg mt-6"
      >
        Cultivating Purity — {progress}%
      </motion.p>
    </motion.div>
  );
}
