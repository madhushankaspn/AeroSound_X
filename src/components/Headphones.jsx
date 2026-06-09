import React, { useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function Headphones({ modelPath = '/models/airpods_max.glb', ...props }) {
  // 💡 Draco Decoder එක සමඟින් dynamic ව props වලින් එන පාත් එකට මොඩල් එක ලෝඩ් කරනවා
  const { scene } = useGLTF(
    modelPath, 
    'https://www.gstatic.com/draco/versioned/decoders/1.5.7/'
  );
  
  // 🎯 CRITICAL FIX: Canvases කිහිපයක එකම මොඩල් එක පාවිච්චි කිරීමේදී සිදුවන Scene Conflict එක වැළැක්වීමට clone එකක් සාදයි
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const modelRef = useRef();

  // 🌊 Smooth Idle Floating Animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (modelRef.current) {
      // ලාවට වටේට කැරකෙනවා
      modelRef.current.rotation.y = t * 0.2; 
      // ලස්සනට උඩ පල්ලෙහා පාවෙන ඉෆෙක්ට් එක
      modelRef.current.position.y = Math.sin(t) * 0.12; 
    }
  });

  return (
    <group {...props}>
      <primitive 
        ref={modelRef}
        object={clonedScene} 
      />
    </group>
  );
}

// Default Model එක කලින්ම ලෝඩ් කරලා තියාගන්න (Typo එක ෆික්ස් කර ඇත)
useGLTF.preload(
  '/models/airpods_max.glb', 
  'https://www.gstatic.com/draco/versioned/decoders/1.5.7/'
);