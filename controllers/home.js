
module.exports = {
  getHome: (req, res) => {
    res.render("home.ejs", {user: req.user})
  },
  getAbout: (req, res) => {
    res.render("about.ejs", {user: req.user})
  },
  getOnboarding: (req, res) => {
    res.render("onboarding.ejs", {user: req.user})
  }
}