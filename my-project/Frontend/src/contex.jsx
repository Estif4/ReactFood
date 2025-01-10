import React, { createContext, useState, useEffect } from "react";

// Create the context
const ItemContext = createContext();

// Create the provider component
export const ItemProvider = ({ children }) => {
  const [selecteditem, setselecteditem] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutopen, setisCheckoutopen] = useState(false);
  const [totPrice, setTotalprice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingcart, setLoadingcart] = useState(true);
  const [errorcart, setErrorcart] = useState(null);
  const [menudata, setMenu] = useState([]);

  // Toggle cart visibility
  function toggleCart() {
    setIsCartOpen((prev) => !prev);
  }

  // Toggle checkout visibility
  function toggleCheckout(event) {
    event.preventDefault();
    setisCheckoutopen((prev) => !prev);
  }

  // Add item to selected items
  function itemSelecthandler(items) {
    selecteditem?.some((item) => item.id === items.id)
      ? ""
      : setselecteditem((prev) => [...prev, items]);
  }

  // Fetch cart data
  useEffect(() => {
    async function fetchcartData() {
      try {
        const response = await fetch("http://localhost:5000/cart");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Parse JSON
        setselecteditem(data);
      } catch (err) {
        console.error("Error fetching cart data:", err);
        setErrorcart(err);
      } finally {
        setLoadingcart(false); // Ensure loading is stopped
      }
    }

    fetchcartData();
  }, []);

  // Fetch menu data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/menu");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Parse JSON
        setMenu(data); // Set data into state
      } catch (err) {
        console.error("Error fetching menu data:", err);
        setError(err);
      } finally {
        setLoading(false); // Ensure loading is stopped
      }
    }

    fetchData();
  }, []);

  // Provide context values
  return (
    <ItemContext.Provider
      value={{
        selecteditem,
        setselecteditem,
        isCartOpen,
        toggleCart,
        isCheckoutopen,
        toggleCheckout,
        totPrice,
        setTotalprice,
        loading,
        error,
        loadingcart,
        errorcart,
        menudata,
        itemSelecthandler,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export default ItemContext;
