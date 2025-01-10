const mongoose = require("mongoose");



const cartschema = new mongoose.Schema({
    id: {
      type: Number,
      unique: true,
    },
    name: { type: String },
    image: { type: String },
    description: { String },
    price: { type: Number },
    quantity: { type: Number },
  });
  const cartdata=mongoose.model('cart',cartschema);
  module.exports=cartdata