const mongoose = require("mongoose");

const route = require("./Route");
const driver = require("./Driver");

const tripSchema = new mongoose.Schema({
    route:{type: mongoose.Schema.Types.ObjectId, ref:'route', required:true},
    firstLastStops:{type:[String]},
    driver:{type: mongoose.Schema.Types.ObjectId, ref:'driver', required:true},
    startedAt:{type:Date},
    endedAt:{type:Date},
    createdBy:{type:String},
    previousStop:{type:String},
    duration:{type:Date}
}, {timestamps:true});

module.exports = mongoose.model('trip',tripSchema);