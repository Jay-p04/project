const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mogo_url="mongodb://127.0.0.1:27017/wanderlust";
 main()
 .then(()=>{
console.log("connected to database");
 })
 .catch((err)=>{
    console.log(err);
 });
 async function main(params) {
    await mongoose.connect(mogo_url);
 }
 const initDB = async ()=>{
    
    await Listing.deleteMany({});
    initData.data =initData.data.map((obj)=>({...obj,owner:"67f114b290c9fd3a5c531555"}))
    await Listing.insertMany(initData.data);

 };
 initDB();