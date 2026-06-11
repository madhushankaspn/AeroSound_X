import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// components
import Hero from "./components/Hero"; 
import ProductShowcase from "./components/ProductShowcase";
import ProductDetail from "./components/ProductDetail";
import Reviews from "./components/Reviews";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Notifications from "./components/Notifications";

export default function App() {
  // --- States ---
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeSection, setActiveSection] = useState('explore'); 
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false); // Notification state එක

  // --- Smooth Scroll Logic ---
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- Active Section Detection (Observer) ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = ['explore', 'collections', 'reviews'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // --- Cart Functions ---
  const addToCart = (product, quantity = 1) => {
    const numericPrice = typeof product.price === 'string' 
      ? parseFloat(product.price.replace(/[^0-9.]/g, '')) 
      : product.price;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { ...product, price: numericPrice, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, change) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // --- Total Calculation ---
  const subTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // --- Render ---
  return (
    <div className="bg-[#0B0B0B] min-h-screen w-full relative">
      
      {/* 1. HERO SECTION */}
      <div id="explore">
        <Hero 
          onNavClick={scrollToSection} 
          activeSection={activeSection} 
          onCartClick={() => setIsCartOpen(true)} // Cart එක Open කරන එක
          onNotificationClick={() => setIsNotificationsOpen(true)} // Notification එක Open කරන එක
        /> 
      </div>

      {/* 2. PRODUCT SHOWCASE SECTION */}
      <div id="collections">
        <ProductShowcase onSelectProduct={setSelectedProduct} />
      </div>
      
      {/* 3. REVIEWS SECTION */}
      <div id="reviews">
        <Reviews />
      </div>
      
      {/* 4. PRODUCT DETAIL OVERLAY */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0, y: '30%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '30%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 200 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-[#070707]"
          >
            <ProductDetail 
              product={selectedProduct} 
              onBack={() => setSelectedProduct(null)} 
              addToCart={addToCart} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. CART DRAWER */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        onCheckout={() => { 
          setIsCartOpen(false); 
          setIsCheckout(true); 
        }}
      />

      {/* 6. CHECKOUT SCREEN */}
      {isCheckout && (
        <div className="fixed inset-0 z-50 bg-[#070707] overflow-y-auto">
          <Checkout 
            cartItems={cartItems} 
            subTotal={subTotal} 
            onBack={() => { 
              setIsCheckout(false); 
              scrollToSection('collections'); 
            }} 
          />
        </div>
      )}

      {/* 7. NOTIFICATION SCREEN */}
      {isNotificationsOpen && (
        <div className="fixed inset-0 z-50 bg-[#070707] overflow-y-auto">
          <Notifications onBack={() => setIsNotificationsOpen(false)} />
        </div>
      )}

    </div>
  );
}