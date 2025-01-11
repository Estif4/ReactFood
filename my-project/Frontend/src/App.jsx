import React, { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Menu from "./components/menu.jsx";
import Cart from "./components/cartModal.jsx";
import CheckOut from "./components/checkout.jsx";
import Footer from "./components/footer.jsx";
function App() {
  const [selecteditem, setselecteditem] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutopen, setisCheckoutopen] = useState(false);
  const [totPrice, setTotalprice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingcart, setLoadingcart] = useState(true);
  const [errorcart, setErrorcart] = useState(null);
  const [menudata, setMenu] = useState([]);
  function toggleCart() {
    setIsCartOpen((prev) => !prev);
  }
  function toggleCheckout() {
    setisCheckoutopen((prev) => !prev);
  }
  function itemSelecthandler(items) {
    selecteditem?.some((item) => item.id === items.id)
      ? ""
      : setselecteditem((prev) => [...prev, items]);
  }
  useEffect(() => {
    async function fetchcartData() {
      try {
        const response = await fetch("https://reactfood.onrender.com/cart");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Parse JSON

        setselecteditem(data);
      } catch (err) {
        console.error("Error fetching menu data:", err);
        setErrorcart(err);
      } finally {
        setLoadingcart(false); // Ensure loading is stopped
      }
    }

    fetchcartData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://reactfood.onrender.com/menu");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Parse JSON
        console.log(data);
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
  return (
    <>
      <Header toggleCart={toggleCart} selecteditem={selecteditem} />
      <Menu
        selectedItem={selecteditem}
        setSelecteditem={setselecteditem}
        itemselecthandler={itemSelecthandler}
        loading={loading}
        menudata={menudata}
        error={error}
      />

      {isCartOpen ? (
        <Cart
          toggleCart={toggleCart}
          selecteditem={selecteditem}
          setselecteditem={setselecteditem}
          toggleCheckout={toggleCheckout}
          totPrice={totPrice}
          setTotalprice={setTotalprice}
          loadingcart={loadingcart}
          errorcart={errorcart}
        />
      ) : (
        ""
      )}
      {isCheckoutopen ? (
        <CheckOut
          toggleCheckout={toggleCheckout}
          toggleCart={toggleCart}
          selecteditem={selecteditem}
          setselecteditem={setselecteditem}
          totPrice={totPrice}
          setTotalprice={setTotalprice}
        />
      ) : (
        ""
      )}
      <Footer />
    </>
  );
}

export default App;
