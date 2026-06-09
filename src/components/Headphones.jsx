import React, { useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Headphones({ modelPath = '/models/aerosound_x.glb', customColor, ...props }) {
  const { scene } = useGLTF(
    modelPath, 
    'https://www.gstatic.com/draco/versioned/decoders/1.5.7/'
  );
  
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    
    if (customColor) {
      clone.traverse((child) => {
        if (child.isMesh) {
          if (child.material && !child.name.includes('chrome') && !child.name.includes('glass')) {
            child.material = child.material.clone(); 
            child.material.color = new THREE.Color(customColor);
          }
        }
      });
    }
    return clone;
  }, [scene, customColor]);

  const modelRef = useRef();

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
        object={clonedScene} />
    </group>
  );
}

useGLTF.preload('/models/aerosound_x.glb', 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
useGLTF.preload('/models/aerosound_pro.glb', 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
useGLTF.preload('/models/aerosound_lite.glb', 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
useGLTF.preload('/models/aerosound_ultra.glb', 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
useGLTF.preload('/models/aerosound_sport.glb', 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/');