const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  locationName: { type: String, unique: true, required: true},
  description: { type: String, required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Location", default: null },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  storageTemp: { type: String, enum: Array.from(process.env.MONGOOSE_STORAGE_TEMP_ENUM) },
  storageLight: { type: String, enum: Array.from(process.env.MONGOOSE_STORAGE_LIGHT_ENUM) },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("Location", LocationSchema);