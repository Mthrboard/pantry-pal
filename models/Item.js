const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  itemName: { type: String, unique: true, required: true},
  description: { type: String },
  barcode: { type: String },
  dateType: {},
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Item", default: null },
  dateCreated: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("Item", ItemSchema);