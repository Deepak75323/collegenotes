const express = require("express");
const router = express.Router();
const passport = require("passport");
const homecontrollers = require("../controller/home_controller");


router.get("/",homecontrollers.home);
router.get("/subject/:subname", homecontrollers.subject);
router.use("/resources", require("./resources.js"));
router.use("/notes", require("./notes.js"));
router.get('/users/auth/google',passport.authenticate('google',{scope:['profile','email']}));


router.get('/users/auth/google/callback',passport.authenticate('google',{failureRedirect:'/signin'}),homecontrollers.createSession);
router.get("/signin",homecontrollers.signin);
router.get('/signout', homecontrollers.destroySession);

module.exports = router;

