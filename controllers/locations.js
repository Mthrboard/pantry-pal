const Location = require("../models/Location")

module.exports = {
  getAddLocation: async (req, res) => {
    try {
      const locations = await Location.find({ userId: req.user.id })
      res.render("addLocation.ejs", { locations: locations, user: req.user, storageEnums: { light: Array.from(process.env.MONGOOSE_STORAGE_LIGHT_ENUM), temp: Array.from(process.env.MONGOOSE_STORAGE_TEMP_ENUM)} })
    } catch (err) {
      console.error(err)
      res.redirect("/")
    }
  },
  postAddLocation: async (req, res) => {
    try {
      await Location.create({
        locationName: req.body.locationName,
        description: req.body.description,
        userId: req.user.id,
        storageTemp: req.body.storageTemp,
        storageLight: req.body.storageLight,
      })
      const locations = await Location.find({ userId: req.user.id })
      res.redirect("/locations", { locations: locations, user: req.user})
    } catch (err) {
      console.error(err)
      res.redirect("/")
    }
  },
  getRemoveLocation: async (req, res) => {
    try {
      const locations = await Location.find({ userId: req.user.id })
      res.render("deleteLocation.ejs", { locations: locations, user: req.user })
    } catch (err) {
      console.error(err)
      res.redirect("/")
    }
  },
  postRemoveLocation: async (req, res) => {
    try {
      await Location.deleteOne({ _id: req.params.id })
      res.redirect("/locations")
    } catch (err) {
      console.error(err)
      res.redirect("/")
    }
  },
  getLocations: async (req, res) => {
    try {
      const locations = await Location.findById(req.params.id)
      res.render("locations.ejs", { locations: locations, user: req.user })
    } catch (err) {
      console.error(err)
      res.redirect("/")
    }
  },
};