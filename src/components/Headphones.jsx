import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function Headphones(props) {
  const { scene } = useGLTF('/models/airpods_max.glb');
  const modelRef = useRef();

  // මේක හැම ෆ්‍රේම් එකකදීම රන් වෙනවා (Idle Animation)
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (modelRef.current) {
      // 1. ලාවට වටේට කැරකෙනවා
      modelRef.current.rotation.y = t * 0.2; 
      // 2. ලස්සනට උඩ පල්ලෙහා පාවෙනවා (Floating effect)
      modelRef.current.position.y = Math.sin(t) * 0.15; 
    }
  });

  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      {...props} 
    />
  );
}