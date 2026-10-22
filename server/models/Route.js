const mongoose = require("mongoose");

const busStop = require("./Busstop");

const routeSchema = new mongoose.Schema({
    routeName:{type:String, required:true, unique:true},
    code:{type:String, required:true, unique:true},
    stopList:{type:[mongoose.Schema.Types.ObjectId], ref:'busStop', default:[]},
    // assignedBus
}, {timestamps:true})

module.exports = mongoose.model('route',routeSchema);