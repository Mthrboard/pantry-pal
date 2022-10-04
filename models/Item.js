const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  itemName: { type: String, unique: true, required: true},
  description: { type: String },
  barcode: { type: String },
  dateType: { type: String },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Item", default: null },
  unitOfMeasure: { type: mongoose.Schema.Types.ObjectId, ref: "Measurement" },
  unitMeasurement: { type: Number },
  storageTemp: { type: String, enum: Array.from(process.env.MONGOOSE_STORAGE_TEMP_ENUM) },
  storageLight: { type: String, enum: Array.from(process.env.MONGOOSE_STORAGE_LIGHT_ENUM) },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  image: { type: String },
  cloudinaryId: { type: String },
  dateCreated: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("Item", ItemSchema);