module.exports = {
  getProfile: (req, res) => {
    res.render("profile.ejs", {user: req.user})
  },
  getSettings: (req, res) => {
    res.render("settings.ejs", {user: req.user})
  }
}