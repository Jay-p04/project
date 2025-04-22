const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocaMongoose = require("passport-local-mongoose");
const userSchema =  new Schema({
    email : {
type: String,
required: true
    },
 });
 userSchema.plugin(passportLocaMongoose);
 module.exports = mongoose.model("User",userSchema);