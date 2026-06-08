import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { Headphones } from './components/Headphones';

function App() {
  return (
    <div className="w-full min-h-screen bg-[#0B0B0B] text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-2 tracking-wider">AEROSOUND X</h1>
      <p className="text-gray-400 mb-8 text-sm">Mouse එකෙන් Drag කරලා 3D Model එක කරකවලා බලන්න</p>
      
      {/* 3D Render වෙන ප්‍රධාන පෙට්ටිය (Canvas) */}
      <div className="w-full max-w-[600px] h-[500px] bg-[#121212] rounded-2xl shadow-2xl border border-gray-800/50 overflow-hidden relative">
        
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          {/* සයිට් එකේ එළිය (Lighting) සෙටප් එක */}
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <pointLight position={[-5, -5, -5]} intensity={1} />
          
          <Center>
            {/* අපේ හෙඩ්ෆෝන් මොඩල් එක */}
            <Headphones />
          </Center>
          
          {/* බ්‍රවුසර් එකේ මවුස් එකෙන් කරකවන්න ඉඩ දෙන කන්ට්‍රෝල් එක */}
          <OrbitControls enableZoom={true} autoRotate={false} />
        </Canvas>

      </div>
    </div>
  );
}

export default App;