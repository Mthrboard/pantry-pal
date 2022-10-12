const cloudinary = require("../middleware/cloudinary")
const Item = require("../models/Item")
const Location = require("../models/Location")

module.exports = {
  addItem: async (req, res) => {
    try {
      const imageDetails = await cloudinary.uploader.upload(req.file.path, {folder: "pantry-pal"})
      await Item.create({
        itemName: req.body.itemName,
        description: req.body.description,
        barcode: req.body.barcode,
        dateType: req.body.dateType,
        unitOfMeasure: req.body.unitOfMeasure,
        unitMeasurement: req.body.unitMeasurement,
        storageTemp: req.body.storageTemp,
        storageLight: req.body.storageLight,
        userId: req.user.id,
        image: result.secure_url,
        cloudinaryId: result.public_id
      })
      res.redirect("/dashboard", {user: req.user})
    } catch (err) {
      console.error(err)
    }
  },
  getItems: (req, res) => {
    res.render("dashboard.ejs", {user: req.user})
  },
  findItem: (req, res) => {

  }
};