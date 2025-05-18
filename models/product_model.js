const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
  },
  quantity: {
    type: Number,
    required: [true, "Please enter product quantity"],
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
  },
  image: {
    type: String,
    required: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});


const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;