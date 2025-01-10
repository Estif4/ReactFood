import React, { useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Header({ toggleCart, selecteditem }) {
  const [isBouncing, setIsBouncing] = useState(false);

  // Use Framer Motion's scroll position
  const { scrollY } = useScroll();

  // Adjust opacity based on scroll position
  const opacityY = useTransform(scrollY, [0, 100, 200], [1, 0.8, 0]); // Fully visible at 0, fades out at 200px scroll

  // Trigger bounce effect when an item is added to the cart
  useEffect(() => {
    if (selecteditem.length > 0) {
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 1000); // Reset bounce after 1 second
    }
  }, [selecteditem]);

  return (
    <motion.div
      style={{
        pointerEvents: opacityY ? "auto" : "none", // Disable pointer events when invisible
      }}
      className="fixed top-0 left-0 w-full p-4 h-16 flex items-center space-x-2 justify-between bg-gradient-to-r from-green-700 via-green-600 to-lime-500 shadow-lg z-50">
      {/* Logo and Name */}
      <div className="flex items-center space-x-2">
        <motion.img
          className="w-12 h-12 rounded-full border-2 border-white"
          src={`http://localhost:5000/images/assets/logo.jpg`}
          alt="foodlogo"
          initial={{ rotateY: -360 }}
          animate={{ rotateY: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        <span className="text-2xl text-white font-serif tracking-widest">
          FoodieHub
        </span>
      </div>

      {/* Cart Icon */}
      <div className="flex relative top-2 cursor-pointer">
        <motion.img
          onClick={() => toggleCart()}
          className="w-10 h-10 rounded-full border-2 border-white"
          src={`http://localhost:5000/images/assets/cart.jpg`}
          alt="cartimg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ rotate: 10 }}
          animate={{
            scale: isBouncing ? 1.2 : 1,
            rotate: isBouncing ? 15 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 10,
            duration: 0.3,
          }}
        />

        {selecteditem.length > 0 && (
          <motion.div
            className="absolute bottom-8 left-6 w-6 h-6 text-center pb-4 rounded-full text-sm p-1 bg-red-600 text-white border border-white"
            animate={{
              scale: isBouncing ? 1.2 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10,
              duration: 0.3,
            }}>
            {selecteditem.length}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
