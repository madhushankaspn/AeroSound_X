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
    color: "Midnight Black",
    modelPath: "/models/airpods_max.glb", // 💡 නිවැරදිම Folder Path එක දැම්මා
    gradient: "from-cyan-500 to-blue-600",
    desc: "The ultimate flagship experience with ANC 2.0."
  },
  {
    id: 2,
    name: "AeroSound Pro",
    price: "$299",
    color: "Space Gray",
    modelPath: "/models/airpods_max.glb", // 💡 වෙනත් .glb එකක් තියෙනවා නම් මෙතනට පාත් එක දෙන්න මචං
    gradient: "from-purple-500 to-pink-600",
    desc: "Professional grade audio for studio creators."
  },
  {
    id: 3,
    name: "AeroSound Lite",
    price: "$199",
    color: "Arctic White",
    modelPath: "/models/models/airpods_max.glb", // 💡 වෙනත් .glb එකක් තියෙනවා නම් මෙතනට පාත් එක දෙන්න මචං
    gradient: "from-emerald-400 to-cyan-500",
    desc: "Lightweight design for all-day portability."
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
          
          {/* 👈 LEFT: PRODUCT DETAILS */}
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
                  <h3 className="text-gray-400 uppercase text-xs font-bold tracking-widest mb-1">Choose your aesthetic</h3>
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

          {/* 🎯 MIDDLE: 3D MODEL VIEW */}
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
                    {/* 💡 Selected Product එකට අදාළ 3D Model Path එක pass කරයි */}
                    <Headphones scale={4.5} modelPath={selectedProduct.modelPath} />
                  </Center>
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 👉 RIGHT: CIRCULAR SELECTION */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-4">
            <h3 className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-8">Scroll & Select</h3>
            
            <div className="relative flex flex-col items-center space-y-6">
               {PRODUCTS.map((item, index) => (
                 <motion.div
                    key={item.id}
                    onClick={() => handleSelect(index)}
                    animate={{
                        scale: activeIndex === index ? 1.2 : 0.8,
                        opacity: activeIndex === index ? 1 : 0.3,
                        x: activeIndex === index ? -20 : 0
                    }}
                    whileHover={{ scale: 1.1, opacity: 1 }}
                    className="cursor-pointer group flex items-center space-x-6"
                 >
                    <div className={`w-20 h-20 rounded-full border-2 p-1 transition-all ${activeIndex === index ? 'border-cyan-400' : 'border-white/10'}`}>
                        <div className="w-full h-full bg-[#1A1A1A] rounded-full overflow-hidden flex items-center justify-center">
                           <img src="/images/headphone_thumb.png" className="w-12 h-12 object-contain group-hover:scale-110 transition-transform" alt="thumb" />
                        </div>
                    </div>
                    <div className={activeIndex === index ? 'block' : 'hidden md:block'}>
                        <h4 className="font-bold uppercase text-[12px]">{item.name}</h4>
                        <p className="text-[9px] text-gray-500 font-mono">{item.price}</p>
                    </div>
                 </motion.div>
               ))}
            </div>

            <div className="w-[1px] h-32 bg-gradient-to-b from-cyan-400 to-transparent mt-12"></div>
          </div>

        </div>
      </div>
    </div>
  );
}