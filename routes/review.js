const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsyn = require("../utils/wrapAsync.js");
const {validateReview, islogedIn, isReviewAuthor} = require("../middleware.js");
const reviewController= require("../controller/reviews.js");
// reviews
router.post("/",islogedIn,validateReview, wrapAsyn(reviewController.postReview)
 ) ;
 router.delete("/:reviewId",
   islogedIn,
   isReviewAuthor,
 wrapAsyn(reviewController.destroyReview)
 );
 module.exports = router;
 
 