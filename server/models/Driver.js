const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
    name:{type: String},
    mobileNo:{type:String},
    password:{type: String},
    latitude:{type:String},
    longitude:{type:String},
    currentTrip:{type:String},
    role:{type:String, enum:["driver","admin"], default:"driver"},
    isActive:{type:String, default:"active"}
}, {timestamps:true});

module.exports = mongoose.model('driver',driverSchema);