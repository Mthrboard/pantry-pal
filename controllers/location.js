module.exports = {
  addLocation: (req, res) => {
    res.render("index.ejs");
  },
  getLocation: (req, res) => {
    res.render("dashboard.ejs")
  },
};