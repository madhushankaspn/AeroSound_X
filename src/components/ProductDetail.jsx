import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { Headphones } from './Headphones'; 

const COLOR_OPTIONS = [
  { id: 'cyan', name: 'Neon Cyber', hex: '#22d3ee', meshColor: '#22d3ee' },
  { id: 'matte-black', name: 'Stealth Void', hex: '#171717', meshColor: '#1a1a1a' },
  { id: 'crimson', name: 'Crimson Volt', hex: '#ef4444', meshColor: '#ef4444' },
];

export default function ProductDetail({ product, onBack, addToCart }) {
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [quantity, setQuantity] = useState(1);

  const currentProduct = product || {
    id: 'default',
    name: 'AeroSound X-1',
    price: '$299.00',
    desc: 'Experience pure auditory bliss with hybrid active noise cancellation, bio-cellulose drivers, and up to 60 hours of uncompromised wireless playback.',
    thumb: '/images/blue_thumb.png',
    scale: 2.5 
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white flex flex-col md:flex-row items-center justify-center p-6 md:p-12 gap-8 pt-24 relative">
      <button 
        onClick={onBack} 
        className="flex items-center text-neutral-500 hover:text-white transition-colors mb-8"
      >
        ← BACK TO SHOP
      </button>
      
      <div className="w-full md:w-1/2 h-[50vh] md:h-[70vh] relative bg-gradient-to-b from-neutral-900/20 to-transparent rounded-3xl border border-white/5">
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
          <directionalLight position={[-5, 3, -2]} intensity={0.5} />
          <pointLight position={[0, 3, 0]} intensity={1} color={selectedColor.hex} />
          
          <Suspense fallback={null}>
            <Center>
              {}
              <Headphones 
                modelPath={currentProduct.modelPath}
                customColor={selectedColor.meshColor} 
                scale={currentProduct.scale || 2.5} 
              />
            </Center>
          </Suspense>
          
          <OrbitControls 
            enableZoom={false} 
            maxPolarAngle={Math.PI / 2} 
            minPolarAngle={Math.PI / 3} 
          />
        </Canvas>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-mono tracking-widest text-neutral-400 uppercase pointer-events-none">
          ← Drag to rotate 3D model →
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col max-w-md">
        <span className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-2">AERO SERIES</span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 uppercase">{currentProduct.name}</h1>
        <p className="text-2xl font-mono text-neutral-300 mb-6">{currentProduct.price}</p>
        
        <p className="text-sm text-neutral-400 leading-relaxed mb-8">
          {currentProduct.desc}
        </p>

        <div className="grid grid-cols-3 gap-4 border-y border-white/5 py-4 mb-8">
          <div className="text-center border-r border-white/5">
            <p className="text-xs text-neutral-500 font-mono">ANC</p>
            <p className="text-sm font-bold mt-1 text-cyan-400">-45dB</p>
          </div>
          <div className="text-center border-r border-white/5">
            <p className="text-xs text-neutral-500 font-mono">BATTERY</p>
            <p className="text-sm font-bold mt-1 text-cyan-400">60 HRS</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-neutral-500 font-mono">LATENCY</p>
            <p className="text-sm font-bold mt-1 text-cyan-400">20ms</p>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-xs font-mono tracking-wider text-neutral-400 uppercase mb-3">
            Finish: <span className="text-white font-bold">{selectedColor.name}</span>
          </p>
          <div className="flex gap-4">
            {COLOR_OPTIONS.map((color) => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 transition-all duration-300 relative ${
                  selectedColor.id === color.id ? 'border-cyan-400 scale-110 shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'border-transparent'
                }`}
                style={{ backgroundColor: color.hex === '#171717' ? '#262626' : color.hex }}
              >
                {selectedColor.id === color.id && (
                  <span className="absolute inset-1 border border-black rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex items-center border border-white/10 rounded-xl bg-neutral-900/50 h-14">
            <button 
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="px-4 text-neutral-400 hover:text-white transition-colors"
            >
              -
            </button>
            <span className="w-8 text-center font-mono text-sm">{quantity}</span>
            <button 
              onClick={() => setQuantity(q => q + 1)}
              className="px-4 text-neutral-400 hover:text-white transition-colors"
            >
              +
            </button>
          </div>

          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => addToCart(currentProduct, quantity)} 
            className="flex-1 h-14 bg-white text-black font-bold rounded-xl tracking-wide uppercase hover:bg-neutral-200 transition-colors shadow-lg shadow-white/5 text-sm"
          >
            Add to Cart
          </motion.button>
        </div>

      </div>
    </div>
  );
}