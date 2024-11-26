//require the following
const User = require('../models/user.js')
const express = require('express')
const router = express.Router()

//require bcrypt for password security
const bcrypt = require("bcrypt");



//export 
module.exports = router

//get 
router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
  });  

//defining the post route only use router not app in this file as we have the router express object
router.post("/sign-up", async (req, res) => {
    // res.send("yay!  you did the damn sign up thing!");
    //this checks if the username has been used before
    const userInDatabase = await User.findOne({ username: req.body.username });
        if (userInDatabase) {
        return res.send("You can't have everything you want, including this username.");
        }
    //this confirms the password and the confirm password match
    if (req.body.password !== req.body.confirmPassword) {
        return res.send("Your socks don't match and neither do your passwords.");
      }
    //use bcrypt to incrypt the password (the 10 means how much hashing of the password
    //the higher the number the harder it is to decrypt)
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;    
    //creat user
    // validation logic
    const user = await User.create(req.body);
    res.send(`Hell yeah, ${user.username}!  We are stoked you signed up!`);
  });

  //desfine the route to the sign in page
  router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs");
  });
  
  

