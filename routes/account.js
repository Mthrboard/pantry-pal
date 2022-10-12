const express = require('express')
const router = express.Router()
const accountController = require('../controllers/account')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

//Main Routes - simplified for now
router.get('/', ensureAuth, accountController.getAccount)
router.get('/validateEmail/:userId/:token', accountController.getValidateEmail)
router.get('/settings', ensureAuth, accountController.getSettings)

module.exports = router