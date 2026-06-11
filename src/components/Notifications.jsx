import React from 'react';
import { motion } from 'framer-motion';

export default function Notifications({ onBack }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen bg-[#070707] text-white p-6 md:p-12"
    >
      <button onClick={onBack} className="text-neutral-500 hover:text-white mb-8 text-sm">← Back to Shop</button>
      
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-black uppercase mb-8">Notifications</h2>
        <div className="space-y-4">
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="text-cyan-400 font-bold">New Arrival!</h4>
            <p className="text-sm text-neutral-400">The new Aerosound X-1 is now available for pre-order.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="text-white font-bold">Order Confirmed</h4>
            <p className="text-sm text-neutral-400">Your recent order #1234 has been processed.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}