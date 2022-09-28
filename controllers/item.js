module.exports = {
  addItem: (req, res) => {
    res.render("index.ejs");
  },
  getItems: (req, res) => {
    res.render("dashboard.ejs")
  },
  findItem: (req, res) => {

  }
};