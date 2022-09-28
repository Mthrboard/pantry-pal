const appSettings = (req, res, next) => {
  res.locals.appSettings = {name: process.env.FRIENDLY_APP_NAME}
  next()
}

module.exports = appSettings