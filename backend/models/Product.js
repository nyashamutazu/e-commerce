const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000
    },
    price: {
      type: Number,
      trim: true,
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    quantity: {
      type: Number
    },
    sold: {
      type: Number,
      default: 0
    },
    photos: [
      {
        data: Buffer,
        contentType: String
      }
    ],
    shipping: {
      required: false,
      type: Boolean
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

mongoose.plugin(uniqueValidator);

class ProductClass {
  delete() {}
}

ProductSchema.loadClass(ProductClass);

module.exports = mongoose.model("Product", ProductSchema);
