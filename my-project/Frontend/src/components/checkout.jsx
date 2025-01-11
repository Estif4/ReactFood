import React, { useState, useEffect } from "react";
import { validation } from "../../utils/validation";
import { motion, useAnimate } from "framer-motion";

export default function CheckOut({
  toggleCheckout,
  totPrice,
  setselecteditem,
}) {
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    street: "",
    postalcode: "",
    city: "",
  });

  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    postalcode: "",
    city: "",
  });

  const [isVisible, setIsVisible] = useState(true);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!isVisible) {
      setTimeout(() => {
        toggleCheckout(); // Close the checkout after animation
      }, 500); // Matches the animation duration
    }
  }, [isVisible, toggleCheckout]);

  function inputHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function submitForm(event) {
    event.preventDefault();

    if (validation(formData, setErrors)) {
      try {
        const response = await fetch("http://localhost:4000/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: formData, totPrice }),
        });

        if (!response.ok) {
          const errorDetails = await response.text();
          throw new Error(
            `Failed to sync with backend: ${response.status} - ${errorDetails}`
          );
        }

        const formofdata = await response.json();
        const { checkoutData, clearedCart } = formofdata;
        setselecteditem(clearedCart);
        setMessage({ text: formofdata.message, type: "success" });

        setFormData({
          fullname: "",
          email: "",
          street: "",
          postalcode: "",
          city: "",
        });

        setTimeout(() => {
          setMessage(null);
          setIsVisible(false); // Trigger exit animation
        }, 3000);
      } catch (error) {
        console.error("Error during form submission:", error.message);
        setMessage({
          text: "Submission failed. Please try again.",
          type: "error",
        });

        setTimeout(() => setMessage(null), 3000);
      }
    } else {
      setMessage({
        text: "Please correct the errors in the form and try again.",
        type: "error",
      });

      setTimeout(() => setMessage(null), 3000);
    }
  }

  // Shake animation on error
  const shakeAnimation = {
    x: [0, 20, -20, 20, -20, 10, 0],
    transition: { duration: 0.5, ease: "easeInOut" },
  };

  return (
    <div
      className={`fixed left-0 right-0 bottom-0 top-0 bg-black bg-opacity-80 flex justify-center items-center z-50 transition-all duration-500 ${
        isVisible ? "animate-slideInFromTop" : "animate-slideOutToTop"
      }`}>
      {message && (
        <div
          className={`fixed top-4 left-4 text-white px-4 py-2 rounded shadow-md animate-slideInFromTop ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}>
          {message.text}
        </div>
      )}

      <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96 max-h-[90%] overflow-auto flex flex-col">
        <div className="text-2xl font-semibold text-black pb-4 animate-textPop">
          Checkout
        </div>
        <p className="text-gray-500 pb-4 text-sm font-serif">
          {`Total amount = ${totPrice}`}
        </p>

        <form className="flex flex-col space-y-4" onSubmit={submitForm}>
          {/* Full Name */}
          <div>
            <label className="font-semibold text-sm">Full Name</label>
            <motion.input
              className={`w-full p-2 border ${
                errors.fullname ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-transform duration-200 ease-in-out hover:scale-105`}
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={inputHandler}
              animate={errors.fullname ? shakeAnimation : {}}
            />
            {errors.fullname && (
              <span className="text-red-500 text-sm">{errors.fullname}</span>
            )}
          </div>

          {/* E-Mail Address */}
          <div>
            <label className="font-semibold text-sm">E-Mail Address</label>
            <motion.input
              className={`w-full p-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-transform duration-200 ease-in-out hover:scale-105`}
              type="email"
              name="email"
              value={formData.email}
              onChange={inputHandler}
              animate={errors.email ? shakeAnimation : {}}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          {/* Street Address */}
          <div>
            <label className="font-semibold text-sm">Street (optional)</label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-transform duration-200 ease-in-out hover:scale-105"
              type="text"
              name="street"
              value={formData.street}
              onChange={inputHandler}
            />
          </div>

          {/* Postal Code and City */}
          <div className="flex gap-6 justify-between">
            <div className="flex flex-col w-full">
              <label className="font-semibold text-sm">Postal Code</label>
              <motion.input
                className={`w-full p-2 border ${
                  errors.postalcode ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-transform duration-200 ease-in-out hover:scale-105`}
                type="number"
                name="postalcode"
                value={formData.postalcode}
                onChange={inputHandler}
                animate={errors.postalcode ? shakeAnimation : {}}
              />
              {errors.postalcode && (
                <span className="text-red-500 text-sm">
                  {errors.postalcode}
                </span>
              )}
            </div>

            <div className="flex flex-col w-full">
              <label className="font-semibold text-sm">City</label>
              <motion.input
                className={`w-full p-2 border ${
                  errors.city ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-transform duration-200 ease-in-out hover:scale-105`}
                type="text"
                name="city"
                value={formData.city}
                onChange={inputHandler}
                animate={errors.city ? shakeAnimation : {}}
              />
              {errors.city && (
                <span className="text-red-500 text-sm">{errors.city}</span>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-4 mt-6">
            <button
              type="button"
              onClick={() => setIsVisible(false)} // Trigger slide-out on close
              className="w-full sm:w-auto py-2 px-4 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-200 transform hover:scale-105">
              Close
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto py-2 px-6 text-lg font-semibold text-white bg-yellow-500 rounded-md hover:bg-yellow-600 transition duration-200 transform hover:scale-105">
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
