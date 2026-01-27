const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },

    image: { type: String, default: null },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    sellerId: { type: Schema.Types.ObjectId, ref: "User", default: null },

    // BỔ SUNG TỒN KHO
    inventory: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    isAuction: { type: Boolean, default: false },
    auctionEndTime: { type: Date },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
