const express = require("express");
const router = express.Router();
const { validateListing } = require("../middleware.js");
const Listing = require("../models/listing.js");
const wrapAsyn = require("../utils/wrapAsync.js");
const { islogedIn, isowner,map } = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js")
const upload = multer({storage});
router
   .route("/")
   .get(wrapAsyn(listingController.index))
   .post(islogedIn,upload.single("listing[image]"),validateListing,
   wrapAsyn(listingController.newpost));
  

router.get("/new", islogedIn, listingController.newroute);

router
   .route("/:id")
   .get(islogedIn,wrapAsyn(listingController.findOne))
   .put(islogedIn, isowner,upload.single("listing[image]"), validateListing, wrapAsyn(listingController.update))
   .delete(islogedIn, isowner, wrapAsyn(listingController.delete));
router.get("/:id/edit", islogedIn, isowner, wrapAsyn(listingController.edit));

module.exports = router;
