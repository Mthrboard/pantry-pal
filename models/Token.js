const mongoose = require("mongoose");

const ResetTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  type: { type: String, enum: ['passwordReset', 'emailVerification'] },
  expireAt: { type: Date, required: true, default: function() { return new Date(new Date().valueOf() + 60000)} }
});

ResetTokenSchema.index({expireAt: 1}, {expireAfterSeconds: 0})

module.exports = mongoose.model("ResetToken", ResetTokenSchema);