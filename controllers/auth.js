const passport = require("passport")
const validator = require("validator")
const User = require("../models/User")
const ResetToken = require("../models/ResetToken")
const ValidationToken = require("../models/ValidationToken")
const { sendEmail } = require("../utils/sendEmail")
const bcrypt = require("bcrypt")
const crypto = require("node:crypto")

module.exports = {
  getLogin: (req, res) => {
    if (req.user) {
      return res.redirect("/dashboard")
    }
    res.render("login")
  },
  postLogin: (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email))
      validationErrors.push({ msg: "Please enter a valid email address." })
    if (validator.isEmpty(req.body.password))
      validationErrors.push({ msg: "Password cannot be blank." })
    if (validationErrors.length) {
      req.flash("errors", validationErrors)
      return res.redirect("/login")
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
    })
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        req.flash("errors", info)
        return res.redirect("/login")
      }
      req.login(user, (err) => {
        if (err) {
          return next(err)
        }
        req.flash("success", { msg: "Success! You are logged in." })
        res.redirect(req.session.returnTo || "/dashboard")
      })
    })(req, res, next)
  },
  logout: (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err)
          console.error("Error : Failed to destroy the session during logout.", err)
      })
      req.logout(() => {
        req.user = null
        res.redirect("/")
      })
    } catch (err) {
      console.error(err)
      res.redirect("/")
    }
  },
  getSignup: (req, res) => {
    if (req.user) {
      return res.redirect("/dashboard")
    }
    res.render("signup")
  },
  postSignup: async (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email))
      validationErrors.push({ msg: "Please enter a valid email address." })
    if (!validator.isLength(req.body.password, { min: 8 }))
      validationErrors.push({
        msg: "Password must be at least 8 characters long",
      })
    if (req.body.password !== req.body.confirmPassword)
      validationErrors.push({ msg: "Passwords do not match" })
    if (validationErrors.length) {
      req.flash("errors", validationErrors)
      return res.redirect("/signup")
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
    })
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    User.findOne(
      { email: req.body.email },
      (err, existingUser) => {
        if (err) {
          return next(err)
        }
        if (existingUser) {
          req.flash("errors", {
            msg: "Account with that email address already exists.",
          })
          return res.redirect("/signup")
        }
        user.save((err) => {
          if (err) {
            return next(err)
          }
          req.logIn(user, async (err) => {
            if (err) {
              return next(err)
            }
            let validationToken = crypto.randomBytes(32).toString("hex")
            const hash = await bcrypt.hash(validationToken, Number(process.env.BCRYPT_SALT_ROUNDS))
            await new ValidationToken({
              userId: user._id,
              token: hash,
              expireAt: Date.now(),
            }).save()
            const validationUrl = `${process.env.CLIENT_URL}:${process.env.PORT}/account/validateEmail/${user._id}/${validationToken}`
            if (process.env.NODE_ENV === 'development') console.log(`Validation URL: ${validationUrl}`)
            sendEmail(user.email, `Welcome to ${process.env.FRIENDLY_APP_NAME}`, {user: user, validationUrl: validationUrl }, "welcome.ejs")
            res.redirect("/onboarding")
          })
        })
      }
    )
  },
  getForgotPassword: (req, res) => {
    res.render('forgotpassword')
  },
  postForgotPassword: async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email })

      if (!user) throw new Error("User does not exist")
      let token = await ResetToken.findOne({ userId: user._id })
      if (token) await token.deleteOne()
      let resetToken = crypto.randomBytes(32).toString("hex")
      const hash = await bcrypt.hash(resetToken, Number(process.env.BCRYPT_SALT_ROUNDS))

      await new ResetToken({
        userId: user._id,
        token: hash,
        expireAt: Date.now(),
      }).save()

      const resetUrl = `${process.env.CLIENT_URL}:${process.env.PORT}/resetpassword/${user._id}/${resetToken}`
      if (process.env.NODE_ENV === 'development') console.log(`Reset URL: ${resetUrl}`)
      sendEmail(user.email, "Password Reset Request", {name: user.name, resetUrl: resetUrl}, "requestResetPassword.ejs")
      res.redirect("/")
    } catch (err) {
      console.error(err)
      res.redirect("/")
    }
  },
  getResetPassword: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.userId })
      if (!user) throw new Error("User does not exist")
      const token = await ResetToken.findOne({ userId: req.params.userId })
      if (!token) throw new Error("Password reset token does not exist")
      const isValidToken = await bcrypt.compare(req.params.token, token.token)
      if (!isValidToken) throw new Error("Invalid reset token")
      res.render('resetpassword', {data: {userId: user._id, token: req.params.token}})
    } catch (err) {
      console.error(err)
      res.redirect("/")
    }
  },
  postResetPassword: async (req, res) => {
    try {
      const token = await ResetToken.findOne({ userId: req.body.userId })
      if (!token) throw new Error("Password reset token does not exist")
      const isValidToken = await bcrypt.compare(req.body.token, token.token)
      if (!isValidToken) throw new Error("Invalid reset token")
      const user = await User.findById({ _id: req.body.userId })
      await user.updateOne({ password: req.body.password })
      sendEmail(user.email, "Password Reset Successfully", {name: user.name } , "resetPassword.ejs")
      await token.deleteOne()
      res.redirect("/")
    } catch (err) {
      console.error(err)
      res.redirect("/")
    }
  }
}