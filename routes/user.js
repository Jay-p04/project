const express = require("express");
const router = express.Router();
const wrapAsyn = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const usercontroller = require("../controller/user.js")

router.route("/signup")
.get(usercontroller.rendersignform)
.post(wrapAsyn(usercontroller.postSignupform));

router
.route("/login")
.get(usercontroller.login)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true
   }),usercontroller.postlogin);
   
router.get ("/logout",usercontroller.logout);
module.exports = router;