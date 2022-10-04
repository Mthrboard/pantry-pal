const randomFile = require('select-random-file')
const dir = 'public/images/backgrounds/'

const appSettings = (req, res, next) => {
  randomFile(dir, (err, file) => {
    console.log(err, file)
    res.locals.appSettings = { name: process.env.FRIENDLY_APP_NAME,
                               background: file }
    next()
  })
}

module.exports = appSettings