const Listing = require("./models/listing");
const review = require("./models/review.js");
const { listingSchema ,reviewSchema}= require("./schema.js");
const expressError = require("./utils/expressError.js");


module.exports.islogedIn = (req,res,next)=>{
   if(!req.isAuthenticated()){
       req.session.urlRedirect  = req.originalUrl;
       
       req.flash("error","You must be logged in to create listing.");
      return  res.redirect("/login");
         }
         next();
       };
       
       module.exports.saveRedirectUrl = (req,res,next)=>{
           if (req.session.urlRedirect) {
               res.locals.redirectUrl = req.session.urlRedirect;
           }
           next();
       };

        module.exports.isowner = async(req,res,next)=>{
           let { id } = req.params;
           let listing = await Listing.findById(id);
           if(!listing.owner._id.equals(res.locals.currUser._id)){
              req.flash("error","you don't have permission to edit");
             return res.redirect(`/listings/${id}`);
           }
           next();
        };
        module.exports.validateListing = (req,res,next)=>{
           let {error} =  listingSchema.validate(req.body);
           if(error){ 
           let errormsg = error.details.map((el)=>el.message).join(",");
              throw new expressError(400,errormsg);
           }
           else{
              next();
           }
           };
           module.exports.validateReview = (req,res,next)=>{
              let {error} =  reviewSchema.validate(req.body);
              if(error){
              let errormsg = error.details.map((el)=>el.message).join(",");
                 throw new expressError(400,errormsg);
              }
              else{
                 next();
              }
              };
              module.exports.isReviewAuthor  = async(req,res,next)=>{
               let { id,reviewId } = req.params;
               let Review = await review.findById(reviewId);
               if(!Review.author.equals(res.locals.currUser._id)){
                  req.flash("error","you don't have permission to edit");
                 return res.redirect(`/listings/${id}`);
               }
               next();
            };
         
              

         