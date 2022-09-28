const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true},
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Location", default: null },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("Location", LocationSchema);