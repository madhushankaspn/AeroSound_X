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
    modelPath: "/models/airpods_max.glb",
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
    modelPath: "/models/airpods_max.glb",
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
    modelPath: "/models/airpods_max.glb",
    thumb: "/images/white_thumb.png",
    gradient: "from-emerald-400 to-cyan-500",
    desc: "Lightweight design for all-day portability."
  },
  {
    id: 4,
    name: "AeroSound Ultra",
    price: "$449",
    colorName: "Sunset Pink",
    hexColor: "#F43F5E", // Pink/Red ටින්ට් එකක්
    modelPath: "/models/airpods_max.glb",
    thumb: "/images/pink_thumb.png", // public/images/pink_thumb.png
    gradient: "from-rose-500 to-orange-500",
    desc: "Limited edition luxury crafted with premium materials."
  },
  {
    id: 5,
    name: "AeroSound Sport",
    price: "$249",
    colorName: "Neon Green",
    hexColor: "#22C55E", // Green ටින්ට් එකක්
    modelPath: "/models/airpods_max.glb",
    thumb: "/images/green_thumb.png", // public/images/green_thumb.png
    gradient: "from-green-400 to-teal-600",
    desc: "Sweat-resistant design engineered for high-intensity athletes."
  }
];

export default function ProductShowcase() {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (index) => {
    setActiveIndex(index);
    setSelectedProduct(PRODUCTS[index]);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0B0B0B] text-white py-24 overflow-hidden">
      
      {/* BACKGROUND GLOW DYNAMIC */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r ${selectedProduct.gradient} opacity-5 blur-[120px] transition-all duration-1000 rounded-full`} />

      <div className="max-w-[1440px] mx-auto px-12 md:px-24 h-full">
        
        {/* DYNAMIC SECTION TITLE */}
        <div className="mb-16">
          <motion.span 
            key={selectedProduct.id + 'label'}
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase"
          >
            Showcase / 0{selectedProduct.id}
          </motion.span>
          <motion.h2 
            key={selectedProduct.id + 'title'}
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl font-black uppercase mt-2 tracking-tighter"
          >
            Explore the <br/> <span className="text-neutral-500">Collection.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* 👈 LEFT: PRODUCT DETAILS (Updates dynamically with selection) */}
          <div className="lg:col-span-4 z-20">
            <AnimatePresence mode='wait'>
              <motion.div
                key={selectedProduct.id}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-gray-400 uppercase text-xs font-bold tracking-widest mb-1">
                    Aesthetic / {selectedProduct.colorName}
                  </h3>
                  <h2 className="text-4xl font-black text-white">{selectedProduct.name}</h2>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-3xl font-black">{selectedProduct.price}</span>
                    <span className="text-[10px] text-gray-500 font-mono">INCL. TAXES</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {selectedProduct.desc}
                  </p>
                  <button className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-cyan-400 transition-colors duration-300">
                    Pre-Order Now
                  </button>
                </div>

                <div className="flex space-x-4 opacity-50">
                    <div className="text-[9px] font-mono border-r border-white/20 pr-4">CATEGORY / WIRELESS</div>
                    <div className="text-[9px] font-mono">PREMIUM PRODUCTION</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 🎯 MIDDLE: DYNAMIC 3D MODEL VIEW */}
          <div className="lg:col-span-4 h-[500px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProduct.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full h-full"
              >
                <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
                  <ambientLight intensity={1.5} />
                  <directionalLight position={[5, 5, 5]} intensity={2} />
                  <Center>
                    {/* 💡 මෙතනදී modelPath එකයි hexColor එකයි දෙකම dynamic ව යනවා */}
                    <Headphones 
                      scale={4.5} 
                      modelPath={selectedProduct.modelPath} 
                      customColor={selectedProduct.hexColor}
                    />
                  </Center>
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 👉 RIGHT: CIRCULAR / CARD SELECTION (SCROLLABLE VERSION) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-4 w-full">
            <h3 className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-2">Scroll & Select</h3>
            
            {/* 💡 CRITICAL FIX: කාඩ්ස් ගොඩක් දාද්දි Scroll වෙන්න max-height එකක් සහ scrollbar styling දැම්මා */}
            <div className="relative flex flex-col items-center space-y-6 max-h-[520px] overflow-y-auto overflow-x-hidden px-4 py-2 w-full custom-layout-scroll">
               {PRODUCTS.map((item, index) => (
                 <motion.div
                    key={item.id}
                    onClick={() => handleSelect(index)}
                    animate={{
                        scale: activeIndex === index ? 1.08 : 0.9,
                        opacity: activeIndex === index ? 1 : 0.4,
                        x: activeIndex === index ? -8 : 0
                    }}
                    whileHover={{ scale: 1.02, opacity: 1 }}
                    className="cursor-pointer group flex items-center space-x-6 w-full min-w-[260px] transition-all"
                 >
                    {/* Thumbnail Circle */}
                    <div className={`w-28 h-28 rounded-full border-2 p-1.5 flex-shrink-0 transition-all duration-300 ${activeIndex === index ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]' : 'border-white/10'}`}>
                        <div className="w-full h-full bg-[#141414] rounded-full overflow-hidden flex items-center justify-center relative">
                           <img 
                             src={item.thumb} 
                             className="w-20 h-20 object-contain group-hover:scale-110 transition-transform z-10" 
                             alt={item.name}
                             onError={(e) => { e.target.style.display = 'none'; }}
                           />
                           <div 
                             className="absolute w-6 h-6 rounded-full blur-[4px] opacity-30" 
                             style={{ backgroundColor: item.hexColor }} 
                           />
                        </div>
                    </div>
                    
                    {/* Text Details */}
                    <div className="flex-grow">
                        <h4 className="font-black uppercase text-[13px] tracking-wider text-white group-hover:text-cyan-400 transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-cyan-400/90 font-mono mt-0.5">
                          {item.price}
                        </p>
                        <p className="text-[10px] text-gray-500 font-medium">
                          {item.colorName}
                        </p>
                    </div>
                 </motion.div>
               ))}
            </div>

            <div className="w-[1px] h-16 bg-gradient-to-b from-cyan-400 to-transparent mt-6"></div>
          </div>

        </div>
      </div>
    </div>
  );
}