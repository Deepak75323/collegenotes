const express = require("express");
const router = express.Router();
const passport = require("passport");

const notescontrollers = require("../controller/resource_controller");


router.post("/create",passport.checkAuthentication,notescontrollers.create);
router.get('/:id',notescontrollers.resources);
router.get('/destroy/:id',passport.checkAuthentication,notescontrollers.destroy);

module.exports = router;

