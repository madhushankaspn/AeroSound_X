import React, { useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Headphones({ modelPath = '/models/airpods_max.glb', customColor, ...props }) {
  const { scene } = useGLTF(
    modelPath, 
    'https://www.gstatic.com/draco/versioned/decoders/1.5.7/'
  );
  
  // 🎯 CRITICAL FIX: එකම මොඩල් එක තැන් කිහිපයක රෙන්ඩර් වීමේ ගැටලුව සහ ඩයිනමික් කලර්ස් ෆික්ස් එක
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    
    if (customColor) {
      clone.traverse((child) => {
        if (child.isMesh) {
          // හෙඩ්ෆෝන් එකේ ප්‍රධාන කන් දෙකට (Earcups/Body) අදාළ මැටීරියල් එක විතරක් පාට කරන්න
          // සාමාන්‍යයෙන් AirPods මොඩල් එකේ ප්‍රධාන කොටස් වල මැටීරියල් නම body හෝ earcup වගේ වෙනවා.
          // ඔක්කොම එකම පාටක් වෙන්නේ නැතුව ලස්සනට බ්ලෙන්ඩ් වෙන්න මෙහෙම ටින්ට් කරමු:
          if (child.material && !child.name.includes('chrome') && !child.name.includes('glass')) {
            child.material = child.material.clone(); // Clone material to avoid modifying other instances
            child.material.color = new THREE.Color(customColor);
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

useGLTF.preload(
  '/models/airpods_max.glb', 
  'https://www.gstatic.com/draco/versioned/decoders/1.5.7/'
);