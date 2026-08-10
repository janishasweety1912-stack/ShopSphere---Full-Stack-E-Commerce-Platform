const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    subCategory: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    productType: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      default: 0,
    },

    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    colors: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Product",
  productSchema
);