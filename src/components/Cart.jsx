import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cart({ isOpen, onClose, cartItems, updateQuantity, removeFromCart, onCheckout }) {
  
  
  const subTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 cursor-pointer"
          />

          {}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#0A0A0A] border-l border-white/10 z-50 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
          >
            {/* 1. Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <h2 className="font-['Montserrat'] text-xl font-black text-white uppercase tracking-wider">Your Cart</h2>
                <span className="bg-cyan-500/20 text-cyan-400 text-xs font-bold px-2 py-1 rounded-full">
                  {cartItems.length}
                </span>
              </div>
              <button 
                onClick={onClose}
                className="text-neutral-400 hover:text-white transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* 2. Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-neutral-500">
                  <p className="text-sm tracking-widest uppercase">Cart is empty</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                    {/* Image */}
                    <div className="w-20 h-20 bg-black/50 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src={item.thumb} alt={item.name} className="w-full h-full object-contain p-2" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-white font-bold text-sm">{item.name}</h3>
                          <button onClick={() => removeFromCart(item.id)} className="text-neutral-500 hover:text-red-400 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          </button>
                        </div>
                        <p className="text-cyan-400 text-xs font-mono mt-1">${item.price.toFixed(2)}</p>
                      </div>

                      {/* Quantity Control */}
                      <div className="flex items-center space-x-3 mt-2 bg-black/40 w-max rounded-lg border border-white/10 px-2">
                        <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 text-neutral-400 hover:text-white">-</button>
                        <span className="text-white text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 text-neutral-400 hover:text-white">+</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 3. Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#0A0A0A]">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-neutral-400 text-sm tracking-wider">SUBTOTAL</span>
                  <span className="text-2xl font-black text-white">${subTotal.toFixed(2)}</span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase text-xs tracking-[0.2em] hover:bg-cyan-400 transition-all"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}