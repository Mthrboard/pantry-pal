const mongoose = require("mongoose");

const GenericSchema = new mongoose.Schema({
  itemName: { type: String, required: true},
  description: { type: String },
  storageTemp: { type: String, enum: Array.from(process.env.MONGOOSE_STORAGE_TEMP_ENUM) },
  storageLight: { type: String, enum: Array.from(process.env.MONGOOSE_STORAGE_LIGHT_ENUM) },
  dateCreated: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("Generic", GenericSchema);