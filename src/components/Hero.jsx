import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, useProgress } from '@react-three/drei'; 
import { Headphones } from './Headphones'; 

export default function Hero() {
  const { progress: actualProgress } = useProgress();
  const [visualProgress, setVisualProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // 🔄 Visual Progress Counter Logic
  useEffect(() => {
    if (visualProgress < actualProgress) {
      const timer = setTimeout(() => {
        setVisualProgress((prev) => prev + 1);
      }, 12); 
      return () => clearTimeout(timer);
    }

    if (visualProgress >= 100 && actualProgress >= 100) {
      const timeout = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setShowLoader(false), 800);
      }, 400); 
      return () => clearTimeout(timeout);
    }
  }, [visualProgress, actualProgress]);

  // 🖱️ Smooth Mouse Move 3D Parallax Effect
  useEffect(() => {
    if (window.innerWidth > 768) {
      const handleMouseMove = (e) => {
        const container = document.getElementById('3d-container');
        
        // 💡 FIX: Divisor එක 30 සිට 70 දක්වා වැඩි කළා (වේගය සහ ගැස්සීම අඩු කරන්න)
        const xAxis = (window.innerWidth / 2 - e.pageX) / 70;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 70;
        
        if (container) {
          // translateX එකත් 0.5 සිට 0.2 දක්වා අඩු කළා motion එක subtle කරන්න
          container.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateX(${xAxis * 0.2}px)`;
        }
      };
      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#0B0B0B] selection:bg-cyan-500/30">
      
      {/* ⏳ PREMIUM FULL-SCREEN PRELOADER */}
      {showLoader && (
        <div className={`fixed inset-0 bg-[#0B0B0B] z-[100] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${
          fadeOut ? 'opacity-0 pointer-events-none scale-110' : 'opacity-100'
        }`}>
          <div className="relative flex flex-col items-center w-full max-w-xs">
            <div className="absolute w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
            <span className="font-['Montserrat'] text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-700 select-none mb-2">
              {visualProgress}%
            </span>
            <span className="font-['Inter'] text-[9px] font-bold tracking-[0.5em] text-cyan-400/80 uppercase mb-8 ml-2">
              Initializing Audio Engine
            </span>
            <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
              <div 
                className="h-full bg-cyan-400 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                style={{ width: `${visualProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* TopNavBar */}
      <nav className="fixed top-0 left-0 w-full z-50 glass-nav border-b border-white/5">
        <div className="flex justify-between items-center px-12 md:px-24 py-4 max-w-[1440px] mx-auto h-20">
          <div className="font-['Montserrat'] text-2xl font-black tracking-tighter uppercase text-white">AeroSound X</div>
          <div className="hidden md:flex items-center space-x-12 font-['Inter'] text-xs font-semibold uppercase tracking-widest">
            <a className="text-white border-b-2 border-cyan-400 pb-1 hover:text-cyan-300 transition-all duration-300" href="#">Features</a>
            <a className="text-white/60 hover:text-white transition-all duration-300" href="#">Tech Specs</a>
            <a className="text-white/60 hover:text-white transition-all duration-300" href="#">Reviews</a>
          </div>
          <button className="bg-white text-black px-8 py-3 font-['Inter'] text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all duration-300 rounded-full electric-glow">Pre-Order</button>
        </div>
      </nav>

      {/* Ambient Radial Glow */}
      <div className="absolute inset-0 pointer-events-none neon-radial-glow z-0"></div>

      {/* 🌐 NEW: PREMIUM TECH BACKGROUND GRID & BLUEPRINT ACCENTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* A. Subtle Tech Grid Pattern (Fades out beautifully towards edges) */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_65%_50%,#000_50%,transparent_100%)]" 
        />

        {/* B. Orbiting Blueprint Circles (Placed perfectly behind the 3D Container) */}
        <div className="absolute top-1/2 md:left-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] border border-white/[0.01] rounded-full" />
        
        <div 
          className="absolute top-1/2 md:left-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-dashed border-cyan-500/[0.025] rounded-full animate-[spin_240s_linear_infinite]" 
        />
        
        <div className="absolute top-1/2 md:left-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] border border-white/[0.015] rounded-full" />

        {/* C. Minimal Tech Data Overlay */}
        <div className="absolute top-1/4 left-12 text-white/[0.02] font-mono text-[9px] tracking-widest select-none uppercase hidden lg:block">
          + 00.12 X_COORD
        </div>
        <div className="absolute bottom-1/3 left-12 text-white/[0.02] font-mono text-[9px] tracking-widest select-none uppercase hidden lg:block">
          SYS_AERO_INITIALIZED //
        </div>
      </div>

      {/* Main Workspace */}
      <div className="w-full max-w-[1440px] mx-auto px-12 md:px-24 relative min-h-screen flex items-center">
        
        {/* TEXT CONTENT LAYER */}
        <div className="relative z-20 max-w-2xl flex flex-col items-start pointer-events-none">
          <div className="flex items-center space-x-4 mb-6 animate-text-reveal">
            <span className="w-12 h-[2px] bg-cyan-400/80"></span>
            <span className="font-['Inter'] text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Audio Engineering Evolution</span>
          </div>
          <h1 className="font-['Montserrat'] text-6xl md:text-8xl lg:text-[95px] font-black leading-[0.85] text-white tracking-tighter select-none animate-text-reveal delay-100">
            Immersive <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">Sound.</span> <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Redefined.</span>
          </h1>
          <p className="font-['Inter'] text-base md:text-lg text-neutral-400 max-w-md mt-8 leading-relaxed animate-text-reveal delay-200">
            Experience the next frontier of acoustic precision with the AeroSound X. Engineered with proprietary haptic drivers and adaptive ANC 2.0.
          </p>
          <div className="flex items-center space-x-6 pt-10 pointer-events-auto animate-text-reveal delay-300">
            <button className="bg-white text-black px-10 py-5 font-['Inter'] text-xs font-bold uppercase tracking-[0.15em] hover:scale-105 transition-all duration-300 rounded-full electric-glow">Discover Specs</button>
            <div className="relative flex items-center group cursor-pointer">
              <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-cyan-500/10 transition-all duration-300">
                <span className="material-symbols-outlined text-white group-hover:text-cyan-400 transition-colors">play_arrow</span>
              </div>
              <span className="ml-4 font-['Inter'] text-xs font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">Watch Film</span>
            </div>
          </div>
        </div>

        {/* 3D CANVAS LAYER */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[60%] z-10 flex items-center justify-center md:justify-end" id="3d-viewport">
          <div className="relative w-full h-[85vh] max-w-3xl floating-model transition-transform duration-300 ease-out" id="3d-container">
            
            <Canvas camera={{ position: [0, 0, 2.2], fov: 45 }}>
              <ambientLight intensity={1.2} /> 
              <directionalLight position={[5, 5, 5]} intensity={2.5} />
              <directionalLight position={[-5, 3, -4]} intensity={3.5} color="#ffffff" />
              <pointLight position={[-5, -5, -5]} intensity={1} />
              
              <Center>
                <Headphones scale={4} position={[0, 0, 0]} modelPath="/models/airpods_max.glb" /> 
              </Center>
              <OrbitControls enableZoom={false} autoRotate={false} />
            </Canvas>
            
            {/* HOTSPOTS */}
            <div className="absolute top-[62%] left-[28%] group cursor-pointer z-30">
              <div className="w-5 h-5 bg-cyan-400 rounded-full relative flex items-center justify-center border-2 border-white">
                <div className="absolute inset-0 bg-cyan-400 rounded-full pulse-effect"></div>
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-56 p-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-300 shadow-2xl z-50">
                <span className="block font-['Inter'] text-xs font-bold text-cyan-400 mb-1 uppercase tracking-wider">HIFI DRIVER</span>
                <span className="block font-['Inter'] text-xs text-neutral-400 leading-normal">40mm Beryllium coated diaphragms for unmatched acoustic clarity.</span>
              </div>
            </div>

            <div className="absolute top-[55%] right-[42%] group cursor-pointer z-30">
              <div className="w-5 h-5 bg-cyan-400 rounded-full relative flex items-center justify-center border-2 border-white">
                <div className="absolute inset-0 bg-cyan-400 rounded-full pulse-effect"></div>
              </div>
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-56 p-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-300 shadow-2xl z-50">
                <span className="block font-['Inter'] text-xs font-bold text-cyan-400 mb-1 uppercase tracking-wider">ANC 2.0</span>
                <span className="block font-['Inter'] text-xs text-neutral-400 leading-normal">Adaptive noise cancellation monitoring surroundings at 48,000Hz.</span>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Info Accent */}
        <div className="absolute bottom-10 right-12 md:right-24 flex flex-col items-end space-y-1 opacity-40 z-20">
          <span className="font-['Inter'] text-[10px] font-bold tracking-[0.2em] text-white uppercase">Aero-001-X-Series</span>
          <span className="font-['Inter'] text-[9px] text-neutral-400 tracking-widest">48.2343° N, 16.3731° E</span>
        </div>

      </div>
    </div>
  );
}