module.exports = {
  getSettings: (req, res) => {
    res.render("settings.ejs", {user: req.user})
  },
  postSettings: (req, res) => {
    try {
      res.render("settings.ejs", {user: req.user})
    } catch (err) {
      console.error(err)
      res.redirect("/")
    }
  }
}