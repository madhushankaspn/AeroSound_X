import React from 'react';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase'; // 👈 අලුත් පේජ් එක Import කරගන්න

export default function App() {
  return (
    // 💡 Wrapper එකේ overflow-x-hidden විතරක් දාන්න. 
    // overflow-hidden දැම්මොත් සයිට් එක පල්ලෙහාට scroll වෙන්නේ නැහැ මචං!
    <div className="bg-[#0B0B0B] w-full min-h-screen overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* 1. First Page (Hero Section + 3D Canvas) */}
      <Hero />
      
      {/* 2. Second Page (Circular 3D Product Showcase Carousel) */}
      <ProductShowcase />
      
    </div>
  );
}