import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import LandingPage from "./components/LandingPage";
import CheckoutModal from "./components/CheckoutModal";
import StudentPortal from "./components/StudentPortal";

export default function App() {
  // Read persistent transaction status from standard browser storage
  const [isPurchased, setIsPurchased] = useState<boolean>(() => {
    const saved = localStorage.getItem("focus_mindset_is_purchased");
    return saved === "true";
  });
  
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Synchronize state changes to store
  const handlePurchaseSuccess = () => {
    setIsCheckoutOpen(false);
    setIsPurchased(true);
    localStorage.setItem("focus_mindset_is_purchased", "true");
  };

  const handleLogout = () => {
    setIsPurchased(false);
    localStorage.removeItem("focus_mindset_is_purchased");
  };

  // Scroll to layout top on viewport changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [isPurchased]);

  return (
    <div className="bg-black text-white min-h-screen">
      <AnimatePresence mode="wait">
        {isPurchased ? (
          <motion.div
            key="portal-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StudentPortal onLogout={handleLogout} />
          </motion.div>
        ) : (
          <motion.div
            key="landing-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage 
              onTriggerCheckout={() => setIsCheckoutOpen(true)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popups & Drawer modals */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        onSuccess={handlePurchaseSuccess}
      />
    </div>
  );
}
