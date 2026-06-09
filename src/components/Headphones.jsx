import React from 'react';
import { useGLTF } from '@react-three/drei';

export function Headphones(props) {
  const { scene } = useGLTF('/models/airpods_max.glb'); // GLTFLoader එකෙන් මේ මොඩලය ලෝඩ් කරලා තියෙනවා

  return (
    <primitive 
      object={scene} 
      {...props} // Hero.jsx එකෙන් එවන scale, position, rotation ඔක්කොම ඔටෝමැටිකලි මෙතනට ඇප්ලයි වෙනවා
    />
  );
}