import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useGSAP } from '@gsap/react';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP වලට ScrollTrigger ප්ලගින් එක රෙජිස්ටර් කරනවා
gsap.registerPlugin(ScrollTrigger);

export function Headphones(props) {
  const { scene } = useGLTF('/models/airpods_max.glb');
  const modelRef = useRef();

  // 1️⃣ IDLE ANIMATION: පේජ් එක නිකන් තියෙද්දී ලස්සනට පාවෙන්න (Floating Effect)
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (modelRef.current && !ScrollTrigger.isInProgress) {
      modelRef.current.position.y = Math.sin(t) * 0.1; // ලාවට උඩ පල්ලෙහා යනවා
    }
  });

  // 2️⃣ GSAP SCROLL-DRIVEN TIMELINE (මැජික් එක)
  useGSAP(() => {
    if (!modelRef.current) return;

    // ප්‍රධාන Timeline එකක් හදනවා සෙක්ෂන්ස් 3ම කවර් වෙන්න
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-container", // App.jsx එකේ තියෙන ප්‍රධාන ක්ලාස් එක
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // ස්ක්‍රෝල් කරන වේගයටම සිනිඳුවට ඇනිමේෂන් එක වෙන්න (smoothness 1s)
      }
    });

    /* ==========================================
       SECTION 1 සිට SECTION 2 දක්වා (Scroll: 0% -> 50%)
       මොඩල් එක කැරකෙමින් මැදට ඇවිත් ලොකු වෙනවා
       ========================================== */
    tl.to(modelRef.current.position, { x: 0, y: 0, z: 1.2, duration: 1 }, 0)
      .to(modelRef.current.rotation, { y: Math.PI * 1.5, x: 0.2, duration: 1 }, 0);

    /* ==========================================
       EXPLODE EFFECT (කෑලි වෙන් වෙන ලොජික් එක)
       3D මොඩල් එක ඇතුලේ තියෙන හැම කුඩා කෑල්ලක්ම 
       Timeline එකේ මැදදී (0.5) එළියට තල්ලු කරනවා
       ========================================== */
    scene.traverse((child) => {
      if (child.isMesh) {
        // මුලින්ම තිබුණු තැන් (Original Positions) මතක තබා ගන්නවා
        if (!child.userData.origX) {
          child.userData.origX = child.position.x;
          child.userData.origY = child.position.y;
          child.userData.origZ = child.position.z;
        }

        // Section 2 එකට ළඟා වෙද්දී කෑලි පිටතට ගැලවෙනවා (Explode)
        const directionX = child.position.x >= 0 ? 1 : -1;
        const directionY = child.position.y >= 0 ? 1 : -1;

        tl.to(child.position, {
          x: child.userData.origX + (directionX * 0.6), // වම් කෑලි වමට, දකුණු කෑලි දකුණට
          y: child.userData.origY + (directionY * 0.2),
          duration: 0.4
        }, 0.4) // Timeline එකේ 0.4 වෙනි තැනදී මේක සිද්ධ වෙනවා
        
        /* ==========================================
           SECTION 2 සිට SECTION 3 දක්වා (Scroll: 50% -> 100%)
           කෑලි ආපහු එකතු වෙලා (Reassemble) වමට යනවා
           ========================================== */
        .to(child.position, {
          x: child.userData.origX,
          y: child.userData.origY,
          duration: 0.4
        }, 0.8); // 0.8 වෙනි තැනදී ආයෙත් එකතු වෙනවා
      }
    });

    // මුළු මොඩල් එකම Section 3 එකට යද්දී වම් පැත්තට හැරිලා යනවා
    tl.to(modelRef.current.position, { x: -1.3, y: -0.2, z: 0, duration: 1 }, 1)
      .to(modelRef.current.rotation, { y: Math.PI * 2.5, x: 0, duration: 1 }, 1);

  }, [scene]);

  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      scale={3.5} 
    />
  );
}