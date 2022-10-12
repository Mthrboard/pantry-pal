const Location = require("../models/Location")

module.exports = {
  addLocation: async (req, res) => {
    try {
      await Location.create({
        locationName: req.body.locationName,
        description: req.body.description,
        userId: req.user.id,
        storageTemp: req.body.storageTemp,
        storageLight: req.body.storageLight,
      })
      res.redirect('/dashboard', {user: req.user})
    } catch (err) {
      console.error(err)
    }
  },
  getLocation: async (req, res) => {
    try {
      const location = await Location.findById(req.params.id)
      res.render("location.ejs", { location: location, user: req.user })
    } catch (err) {
      console.error(err)
    }
  },
};