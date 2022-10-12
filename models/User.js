const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  emailValidated: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

// Password hash middleware.

UserSchema.pre("save", async function save(next) {
  const user = this
  if (!user.isModified("password")) return next()
  try {
    const hash = await salt(user.password)
    user.password = hash
    next()
  } catch (err) {
    console.error(err)
    return next(err)
  }
})
UserSchema.pre("updateOne", async function update(next) {
  const password = this.getUpdate().password
  if (!password) return next()
  try {
    const hash = await salt(password)
    this.getUpdate().password = hash
    next()
  } catch (err) {
    console.error(err)
    return next(err)
  }
})

async function salt(password) {
  try {
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT_ROUNDS))
    const hash = await bcrypt.hash(password, salt)
    return hash
  } catch (err) {
    console.error(err)
  }
}

// Helper method for validating user's password.
UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}

module.exports = mongoose.model("User", UserSchema);