const express = require("express");
const router = express.Router();
const passport = require("passport");

const subjectcontrollers = require("../controller/subject_controller");


router.post("/create",passport.checkAuthentication,subjectcontrollers.create);
router.get('/:id',subjectcontrollers.resources);
router.get('/destroy/:id',passport.checkAuthentication,subjectcontrollers.destroy);

module.exports = router;

