const mongoose = require("mongoose");

const ValidationTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  expireAt: { type: Date, expires: 604800 }
});

module.exports = mongoose.model("ValidationToken", ValidationTokenSchema);