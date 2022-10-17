const express = require('express')
const router = express.Router()
const itemLocationsController = require('../controllers/itemLocations')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

//Main Routes - simplified for now
router.get('/', ensureAuth, itemLocationsController.getItemLocation)
router.get('/addItemLocation', ensureAuth, itemLocationsController.getAddItemLocation)
router.post('/addItemLocation', ensureAuth, itemLocationsController.postAddItemLocation)

module.exports = router