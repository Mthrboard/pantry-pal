const ItemLocation = require("../models/ItemLocation")

module.exports = {
  addItemLocation: async (req, res) => {
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
      res.redirect('/dashboard', {user: req.user})
    } catch (err) {
      console.error(err)
    }
  },
  getItemLocation: async (req, res) => {
    try {
      const ItemLocation = await ItemLocation.findById(req.params.id)
      res.render("ItemLocation.ejs", { ItemLocation: ItemLocation, user: req.user })
    } catch (err) {
      console.error(err)
    }
  },
};