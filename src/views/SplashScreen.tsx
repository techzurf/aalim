import React from 'react';
import { motion } from 'motion/react';

export const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  return (
    <div className="mobile-container h-screen bg-primary flex flex-col items-center justify-center p-8 overflow-hidden z-[100] fixed inset-0">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        onAnimationComplete={onFinish}
        className="flex flex-col items-center space-y-6"
      >
        <div className="relative">
          <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="absolute -inset-8 border border-white/10 rounded-full" 
          />
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center shadow-2xl relative z-10 overflow-hidden"
          >
             <div className="absolute inset-0 bg-accent opacity-5" />
             <span className="text-4xl font-serif italic text-primary font-bold tracking-tighter">N</span>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center space-y-2 relative z-10"
        >
          <h1 className="text-4xl font-serif italic text-white font-bold tracking-tight">Noor Staffing</h1>
          <p className="text-[10px] text-accent font-bold uppercase tracking-[0.4em] pt-1">The Aalim Network</p>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 flex flex-col items-center space-y-4"
      >
        <div className="flex space-x-1">
           {[0, 1, 2].map((i) => (
             <motion.div 
               key={i}
               animate={{ opacity: [0.3, 1, 0.3] }}
               transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
               className="w-1.5 h-1.5 bg-accent rounded-full"
             />
           ))}
        </div>
        <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Bridging Masjids & Communities</p>
      </motion.div>
    </div>
  );
};
