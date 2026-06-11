import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from "./components/Hero"; 
import ProductShowcase from "./components/ProductShowcase";
import ProductDetail from "./components/ProductDetail";
import Reviews from "./components/Reviews";

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeSection, setActiveSection] = useState('explore'); // දැනට ඉන්න සෙක්ෂන් එක බලාගන්න

  // 💡 ස්මූත් එකේ ස්ක්‍රෝල් වෙන ලොජික් එක
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 🔄 ස්ක්‍රෝල් කරනකොට දැනට ඉන්න තැන ඉබේම අල්ලගන්නා ලොජික් එක
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 } // සෙක්ෂන් එකෙන් 50%ක් තිරේට ආවම underline එක මාරු වෙනවා
    );

    const sections = ['explore', 'collections', 'reviews'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#0B0B0B] min-h-screen w-full relative">
      
      {/* 1. HERO SECTION (id="explore" ඇටෑච් කරා) */}
      <div id="explore">
        <Hero onNavClick={scrollToSection} activeSection={activeSection} /> 
      </div>

      {/* 2. PRODUCT SHOWCASE SECTION (id="collections" ඇටෑච් කරා) */}
      <div id="collections">
        <ProductShowcase onSelectProduct={setSelectedProduct} />
      </div>
      
      {/* 3. REVIEWS SECTION (id="reviews" ඇටෑච් කරා) */}
     <div id="reviews">
        <Reviews />
      </div>
      
      {/* 3D Detail Panel */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0, y: '30%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '30%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 200 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-[#070707]"
          >
            <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}