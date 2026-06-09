import React, { useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Headphones({ modelPath, customColor, ...props }) {
  // 💡 වෙනස් වෙන modelPath එක අනුව 3D file එක මෙතනින් load වෙනවා
  const { scene } = useGLTF(
    modelPath, 
    'https://www.gstatic.com/draco/versioned/decoders/1.5.7/' // Draco compression decoder එක
  );
  
  // 🎯 හැම මොඩල් එකක්ම ක්ලීන් එකට memory එකේ clone වෙලා පේන්න
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    
    if (customColor) {
      clone.traverse((child) => {
        if (child.isMesh) {
          // අවශ්‍ය නම් hexColor එකෙන් පොඩි ටින්ට් එකක් මෙතනින් මැටීරියල් එකට දාන්න පුළුවන්
          if (child.material && !child.name.includes('chrome') && !child.name.includes('glass')) {
            child.material = child.material.clone(); 
            // child.material.color = new THREE.Color(customColor); // 👈 ඔරිජිනල් මොඩල් කලර්ස්ම ඕන නම් මේ ලයින් එක කමෙන්ට් කරලා තියන්න මචං
          }
        }
      });
    }
    return clone;
  }, [scene, customColor]);

  const modelRef = useRef();

  // 🌊 Smooth Idle Floating Animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (modelRef.current) {
      modelRef.current.rotation.y = t * 0.2; 
      modelRef.current.position.y = Math.sin(t) * 0.08; 
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

// 🚀 PRELOAD ALL 5 MODELS: සයිට් එක ලෝඩ් වෙද්දීම මොඩල් පහම බැක්ග්‍රවුන්ඩ් එකේ ලෝඩ් කරගන්නවා (කාඩ් ක්ලික් කරද්දී පටස් ගාලා මාරු වෙන්න)
useGLTF.preload('/models/aerosound_x.glb', 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
useGLTF.preload('/models/aerosound_pro.glb', 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
useGLTF.preload('/models/aerosound_lite.glb', 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
useGLTF.preload('/models/aerosound_ultra.glb', 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
useGLTF.preload('/models/aerosound_sport.glb', 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/');