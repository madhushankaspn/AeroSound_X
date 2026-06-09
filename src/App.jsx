import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from "./components/Hero"; // ඔයාගේම සුපිරි ඔරිජිනල් Hero එක
import ProductShowcase from "./components/ProductShowcase";
import ProductDetail from "./components/ProductDetail";

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 💡 බටන් එක එබුවාම Product Showcase එක තියෙන තැනට ස්මූත් එකේ Scroll වෙන ලොජික් එක
  const scrollToProducts = () => {
    const element = document.getElementById('product-showcase-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#0B0B0B] min-h-screen w-full relative">
      
      {/* 1. ඔයාගේ ඔරිජිනල් Hero එක (බටන් ෆන්ක්ෂන් එක Prop එකක් විදිහට යැව්වා) */}
      <Hero onPreOrderClick={scrollToProducts} /> 

      {/* 2. Product Showcase එක (id එකක් ඇටෑච් කරා Scroll එක අල්ලගන්න) */}
      <div id="product-showcase-section">
        <ProductShowcase onSelectProduct={setSelectedProduct} />
      </div>
      
      {/* 3. Showcase එකේ "Pre-Order Now" ක්ලික් කරාම විතරක් උඩින් ලෝඩ් වෙන 3D Detail පේජ් එක */}
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