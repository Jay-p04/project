const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;
 const listingSchema = new Schema({
    title: {
        type :String,
        require :true,
    },
    description: String,
    image:{
      filename:{
         type:String,
         require:true
      },
      url:{
         type:String,
      }
    },
//         default:"https://pixabay.com/photos/dragonfly-insect-wings-nature-9326948/",
// set : (v)=>{v===""?"https://pixabay.com/photos/dragonfly-insect-wings-nature-9326948/":v;}
    price:Number,
    location:String,
    country:String,
 reviews:[{
    type: Schema.Types.ObjectId,
    ref:"review"
 }],
 owner:{
    type :Schema.Types.ObjectId,
    ref:"User",
 }
 });
 listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
await review.deleteMany({_id : {$in:listing.reviews}});
    }
 });
 const Listing = mongoose.model("Listing",listingSchema);
 module.exports =Listing;