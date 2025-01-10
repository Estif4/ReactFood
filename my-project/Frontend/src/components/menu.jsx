import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Menu({
  selectedItem,
  setSelecteditem,
  itemselecthandler,
  loading,
  menudata,
  error,
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Scroll effects
  const { scrollY } = useScroll();
  const opacityY = useTransform(scrollY, [0, 300], [1, 0]);

  const textscale = useTransform(scrollY, [0, 50], [1, 1.5]);
  const ymove=useTransform(scrollY, [0, 100], [0, 50]);

  async function fetchDatatocart(item) {
    try {
      const response = await fetch("https://reactfood.onrender.com/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item }),
      });

      if (!response.ok) {
        if (response.status === 409) {
          const errorData = await response.json();
          alert(errorData.message);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      const cartItem = responseData.newCart;
      setSelecteditem((prevItems) => [...prevItems, cartItem]);
    } catch (err) {
      console.error("Error sending cart data:", err);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          className="rounded-full h-12 w-12 border-4 border-blue-300 border-t-blue-600"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-32 mb-36">
        {error.message ||
          "An unexpected error occurred. Please try again later."}
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition transform hover:scale-105">
          Retry
        </button>
      </div>
    );
  }

  if (!menudata || menudata.length === 0) {
    return (
      <div className="text-gray-500 text-center mt-12">
        No menu items available at the moment.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen px-4 mt-16">
      {/* Header Animation */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }} // Exit animation
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-3xl font-bold text-green-800 mb-8"
        style={{ opacity: opacityY, scale: textscale,y:ymove }}>
        Explore Our Menu
      </motion.h1>

      {/* Menu Grid */}
      <motion.div
        className="grid grid-cols-3 gap-8 w-full max-w-6xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2, // Less delay between children
              delayChildren: 0.5, // Initial delay before stagger starts
            },
          },
        }}>
        {menudata.map((item, index) => {
          const delay = (index % 3) * 0.2; // Loop between 0, 0.2, 0.4 for delay
          return (
            <motion.div
              key={item.id || index}
              className={`bg-gray-800 p-6 flex flex-col items-center justify-between h-full rounded-lg shadow-lg hover:shadow-2xl`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }} // Trigger animation when in view
              transition={{
                duration: 1, // Slow down the transition for more effect
                ease: "easeOut",
                delay: delay, // Apply the calculated delay
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <div className="relative w-full">
                <img
                  src={`https://reactfood.onrender.com/${item.image}`}
                  alt={item.name}
                  className="w-full h-48 md:h-56 object-cover rounded-lg transform transition-transform duration-300 hover:scale-110"
                  onLoad={() => setIsLoaded(true)} // Set loaded state on image load
                />
              </div>
              <div className="text-center mt-4">
                <p className="text-lg text-white font-bold">{item.name}</p>
                <p className="text-yellow-400 text-lg font-semibold">{`$${item.price}`}</p>
                <p className="text-gray-300 text-sm mt-2">{item.description}</p>
              </div>
              <motion.button
                onClick={() => fetchDatatocart(item)}
                className="bg-yellow-500 text-black font-semibold py-2 px-6 mt-4 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                Add to Cart
              </motion.button>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
