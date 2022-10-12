const User = require("../models/User")
const ValidationToken = require("../models/ValidationToken")
const { sendEmail } = require("../utils/sendEmail")
const bcrypt = require("bcrypt")

module.exports = {
  getAccount: (req, res) => {

  },
  getValidateEmail: async (req, res) => {
    try {
      console.log(req.params)
      const token = await ValidationToken.findOne({ userId: req.params.userId })
      if (!token) throw new Error("Email validation token does not exist")
      const user = await User.findById({ _id: req.params.userId })
      if (!user) throw new Error("User does not exist")
      const isValidToken = await bcrypt.compare(req.params.token, token.token)
      if (!isValidToken) throw new Error("Invalid validation token")
      await user.updateOne({ emailValidated: true })
      sendEmail(user.email, "Email Validated Successfully", {name: user.name } , "validEmail.ejs")
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