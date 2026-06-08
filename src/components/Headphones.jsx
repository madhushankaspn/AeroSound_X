import React from 'react';
import { useGLTF } from '@react-three/drei';

export function Headphones() {
  
  const { scene } = useGLTF('/models/airpods_max.glb');
  

  return (
    <primitive 
      object={scene} 
      scale={1.8} 
      position={[0, 0, 0]} 
    />
  );
}


useGLTF.preload('/models/airpods_max.glb');