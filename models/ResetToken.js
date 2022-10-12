const mongoose = require("mongoose");

const ResetTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  expireAt: { type: Date, expires: 3600 }
});

module.exports = mongoose.model("ResetToken", ResetTokenSchema);