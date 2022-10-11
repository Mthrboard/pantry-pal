// Import node modules
require("express-async-errors")
const express = require("express")
const passport = require("passport")
const cors = require("cors")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const methodOverride = require("method-override")
const flash = require("express-flash")
const logger = require("morgan")
const path = require("path")
const app = express()

const connectDB = require("./config/database")
const appSettings = require("./config/settings")
const homeRoutes = require("./routes/home")
const profileRoutes = require("./routes/profile")
const dashboardRoutes = require("./routes/dashboard")

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" })

// Passport config
require("./config/passport")(passport)

//Connect To Database
const clientPromise = connectDB()

//Using EJS for views
app.set("view engine", "ejs")

//Static Folder
app.use(express.static("public"))

// CORS Handling
app.use(cors())

//Body Parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Logging
app.use(logger("dev"))

//Use forms for put / delete
app.use(methodOverride("_method"))

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ clientPromise: clientPromise}),
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(appSettings)

//Use flash messages for errors, info, ect...
app.use(flash())

//Node Modules for Import
app.use("/scripts", express.static(path.join(__dirname, "/node_modules/flowbite/dist")))

//Setup Routes For Which The Server Is Listening
app.use("/", homeRoutes)
app.use("/profile", profileRoutes)
app.use("/dashboard", dashboardRoutes)

//Server Running
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}, you better catch it!`)
})

module.exports = app;