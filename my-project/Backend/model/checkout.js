const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  street: { type: String, default: "" },
  postalcode: { type: Number, required: true },
  city: { type: String, required: true },
  totPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
