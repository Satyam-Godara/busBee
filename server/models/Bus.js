const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
    rgnNo : {type:String, required:true, unique:true, trim:true},
    modelNo : {type:String, trim:true},
    busCode : {type:String, required:true, unique:true, trim:true},
    capacity : {type:String, required:true, trim:true},
    isActive : {type:Boolean, default:true}
},{timestamps:true});

module.exports = mongoose.model('Bus',busSchema);