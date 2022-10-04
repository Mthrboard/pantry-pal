const mongoose = require("mongoose");

const ItemDynamicSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  locationId: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quantity: { type: Number, required: true },
  itemDate: { type: String, default: "" },
  itemLot: { type: String, default: "" },
  unitCost: { type: Number, default: 0 },
  dateCreated: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("ItemDynamic", ItemDynamicSchema);