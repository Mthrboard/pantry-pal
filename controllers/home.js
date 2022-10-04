
module.exports = {
  getHome: (req, res) => {
    res.render("home.ejs")
  },
  getAbout: (req, res) => {
    res.render("about.ejs")
  },
  getOnboarding: (req, res) => {
    res.render("onboarding.ejs", {user: req.user})
  }
}