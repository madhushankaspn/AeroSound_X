import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { Headphones } from './Headphones'; // එකම ෆෝල්ඩර් එකේ නිසා පාත් එක වෙනස් වුණා

export default function Hero() {
  useEffect(() => {
    // Desktop Interactive Parallax Effect
    if (window.innerWidth > 768) {
      const handleMouseMove = (e) => {
        const container = document.getElementById('3d-container');
        const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 30;
        
        if (container) {
          container.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateX(${xAxis * 0.5}px)`;
        }
      };

      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#0B0B0B] selection:bg-cyan-500/30">
      
      {/* TopNavBar */}
      <nav className="fixed top-0 left-0 w-full z-50 glass-nav border-b border-white/5">
        <div className="flex justify-between items-center px-12 md:px-24 py-4 max-w-[1440px] mx-auto h-20">
          <div className="font-['Montserrat'] text-2xl font-black tracking-tighter uppercase text-white">
            AeroSound X
          </div>
          <div className="hidden md:flex items-center space-x-12 font-['Inter'] text-xs font-semibold uppercase tracking-widest">
            <a className="text-white border-b-2 border-cyan-400 pb-1 hover:text-cyan-300 transition-all duration-300" href="#">Features</a>
            <a className="text-white/60 hover:text-white transition-all duration-300" href="#">Tech Specs</a>
            <a className="text-white/60 hover:text-white transition-all duration-300" href="#">Reviews</a>
          </div>
          <button className="bg-white text-black px-8 py-3 font-['Inter'] text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all duration-300 rounded-full electric-glow">
            Pre-Order
          </button>
        </div>
      </nav>

      {/* Ambient Neon Glow Background */}
      <div className="absolute inset-0 pointer-events-none neon-radial-glow z-0"></div>

      {/* Main Workspace */}
      <div className="w-full max-w-[1440px] mx-auto px-12 md:px-24 relative min-h-screen flex items-center">
        
        {/* 1. TEXT CONTENT LAYER */}
        <div className="relative z-20 max-w-2xl flex flex-col items-start pointer-events-none">
          <div className="flex items-center space-x-4 mb-6">
            <span className="w-12 h-[2px] bg-cyan-400/80"></span>
            <span className="font-['Inter'] text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Audio Engineering Evolution</span>
          </div>
          
          <h1 className="font-['Montserrat'] text-6xl md:text-8xl lg:text-[95px] font-black leading-[0.85] text-white tracking-tighter select-none">
            Immersive <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">Sound.</span> <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Redefined.</span>
          </h1>
          
          <p className="font-['Inter'] text-base md:text-lg text-neutral-400 max-w-md mt-8 leading-relaxed">
            Experience the next frontier of acoustic precision with the AeroSound X. Engineered with proprietary haptic drivers and adaptive ANC 2.0.
          </p>
          
          {/* Interactive Buttons */}
          <div className="flex items-center space-x-6 pt-10 pointer-events-auto">
            <button className="bg-white text-black px-10 py-5 font-['Inter'] text-xs font-bold uppercase tracking-[0.15em] hover:scale-105 transition-all duration-300 rounded-full electric-glow">
              Discover Specs
            </button>
            <div className="relative flex items-center group cursor-pointer">
              <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-cyan-500/10 transition-all duration-300">
                <span className="material-symbols-outlined text-white group-hover:text-cyan-400 transition-colors">play_arrow</span>
              </div>
              <span className="ml-4 font-['Inter'] text-xs font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">Watch Film</span>
            </div>
          </div>
        </div>

        {/* 2. REAL 3D CANVAS LAYER (නියම සිනමාටික් අත්දැකීම) */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[60%] z-10 flex items-center justify-center md:justify-end" id="3d-viewport">
          <div className="relative w-full h-[85vh] max-w-3xl floating-model transition-transform duration-300 ease-out" id="3d-container">
            
            {/* මෙන්න මෙතනට තමයි ඔයාගේ Canvas එක බැස්සුවේ */}
           <Canvas camera={{ position: [0, 0, 2.2], fov: 45 }}> {/* 1. කැමරාව 4.5 ඉඳන් 2.2 ට ළං කරා */}
  <ambientLight intensity={1.8} />
  <directionalLight position={[5, 5, 5]} intensity={2.5} />
  <pointLight position={[-5, -5, -5]} intensity={1} />
  
  <Center>
    {/* 2. Headphones එකට scale={3.8} ක් එකතු කරලා මොඩල් එක ලොකු කරා */}
    <Headphones scale={20} /> 
  </Center>
  
  <OrbitControls enableZoom={false} autoRotate={false} />
</Canvas>
            
            {/* Hotspot 1: HiFi Driver */}
            <div className="absolute top-[38%] left-[32%] group cursor-pointer z-30">
              <div className="w-5 h-5 bg-cyan-400 rounded-full relative flex items-center justify-center border-2 border-white">
                <div className="absolute inset-0 bg-cyan-400 rounded-full pulse-effect"></div>
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-56 p-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-300 shadow-2xl">
                <span className="block font-['Inter'] text-xs font-bold text-cyan-400 mb-1 uppercase tracking-wider">HIFI DRIVER</span>
                <span className="block font-['Inter'] text-xs text-neutral-400 leading-normal">40mm Beryllium coated diaphragms for unmatched acoustic clarity.</span>
              </div>
            </div>

            {/* Hotspot 2: ANC 2.0 */}
            <div className="absolute bottom-[35%] right-[24%] group cursor-pointer z-30">
              <div className="w-5 h-5 bg-cyan-400 rounded-full relative flex items-center justify-center border-2 border-white">
                <div className="absolute inset-0 bg-cyan-400 rounded-full pulse-effect"></div>
              </div>
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-56 p-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-300 shadow-2xl">
                <span className="block font-['Inter'] text-xs font-bold text-cyan-400 mb-1 uppercase tracking-wider">ANC 2.0</span>
                <span className="block font-['Inter'] text-xs text-neutral-400 leading-normal">Adaptive noise cancellation monitoring surroundings at 48,000Hz.</span>
              </div>
            </div>

          </div>
        </div>

        {/* Decorative Technical UI Info Overlay */}
        <div className="absolute bottom-10 right-12 md:right-24 flex flex-col items-end space-y-1 opacity-40 z-20">
          <span className="font-['Inter'] text-[10px] font-bold tracking-[0.2em] text-white uppercase">Aero-001-X-Series</span>
          <span className="font-['Inter'] text-[9px] text-neutral-400 tracking-widest">48.2343° N, 16.3731° E</span>
        </div>

      </div>
    </div>
  );
}