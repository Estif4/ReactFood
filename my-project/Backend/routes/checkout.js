const express = require("express");
const checkoutdata = require("../model/checkout");
const cartdata = require("../model/cart");
const router = express.Router();

router.post("/", async (req, res) => {
  const { data, totPrice } = req.body;

  // Validate the input data
  if (
    !data ||
    !data.fullname ||
    !data.email ||
    !data.postalcode ||
    !data.city
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Create checkout data
    const addeddata = await checkoutdata.create({
      ...data,
      totPrice: totPrice,
    });

    const cartItems = await cartdata.deleteMany({});
    const cartItem = await cartdata.find({});

    res.status(200).json({
      message:
        "Your order has been placed. A confirmation email will be sent to you shortly.",
      checkoutData: addeddata,
      clearedCart: cartItem,
    });
  } catch (err) {
    console.error("Error processing checkout:", err);
    res.status(500).json({ message: "Server error, try again later." });
  }
});

module.exports = router;
