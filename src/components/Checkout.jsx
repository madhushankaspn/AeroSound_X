import React from 'react';
import { motion } from 'framer-motion';

export default function Checkout({ cartItems, subTotal, onBack }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen bg-[#070707] text-white p-6 md:p-12"
    >
      <button 
  onClick={onBack} 
  className="text-neutral-500 hover:text-white mb-8 text-sm"
>
  ← Back to Collections
</button>
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* වම් පැත්ත: Shipping & Payment */}
        <div className="space-y-8">
          <h2 className="text-3xl font-black uppercase tracking-widest">Checkout</h2>
          
          <div className="space-y-4">
            <h3 className="text-cyan-400 text-xs tracking-[0.2em] uppercase">Shipping Information</h3>
            <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 p-4 rounded-lg focus:outline-none focus:border-cyan-500" />
            <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 p-4 rounded-lg focus:outline-none focus:border-cyan-500" />
            <input type="text" placeholder="Shipping Address" className="w-full bg-white/5 border border-white/10 p-4 rounded-lg focus:outline-none focus:border-cyan-500" />
          </div>

          <div className="space-y-4">
            <h3 className="text-cyan-400 text-xs tracking-[0.2em] uppercase">Payment</h3>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex items-center justify-between">
              <span>Credit Card</span>
              <div className="flex gap-2">
                <div className="w-8 h-5 bg-neutral-800 rounded"></div>
                <div className="w-8 h-5 bg-neutral-800 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 h-fit">
          <h3 className="font-bold mb-6">Order Summary</h3>
          <div className="space-y-4 mb-8">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span>{item.price}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-4 flex justify-between text-xl font-bold">
            <span>Total</span>
            <span className="text-cyan-400">${subTotal.toFixed(2)}</span>
          </div>
          <button className="w-full mt-8 bg-cyan-500 text-black font-bold py-4 rounded-lg hover:bg-cyan-400 transition-all">
            Confirm Payment
          </button>
        </div>
      </div>
    </motion.div>
  );
}