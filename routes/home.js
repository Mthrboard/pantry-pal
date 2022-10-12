const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const homeController = require('../controllers/home')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

//Main Routes - simplified for now
router.get('/', homeController.getHome)
router.get('/about', homeController.getAbout)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/forgotpassword', authController.getForgotPassword)
router.post('/forgotpassword', authController.postForgotPassword)
router.get('/resetpassword/:userId/:token', authController.getResetPassword)
router.post('/resetpassword', authController.postResetPassword)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)
router.get('/onboarding', ensureAuth, homeController.getOnboarding)

module.exports = router