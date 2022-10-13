const User = require("../models/User")
const Token = require("../models/Token")
const { sendEmail } = require("../utils/sendEmail")
const bcrypt = require("bcrypt")

module.exports = {
  getAccount: (req, res) => {

  },
  getVerifyEmail: async (req, res) => {
    try {
      console.log(req.params)
      const token = await Token.findOne({ userId: req.params.userId, type: 'emailVerification' })
      if (!token) throw new Error("Email validation token does not exist")
      const user = await User.findById({ _id: req.params.userId })
      if (!user) throw new Error("User does not exist")
      const isValidToken = await bcrypt.compare(req.params.token, token.token)
      if (!isValidToken) throw new Error("Invalid validation token")
      await user.updateOne({ emailVerified: true })
      sendEmail(user.email, "Email Verified Successfully", {name: user.name } , "verifiedEmail.ejs")
      await token.deleteOne()
      res.redirect("/dashboard")
    } catch (err) {
      console.error(err)
      res.redirect("/")
    }
  },
  getSettings: (req, res) => {
    res.render("settings.ejs", {user: req.user})
  },
  postSettings: async (req, res) => {
    try {
      res.render("settings.ejs", {user: req.user})
    } catch (err) {
      console.error(err)
      res.redirect("/")
    }
  }
}