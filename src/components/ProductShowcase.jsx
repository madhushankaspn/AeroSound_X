import React, { useState, useEffect } from 'react';
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
    scale: 0.5,                  
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
    scale: 3.5,
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
    scale: 0.1,
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
    scale: 0.1,
    position: [0, 0, 0],
    thumb: "/images/green_thumb.png",
    gradient: "from-green-400 to-teal-600",
    desc: "Sweat-resistant design engineered for high-intensity athletes."
  }
];

export default function ProductShowcase({ onSelectProduct }) {
 
  const [searchTerm, setSearchTerm] = useState('');
  

  const filteredProducts = PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.colorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(filteredProducts[0]);

 
  useEffect(() => {
    setActiveIndex(0);
    if (filteredProducts.length > 0) {
      setSelectedProduct(filteredProducts[0]);
    } else {
      setSelectedProduct(null);
    }
  }, [searchTerm]);

  const handleSelect = (index) => {
    setActiveIndex(index);
    setSelectedProduct(filteredProducts[index]);
  };

  const nextSlide = () => {
    if (filteredProducts.length <= 1) return;
    const nextIndex = (activeIndex + 1) % filteredProducts.length;
    handleSelect(nextIndex);
  };

  const prevSlide = () => {
    if (filteredProducts.length <= 1) return;
    const prevIndex = (activeIndex - 1 + filteredProducts.length) % filteredProducts.length;
    handleSelect(prevIndex);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0B0B0B] text-white py-20 overflow-hidden font-sans flex flex-col justify-between">
      
      {/* Background Gradient (Selected Product එකක් නැත්තම් Neutral කලර් එකක් එනවා) */}
      <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r ${selectedProduct?.gradient || 'from-neutral-800 to-black'} opacity-[0.04] blur-[140px] transition-all duration-1000 rounded-full pointer-events-none`} />

      <div className="max-w-[1440px] mx-auto px-6 md:px-24 w-full relative z-10 flex flex-col flex-grow justify-center">
        
        {/* ─── HEADER & SEARCH BAR SECTION ─── */}
        <div className="mb-12 flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 border-b border-white/5 pb-8">
          <div>
            <motion.span 
              key={selectedProduct?.id + 'label'}
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }}
              className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase"
            >
              Showcase {selectedProduct ? `/ 0${selectedProduct.id}` : ''}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-black uppercase mt-1 tracking-tighter"
            >
              Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Collection.</span>
            </motion.h2>
          </div>

          {/* 🔍 SEARCH BAR COMPONENT */}
          <div className="relative w-full max-w-sm group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-neutral-500 group-focus-within:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search color, model, specs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-10 text-white placeholder-neutral-500 font-['Inter'] text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] focus:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* ─── MAIN CONTENT AREA ─── */}
        {filteredProducts.length > 0 && selectedProduct ? (
          <>
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

                    <div className="bg-[#121212]/60 border border-white/5 p-6 rounded-2xl backdrop-blur-xl shadow-2xl group hover:border-cyan-400/30 transition-colors duration-500">
                      <div className="flex justify-between items-end mb-4">
                        <span className="text-3xl font-black text-white tracking-tight">{selectedProduct.price}</span>
                        <span className="text-[9px] text-cyan-400 font-mono tracking-wider bg-cyan-400/10 px-2 py-1 rounded">INCL. TAXES</span>
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

              {/* 3D CANVAS PORTION */}
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

            {/* ─── BOTTOM CAROUSEL ─── */}
            <div className="relative w-full flex flex-col items-center justify-center mt-12 pt-6">
              <div className="relative w-full max-w-3xl h-[240px] flex items-center justify-center">
                {filteredProducts.map((item, index) => {
                  let offset = index - activeIndex;
                  if (offset > filteredProducts.length / 2) offset -= filteredProducts.length;
                  if (offset < -filteredProducts.length / 2) offset += filteredProducts.length;

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
                        <div className="w-2.5 h-2.5 rounded-full border border-white/10 shadow-sm" style={{ backgroundColor: item.hexColor }} />
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

              {/* Slider Controls - Only show if more than 1 product */}
              {filteredProducts.length > 1 && (
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
              )}
            </div>
          </>
        ) : (
         
          <div className="flex flex-col items-center justify-center min-h-[400px] opacity-50 z-20">
            <svg className="w-20 h-20 text-cyan-400 mb-6 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="font-['Montserrat'] text-2xl font-black text-white mb-2 uppercase tracking-tight">No Models Found</h3>
            <p className="font-['Inter'] text-sm text-neutral-400 text-center max-w-sm">
              We couldn't find any equipment matching "{searchTerm}". Try searching for a different color or model.
            </p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-8 border border-white/10 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:border-cyan-400 hover:text-cyan-400 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}