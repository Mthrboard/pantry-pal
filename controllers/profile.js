module.exports = {
  getProfile: (req, res) => {
    res.render("profile.ejs")
  },
  getSettings: (req, res) => {
    res.render("settings.ejs")
  }
}