import React, { useState, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Center, Sparkles } from '@react-three/drei';
import { toast } from 'react-hot-toast';

// --- Improved Interactive 3D Cyber Portal Component ---
function CyberPortal({ hasError }) {
  const { scene } = useGLTF('/models/portal.glb'); 
  const groupRef = useRef();
  const energyRingRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const { x, y } = state.pointer; 
    
    if (groupRef.current) {
      
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.08;
      
      
      groupRef.current.rotation.y += (x * 0.4 - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (-y * 0.3 - groupRef.current.rotation.x) * 0.05;
    }

    if (energyRingRef.current) {
     
      energyRingRef.current.rotation.z = hasError ? t * 8 : t * 1.2;
      
      
      const pulseFactor = hasError ? 1 : 1 + Math.sin(t * 6) * 0.02;
      energyRingRef.current.scale.set(pulseFactor, pulseFactor, pulseFactor);
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} />
      
      {/* මැද තියෙන Core Glow එක */}
      <pointLight 
        position={[0, 0.5, 0]} 
        intensity={hasError ? 10 : 5} 
        distance={4}
        color={hasError ? "#ff003c" : "#00f0ff"} 
      />

      <Center>
        <primitive 
          object={scene} 
          scale={1.1} 
          position={[0, 0, 0]} 
        />
      </Center>

      {/* Cyber Torus Ring */}
      <mesh ref={energyRingRef} position={[0, 0.5, 0.05]}>
        <torusGeometry args={[1.08, 0.03, 16, 100]} />
        <meshBasicMaterial 
          color={hasError ? "#ff003c" : "#00f0ff"} 
          wireframe
          transparent
          opacity={hasError ? 0.9 : 0.6}
        />
      </mesh>

      {/* Futuristic Cyber Particles */}
      <Sparkles 
        count={hasError ? 80 : 40} 
        scale={2.5} 
        size={hasError ? 5 : 2} 
        speed={hasError ? 5 : 0.8}
        color={hasError ? "#ff003c" : "#00f0ff"} 
      />
    </group>
  );
}

// --- Main Login Component ---
export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setHasError(false);

    setTimeout(() => {
      if (password === 'admin') {
        toast.success("Access Verified. Launching System...");
        onLoginSuccess();
      } else {
        setHasError(true);
        setIsAuthenticating(false);
        toast.error("Decryption Failed. Core Rejected Key.");
      }
    }, 1500);
  };

  return (
    <div className="w-full h-screen flex bg-[#030303] overflow-hidden text-white font-sans relative select-none">
      
      {/* Background Cyber Grid Graphic (Subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,_rgba(0,240,255,0.04),_transparent_60%)] pointer-events-none" />

      {/* Left Side - 3D Canvas Context */}
      <div className="hidden lg:flex w-1/2 h-full relative items-center justify-center border-r border-white/5">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 4.3], fov: 50 }}>
            <Suspense fallback={null}>
              <CyberPortal hasError={hasError} />
              <Environment preset="night" />
              <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.2} />
            </Suspense>
          </Canvas>
        </div>
        
        {/* Holographic UI Overlays */}
        <div className="absolute top-12 left-12 font-mono text-[11px] tracking-[0.15em] z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${hasError ? 'bg-red-500 animate-ping' : 'bg-[#00f0ff] animate-pulse'}`} />
            <p className={hasError ? "text-red-500 font-bold" : "text-[#00f0ff]"}>
              {hasError ? "CORE_STATE // CRITICAL_ERROR" : "CORE_STATE // SYNCHRONIZED"}
            </p>
          </div>
          <p className="text-gray-600">NODE ID: AEROSOUND_MAIN_GATE</p>
        </div>
      </div>

      {/* Right Side - Glassmorphic Form (With Autofill Fix) */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-6 relative z-10 bg-gradient-to-b from-transparent to-[#050505]">
        
        <motion.div 
          className={`w-full max-w-md p-10 rounded-2xl backdrop-blur-3xl border transition-all duration-500 ${
            hasError 
              ? 'border-red-500/40 bg-red-950/5 shadow-[0_0_60px_rgba(255,0,60,0.15)]' 
              : 'border-white/5 bg-white/[0.01] shadow-[0_0_50px_rgba(0,240,255,0.03)]'
          }`}
          animate={hasError ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-black tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
              AEROSOUND <span className={`transition-colors duration-300 ${hasError ? "text-[#ff003c]" : "text-[#00f0ff]"}`}>X</span>
            </h1>
            <p className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.25em]">
              Acoustic Access Portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-mono tracking-widest text-gray-500 uppercase">Identification (Email)</label>
              {}
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ WebkitBoxShadow: "0 0 0 1000px #090909 inset", WebkitTextFillColor: "#e5e7eb" }}
                className={`w-full bg-transparent border ${
                  hasError ? 'border-red-500/40 focus:border-red-500' : 'border-white/10 focus:border-[#00f0ff]'
                } px-4 py-3 rounded-lg outline-none transition-all font-mono text-sm text-gray-200`}
                placeholder="user@aerox.com"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-mono tracking-widest text-gray-500 uppercase">Decryption Key (Password)</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ WebkitBoxShadow: "0 0 0 1000px #090909 inset", WebkitTextFillColor: "#e5e7eb" }}
                className={`w-full bg-transparent border ${
                  hasError ? 'border-red-500/40 focus:border-red-500' : 'border-white/10 focus:border-[#00f0ff]'
                } px-4 py-3 rounded-lg outline-none transition-all font-mono text-sm text-gray-200`}
                placeholder="••••••••"
              />
              <p className="text-[10px] text-gray-600 font-mono mt-1">* Hint: admin</p>
            </div>

            <button 
              type="submit" 
              disabled={isAuthenticating}
              className={`w-full py-4 mt-6 font-mono text-xs font-bold tracking-[0.3em] uppercase transition-all duration-300 rounded-lg border ${
                hasError 
                  ? 'bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20 shadow-[0_0_20px_rgba(255,0,60,0.1)]' 
                  : 'bg-[#00f0ff]/5 text-[#00f0ff] border-[#00f0ff]/20 hover:bg-[#00f0ff]/10 shadow-[0_0_25px_rgba(0,240,255,0.08)]'
              }`}
            >
              {isAuthenticating ? 'DECRYPTING...' : 'INITIALIZE'}
            </button>
          </form>

        </motion.div>
      </div>
      
    </div>
  );
}