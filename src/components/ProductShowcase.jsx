import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { Headphones } from './Headphones'; 

const PRODUCTS = [
  {
    id: 1,
    name: "AeroSound X",
    price: "$349",
    colorName: "Midnight Black",
    hexColor: "#1A1A1A",
    modelPath: "/models/aerosound_x.glb", 
    scale: 4.2,                  
    position: [0, 0, 0],
    thumb: "/images/black_thumb.png",
    gradient: "from-cyan-500 to-blue-600",
    desc: "The ultimate flagship experience with ANC 2.0."
  },
  {
    id: 2,
    name: "AeroSound Pro",
    price: "$299",
    colorName: "Ocean Blue",
    hexColor: "#1E3A8A",
    modelPath: "/models/aerosound_pro.glb", 
    scale: 4.0,
    position: [0, -0.05, 0],
    thumb: "/images/blue_thumb.png",
    gradient: "from-blue-500 to-indigo-600",
    desc: "Professional grade audio for studio creators."
  },
  {
    id: 3,
    name: "AeroSound Lite",
    price: "$199",
    colorName: "Arctic White",
    hexColor: "#E5E7EB",
    modelPath: "/models/aerosound_lite.glb", 
    scale: 4.5,
    position: [0, 0, 0],
    thumb: "/images/white_thumb.png",
    gradient: "from-emerald-400 to-cyan-500",
    desc: "Lightweight design for all-day portability."
  },
  {
    id: 4,
    name: "AeroSound Ultra",
    price: "$449",
    colorName: "Sunset Pink",
    hexColor: "#F43F5E",
    modelPath: "/models/aerosound_ultra.glb", 
    scale: 4.2,
    position: [0, 0.05, 0],
    thumb: "/images/pink_thumb.png",
    gradient: "from-rose-500 to-orange-500",
    desc: "Limited edition luxury crafted with premium materials."
  },
  {
    id: 5,
    name: "AeroSound Sport",
    price: "$249",
    colorName: "Neon Green",
    hexColor: "#22C55E",
    modelPath: "/models/aerosound_sport.glb", 
    scale: 4.1,
    position: [0, 0, 0],
    thumb: "/images/green_thumb.png",
    gradient: "from-green-400 to-teal-600",
    desc: "Sweat-resistant design engineered for high-intensity athletes."
  }
];

export default function ProductShowcase({ onSelectProduct }) {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (index) => {
    setActiveIndex(index);
    setSelectedProduct(PRODUCTS[index]);
  };

  const nextSlide = () => {
    const nextIndex = (activeIndex + 1) % PRODUCTS.length;
    handleSelect(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (activeIndex - 1 + PRODUCTS.length) % PRODUCTS.length;
    handleSelect(prevIndex);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0B0B0B] text-white py-20 overflow-hidden font-sans flex flex-col justify-between">
      <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r ${selectedProduct.gradient} opacity-[0.04] blur-[140px] transition-all duration-1000 rounded-full pointer-events-none`} />

      <div className="max-w-[1440px] mx-auto px-6 md:px-24 w-full relative z-10 flex flex-col flex-grow justify-center">
        <div className="mb-8">
          <motion.span 
            key={selectedProduct.id + 'label'}
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase"
          >
            Showcase / 0{selectedProduct.id}
          </motion.span>
          <motion.h2 
            key={selectedProduct.id + 'title'}
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-black uppercase mt-1 tracking-tighter"
          >
            Explore the <span className="text-neutral-500">Collection.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[420px]">
          <div className="lg:col-span-5 z-20">
            <AnimatePresence mode='wait'>
              <motion.div
                key={selectedProduct.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-gray-500 uppercase text-[10px] font-bold tracking-widest mb-1">
                    Aesthetic / {selectedProduct.colorName}
                  </h3>
                  <h2 className="text-4xl font-black text-white tracking-tight">{selectedProduct.name}</h2>
                </div>

                <div className="bg-[#121212]/60 border border-white/5 p-6 rounded-2xl backdrop-blur-xl shadow-2xl">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-3xl font-black text-white tracking-tight">{selectedProduct.price}</span>
                    <span className="text-[9px] text-gray-500 font-mono tracking-wider">INCL. TAXES</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {selectedProduct.desc}
                  </p>
                  <button 
                    onClick={() => onSelectProduct && onSelectProduct(selectedProduct)}
                    className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] transition-all duration-300"
                  >
                    Pre-Order Now
                  </button>
                </div>

                <div className="flex space-x-4 opacity-40">
                  <div className="text-[9px] font-mono border-r border-white/20 pr-4">CATEGORY / WIRELESS</div>
                  <div className="text-[9px] font-mono">PREMIUM PRODUCTION</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-7 h-[450px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProduct.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full h-full"
              >
                <Canvas camera={{ position: [0, 0, 2.3], fov: 45 }}>
                  <ambientLight intensity={1.5} />
                  <directionalLight position={[5, 5, 5]} intensity={2} />
                  <directionalLight position={[-5, 3, -4]} intensity={1.5} color="#ffffff" />
                  <Center>
                    <Headphones 
                      key={selectedProduct.id} 
                      scale={selectedProduct.scale} 
                      position={selectedProduct.position}
                      modelPath={selectedProduct.modelPath} 
                      customColor={selectedProduct.hexColor}
                    />
                  </Center>
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
                </Canvas>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative w-full flex flex-col items-center justify-center mt-12 pt-6">
          <div className="relative w-full max-w-3xl h-[240px] flex items-center justify-center">
            {PRODUCTS.map((item, index) => {
              let offset = index - activeIndex;
              if (offset > PRODUCTS.length / 2) offset -= PRODUCTS.length;
              if (offset < -PRODUCTS.length / 2) offset += PRODUCTS.length;

              const absOffset = Math.abs(offset);
              
              const translateX = offset * 160; 
              const translateY = absOffset * -18; 
              const scale = 1 - absOffset * 0.12; 
              const rotate = offset * 5; 
              const zIndex = 10 - absOffset; 
              const opacity = 1 - absOffset * 0.35; 

              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={item.id}
                  onClick={() => handleSelect(index)}
                  animate={{
                    x: translateX,
                    y: translateY,
                    scale: scale,
                    rotate: rotate,
                    zIndex: zIndex,
                    opacity: opacity
                  }}
                  whileHover={!isActive ? { scale: scale + 0.03, opacity: 1 } : {}}
                  transition={{ type: "spring", stiffness: 260, damping: 25 }}
                  className={`absolute w-[160px] h-[210px] rounded-2xl p-4 cursor-pointer select-none border backdrop-blur-xl flex flex-col justify-between transition-colors duration-300 ${
                    isActive 
                      ? 'bg-[#141414]/90 border-cyan-500/40 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8),0_0_25px_rgba(34,211,238,0.1)]' 
                      : 'bg-[#141414]/30 border-white/5 shadow-xl'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[9px] text-neutral-500 font-bold">0{item.id}</span>
                    <div className="w-2.5 h-2.5 rounded-full border border-white/10" style={{ backgroundColor: item.hexColor }} />
                  </div>

                  <div className="my-2 flex-grow flex items-center justify-center relative rounded-lg overflow-hidden bg-white/[0.01] p-2 border border-white/[0.02]">
                    <img 
                      src={item.thumb} 
                      alt={item.name}
                      className={`w-full h-full object-contain transition-transform duration-500 ${isActive ? 'scale-110' : 'scale-95'}`}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="truncate pr-1">
                      <h4 className={`font-black uppercase text-[10px] tracking-wider truncate ${isActive ? 'text-cyan-400' : 'text-gray-300'}`}>
                        {item.name}
                      </h4>
                      <p className="text-[8px] text-neutral-500 font-mono mt-0.5">{item.price}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex space-x-4 mt-4 z-30">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-white/5 bg-white/5 flex items-center justify-center hover:border-cyan-400 hover:bg-cyan-500/10 active:scale-95 transition-all group"
            >
              <span className="text-white group-hover:text-cyan-400 text-sm font-bold transition-colors">←</span>
            </button>
            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-white/5 bg-white/5 flex items-center justify-center hover:border-cyan-400 hover:bg-cyan-500/10 active:scale-95 transition-all group"
            >
              <span className="text-white group-hover:text-cyan-400 text-sm font-bold transition-colors">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}