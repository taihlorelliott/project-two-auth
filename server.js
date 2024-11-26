//  require the following packages
const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')

// Set the port from environment variable or default to 3000 similar to if else the port 3000 is not availbale 
const port = process.env.PORT ? process.env.PORT : "3000";



//import the auth.js
const authController = require('./controllers/auth.js')
const router = require('./controllers/auth.js')

//connect to mongoDB
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
    console.log(`connected to mongoDB ${mongoose.connection.name}`)
})

//=============== use ========================
//middleware to use URL incodeed data from forms
app.use(express.urlencoded({extended: false}))
//middleware for using HTTP verbs as put or delete
app.use(methodOverride("_method"))
//morgan for logging HTTP requests 
app.use(morgan('dev'))

//=============== get =========================
app.get("/", async (req, res) => {
    res.render("index.ejs")
})

//this code will have express funnel any requests starting with /auth to the authController
app.use('/auth', authController)




//================ listen =====================
app.listen(port, () => {
    console.log(`listening on that port: ${port}!`);
  });