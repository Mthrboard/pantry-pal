const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profile');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/profile', ensureAuth, profileController.getProfile)
router.get('/settings', ensureAuth, profileController.getSettings)

module.exports = router