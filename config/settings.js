const randomFile = require('select-random-file') // Used to pick a random background image from the backgrounds folder
const dir = 'public/images/backgrounds/'

// Middleware to add local variables that can be used in all views
const appSettings = (req, res, next) => {
  randomFile(dir, (err, file) => {
    res.locals.appSettings = { name: process.env.FRIENDLY_APP_NAME,
                               background: file }
    next()
  })
}

module.exports = appSettings