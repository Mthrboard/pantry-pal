const express = require('express')
const router = express.Router()
const locationsController = require('../controllers/locations')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

//Main Routes - simplified for now
router.get('/', ensureAuth, locationsController.getLocations)
router.post('/addLocation', ensureAuth, locationsController.postAddLocation)

module.exports = router