import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence

export default function Cart({
  toggleCart,
  selecteditem,
  setselecteditem,
  toggleCheckout,
  totPrice,
  setTotalprice,
  loadingcart,
  errorcart,
}) {
  const [loadingSync, setLoadingSync] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // For animation state

  useEffect(() => {
    setTotalprice(
      selecteditem.reduce(
        (accum, item) => accum + item.quantity * item.price,
        0
      )
    );
  }, [selecteditem]);

  // Backend synchronization for updating quantity
  async function syncQuantity(itemId, newQuantity) {
    setLoadingSync(true);
    try {
      const response = await fetch(`http://localhost:5000/cart/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(
          `Failed to sync with backend: ${response.status} - ${errorDetails}`
        );
      }
      const data = await response.json();
      setselecteditem(data);
    } catch (error) {
      console.error("Backend synchronization failed:", error);
    } finally {
      setLoadingSync(false);
    }
  }

  function increaseQuantity(item) {
    syncQuantity(item.id, item.quantity + 1);
  }

  function decreaseQuantity(item) {
    if (item.quantity >= 1) {
      syncQuantity(item.id, item.quantity - 1);
    }
  }

  const handleClose = () => {
    setIsVisible(false); // Trigger slide-out animation
    setTimeout(() => toggleCart(), 1000); // Wait for animation to finish
  };

  if (loadingcart) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-300 border-t-blue-600"></div>
      </div>
    );
  }

  if (errorcart) {
    return (
      <div className="text-red-500 text-center mt-32 mb-36">
        {errorcart.message ||
          "An unexpected error occurred. Please try again later."}
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <motion.div
            className="bg-white p-6 rounded-md shadow-lg w-full sm:w-96 h-auto max-h-[90%] min-h-[70%] overflow-auto flex flex-col"
            layout // Apply layout prop to animate layout changes
            initial={{ opacity: 0, y: 30 }} // Initial position (off-screen)
            animate={{ opacity: 1, y: 0 }} // Final position (in view)
            exit={{ opacity: 0, y: -100 }} // Slide-out effect
            transition={{ duration: 0.5, ease: "easeOut" }} // Smooth duration
          >
            <p className="text-2xl font-semibold text-black text-center">
              Your Cart
            </p>

            <motion.div className="overflow-y-auto mt-4" layout>
              {selecteditem.length === 0 ? (
                <p className="mt-16 font-serif text-orange-500 text-xl text-center">
                  No item is selected
                </p>
              ) : (
                <AnimatePresence mode="sync">
                  {selecteditem.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="flex justify-between items-center border-b border-gray-300 py-4"
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }} // Animating to original position
                      exit={{ opacity: 0, y: -100 }} // Moving off-screen to the left when exiting
                      transition={{
                        duration: 0.4, // Smooth duration for entry
                        ease: "easeOut", // Easing for smooth transition
                      }}
                    >
                      <div className="flex flex-col">
                        <span className="text-lg font-medium">{`${index + 1}. ${
                          item.name
                        }`}</span>
                        <span className="text-sm text-gray-600">
                          Price: ${item.price}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => decreaseQuantity(item)}
                          className={`bg-slate-700 w-8 h-8 flex items-center justify-center text-white rounded-full text-lg ${
                            loadingSync ? "opacity-50 pointer-events-none" : ""
                          }`}
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item)}
                          className={`bg-slate-700 w-8 h-8 flex items-center justify-center text-white rounded-full text-lg ${
                            loadingSync ? "opacity-50 pointer-events-none" : ""
                          }`}
                        >
                          +
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </motion.div>
            <div className="flex-grow"></div>
            <div className="flex justify-between items-center mt-4 border-t pt-4">
              <p className="text-xl font-semibold text-black">{`Total Price: $${totPrice.toFixed(
                2
              )}`}</p>
            </div>

            <div className="flex justify-between space-x-4 mt-6">
              <button
                onClick={handleClose}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
              >
                Close
              </button>
              {selecteditem.length > 0 && (
                <button
                  onClick={(event) => {
                    handleClose();
                    toggleCheckout(event);
                  }}
                  className="text-lg font-semibold border py-2 px-6 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white transition duration-300"
                >
                  Go to Checkout
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
