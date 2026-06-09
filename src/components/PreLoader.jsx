import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_MESSAGES = [
  "Fetching Neural Profiles...",
  "Calibrating Haptic Drivers...",
  "Syncing Spatial Metadata...",
  "Mounting Acoustic Seal...",
  "Finalizing Audio Engine...",
  "System Ready."
];

export default function PreLoader({ setLoadingComplete }) {
  const [visualProgress, setVisualProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisualProgress((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(timer);
        return 100;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (visualProgress >= 100) {
      setMessageIndex(LOADING_MESSAGES.length - 1);
      return;
    }
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % (LOADING_MESSAGES.length - 1));
    }, 1200);
    return () => clearInterval(interval);
  }, [visualProgress]);

  useEffect(() => {
    if (visualProgress >= 100) {
      const timeout = setTimeout(() => {
        if (setLoadingComplete) setLoadingComplete(false);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [visualProgress, setLoadingComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.05,
        filter: "blur(15px)",
        transition: { duration: 0.8, ease: [0.83, 0, 0.17, 1] } 
      }}
      className="fixed inset-0 z-[999] bg-[#070707] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse" />
      
      <div className="relative flex flex-col items-center w-full max-w-sm px-6">
        <div className="relative mb-2 select-none">
          <span className="text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-800">
            {visualProgress}%
          </span>
          <div className="absolute inset-0 bg-white/5 blur-3xl -z-10" />
        </div>

        <div className="h-6 overflow-hidden mb-12">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              className="text-[10px] font-mono tracking-[0.3em] uppercase text-cyan-400/80 text-center"
            >
              {LOADING_MESSAGES[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="w-full h-[1px] bg-white/5 relative overflow-hidden">
          <motion.div 
            className="h-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
            initial={{ width: 0 }}
            animate={{ width: `${visualProgress}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
        </div>

        <div className="absolute bottom-[-150px] w-full flex justify-between opacity-20 font-mono text-[8px] tracking-widest uppercase">
          <span>Aero_Engine_v.2.04</span>
          <span>Status: CALIBRATING</span>
        </div>
      </div>

      <div className="absolute top-10 left-10 w-20 h-20 border-l border-t border-white/10" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-r border-b border-white/10" />
    </motion.div>
  );
}