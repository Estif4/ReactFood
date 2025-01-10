const mongoose = require("mongoose");



const Menuschema = new mongoose.Schema({
    id: {
      type: Number,
      unique: true,
    },
    name: { type: String },
    image: { type: String },
    description: {type: String },
    price: { type: Number },
    quantity: { type: Number },
  });
  const foodmenu=mongoose.model('Foodmenus',Menuschema);
  module.exports=foodmenu