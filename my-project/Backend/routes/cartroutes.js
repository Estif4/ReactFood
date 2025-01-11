const express = require("express");
const cartdata = require("../model/cart");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { item } = req.body; // Destructure `item` from request body
    console.log("Received request body:", item);

    if (!item || Object.keys(item).length === 0) {
      return res.status(400).json({ message: "No cart data provided" });
    }

    // Check if the item already exists in the cart
    const existingData = await cartdata.findOne({ id: item.id });
    console.log("Existing data:", existingData);

    if (existingData) {
      return res
        .status(409)
        .json({ message: "Item already added to the cart" });
    }
    console.log("------------------------------");
    // Add new item to the cart
    const newCart = await cartdata.create(item);

    res.status(201).json({ newCart });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Server error, try again later." });
  }
});

router.get("/", async (req, res) => {
  try {
    const cart = await cartdata.find();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.patch("/:id", async (req, res) => {
  console.log("patched");
  try {
    const itemId = req.params.id;
    const { quantity } = req.body;
    if (!quantity || quantity < 1) {
      await cartdata.deleteOne({ id: itemId });
      const updatedCart1 = await cartdata.find();

      return res.status(200).json(updatedCart1);
    }

    const updatedItem = await cartdata.findOneAndUpdate(
      { id: itemId },
      { quantity },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    const updatedCart = await cartdata.find();
    console.log(updatedCart);
    res.status(200).json(updatedCart);
  } catch (err) {
    console.error("Error updating cart:", err);
    res.status(500).json({ message: "Server error, try again later." });
  }
});

module.exports = router;
