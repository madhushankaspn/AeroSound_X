import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Center } from '@react-three/drei';
import { Headphones } from './components/Headphones';

function App() {
  return (
    // මුළු ප්‍රොජෙක්ට් එකම වට කරන ප්‍රධාන container එක (GSAP එකෙන් මේක අල්ලගන්නවා)
    <div className="scroll-container relative bg-[#0B0B0B] text-white w-full font-['Inter']">
      
      {/* 3D CANVAS LAYER: මේක Screen එකේ එකම තැන fixed වෙලා තියෙන්නේ */}
      <div className="fixed inset-0 w-full h-screen pointer-events-none z-10">
        <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
          <ambientLight intensity={2} />
          <directionalLight position={[5, 5, 5]} intensity={3} />
          <pointLight position={[-5, -5, -5]} intensity={1} />
          <Center>
            <Headphones />
          </Center>
          {/* Apple Style එකට යන්න ඕන නිසා OrbitControls (Mouse drag) මෙතනින් අයින් කරා */}
        </Canvas>
      </div>

      {/* HTML CONTENT LAYER: මේවා තමයි 3D මොඩල් එක උඩින් ස්ක්‍රෝල් වෙන්නේ */}
      
      {/* Section 1: Hero Intro */}
      <section className="relative w-full h-screen flex items-center px-12 md:px-24 z-20">
        <div className="max-w-xl">
          <span className="text-cyan-400 font-bold text-xs uppercase tracking-[0.3em]">AeroSound Labs</span>
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter uppercase mt-2">AeroSound X</h1>
          <p className="text-gray-400 mt-6 text-lg leading-relaxed">
            Immersive Sound. Redefined. Scroll කරලා බලන්න ශබ්දයේ විප්ලවය සිදුවන හැටි.
          </p>
        </div>
      </section>

      {/* Section 2: Explode View (මොඩල් එක මැදට ඇවිත් ගැලවෙන තැන) */}
      <section className="relative w-full h-screen flex items-center justify-end px-12 md:px-24 z-20">
        <div className="max-w-xl text-right">
          <span className="text-cyan-400 font-bold text-xs uppercase tracking-[0.3em]">Acoustic Architecture</span>
          <h2 className="text-5xl font-black tracking-tight uppercase mt-2">Engineering Exploded</h2>
          <p className="text-gray-400 mt-6 text-lg leading-relaxed">
            සෑම කොටසක්ම වෙන් වෙන් වශයෙන් නිර්මාණය කර ඇත්තේ ශබ්දයේ උපරිම පැහැදිලිභාවය ලබා දීමටයි. 
          </p>
        </div>
      </section>

      {/* Section 3: Premium Specs (ආයේ එකතු වෙලා පැත්තකට යන තැන) */}
      <section className="relative w-full h-screen flex items-center px-12 md:px-24 z-20">
        <div className="max-w-xl">
          <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.3em]">Next-Gen Hardware</span>
          <h2 className="text-5xl font-black tracking-tight uppercase mt-2">Adaptive ANC 2.0</h2>
          <p className="text-gray-400 mt-6 text-lg leading-relaxed">
            බාහිර ලෝකයේ ශබ්ද සම්පූර්ණයෙන්ම අවහිර කරමින්, ඔබව සංගීත ලෝකයක තනි කරවයි.
          </p>
        </div>
      </section>

    </div>
  );
}

export default App;