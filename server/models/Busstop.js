const mongoose = require("mongoose");

const busStopSchema = new mongoose.Schema({
    stopName : {type:String, required:true, trim:true},
    coordinates : {type:[String], default:[], validate:{validator: function(val){return val.length === 2;}, message: '{PATH} must contain exaclty 2 string elements'} },
    Ammenities : {type:[String], default:[],}

}, {timestamps:true});


module.exports = mongoose.model('busStop',busStopSchema);
