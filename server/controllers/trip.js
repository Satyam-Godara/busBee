const tripss = require("../models/Trip");
const route = require("../models/Route");
const driver = require("../models/Driver");


// get all buses
async function getTrips(req, res) {
    try{
        const result = await tripss.find({}).populate("route").populate("driver");
        return res.json({
            trips: result.map(trip => ({
                id : trip?._id,
                route : trip.route,
                firstLastStops : trip.firstLastStops,
                driver : trip.driver,
                startedAt : trip.startedAt,
                endedAt : trip.endedAt,
                createdBy : trip.createdBy,
                previousStop : trip.previousStop,
                duration : trip.duration,
                status: trip.status
            }))
        })
    } catch(err){
        console.error(err.message);
        return res.status(500).json({message:"Server error - cannot get trips"});
    }
}


// get trip by id
async function getTrip(req, res) {
    try{
        const id = req.params.id;
        const trip = await tripss.findById(id).populate("route").populate("driver");

        if( !trip ){
            return res.status(404).json({ message: "Trip not found" });
        }
        if(trip.status === "inactive"){
            return res.json({message: "This trip has ended"});
        }
        // console.log(trip.driver.name);
        return res.json({
            id : trip?._id,
            route : trip.route,
            firstLastStops : trip.firstLastStops,
            driver : trip.driver,
            startedAt : trip.startedAt,
            endedAt : trip.endedAt,
            createdBy : trip.createdBy,
            previousStop : trip.previousStop,
            duration : trip.duration,
            status : trip.status
        })

    } catch(err){
        console.error(err.message);
        return res.status(500).json({message:"Server error - cannot get trip by id"});
    }
}


// start a new trip

async function startTrip (req, res){
    const {routeId, driverId } = req.body;
     if(!routeId || !driverId){
        return res.status(400).json({message : "routeId and driverId are required!"});
    }
    try{

        const selectedDriver = await driver.findById(driverId);
        if(!driver){
            return res.status(404).json({message:"driver not found"});
        }

        const newTrip = await tripss.create({
            route : routeId,
            driver : driverId,
            createdBy : selectedDriver.name
        })
        const populatedTrip = await tripss.findById(newTrip._id).populate("route").populate("driver");
        return res.status(201).json({
            id:populatedTrip._id,
            route:populatedTrip.route,
            driver:populatedTrip.driver,
            createdBy:populatedTrip.driver.name
        });
    }catch(err){
        console.log(err.message);
        return res.status(500).json({message : "Error creating an trip"});
    }
}

async function endTrip (req, res){
    const tripId = req.params.id;
     if(!tripId){
        return res.status(400).json({message : "tripId is required!"});
    }
    try{
        const exists = await tripss.findById(tripId);
        if(!exists){
            return res.status(404).json({message:"trip not found"});
        }
        if(exists.status === "inactive"){
            return res.json({
                message: "trip already ended"
            })
        }
        
        await tripss.updateOne({_id:tripId},{$set:{status:"inactive"}});
        const updatedTrip = await tripss.findById(tripId);

        return res.status(200).json({
            message: "Trip ended successfully", 
            id:updatedTrip._id,
            status: updatedTrip.status
        });
    }catch(err){
        console.log(err.message);
        return res.status(500).json({message : "Error ending an trip"});
    }
}


module.exports = {getTrips, getTrip, startTrip, endTrip};