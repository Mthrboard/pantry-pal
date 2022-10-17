const ItemLocation = require("../models/ItemLocation")

module.exports = {
  getAddItemLocation: async (req, res) => {
    try {
      const itemLocations = await ItemLocation.find({ userId: req.user.id })
      res.render("addItemLocation.ejs", { itemLocations: itemLocations, user: req.user })
    } catch (err) {
      console.error(err)
      res.redirect("/")
    }
  },
  postAddItemLocation: async (req, res) => {
    try {
      await ItemLocation.create({
        itemId: req.body.itemId,
        locationId: req.body.locationId,
        userId: req.user.id,
        quantity: req.body.qty,
        itemDate: req.body.itemDate,
        itemLot: req.body.itemLot,
        unitCost: req.body.unitCost,
      })
      const itemLocations = await ItemLocation.find({ userId: req.user.id })
      res.redirect("/itemLocations", { itemLocations: itemLocations, user: req.user })
    } catch (err) {
      console.error(err)
      res.redirect("/")
    }
  },
  getItemLocation: async (req, res) => {
    try {
      const itemLocation = await ItemLocation.findById(req.params.id)
      res.render("itemLocations.ejs", { itemLocation: itemLocation, user: req.user })
    } catch (err) {
      console.error(err)
      res.redirect("/")
    }
  },
};