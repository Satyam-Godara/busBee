const busStop = require("../models/Busstop");

// getAllBusStops GET /api/busstop/all
async function getStops(req,res) {
    try{
        const result = await busStop.find({});

        return res.json({
            stops: result.map(stop => ({
                id: stop?._id,
                stopName : stop.stopName,
                coordinates : stop.coordinates,
                Ammenities : stop.Ammenities
            }))
        })

    } catch(err){
        console.error(err.message);
        return res.status(500).json({message:"Server error - cannot get stops"});
    }
}

// get one busstop GET /api/busstop/:id
async function getStop(req,res) {
    const {id} = req.params;

    try{
        const result = await busStop.findById(id);

        if(!result){
            return res.status(404).json({ message: "BusStop not found" });
        }

        return res.json({
            id: result?._id,
            stopName : result.stopName,
            coordinates : result.coordinates,
            Ammenities : result.Ammenities
        })

    } catch(err){
        console.error(err.message);
        return res.status(500).json({message:"Server error - cannot get busStop"});
    }
}


// add a new BusStop POST /api/busstop/add
async function addStop(req,res) {
    const {stopName, coordinates, Ammenities} = req.body || {};

    if(!stopName || !coordinates || !Ammenities){
        return res.status(400).json({message : "stopName, coordinates, ammenities are required!"});
    }
    const formatStopName = stopName.toUpperCase();

    const existing = await busStop.findOne({stopName : formatStopName});

    if(existing){
        return res.status(409).json({message : "BusStop with this name already exist"});
    }

    try{
        const newStop = await busStop.create({
            stopName: formatStopName,
            coordinates: coordinates,
            Ammenities : Ammenities
        });

        return res.status(201).json({
            id: newStop._id, 
            stopName: newStop.stopName, 
            coordinates:newStop.coordinates,
            Ammenities:newStop.Ammenities
        });

    } catch(err){
        console.error(err.message);
        return res.status(500).json({message:"Server error - cannot create a new busStop"});
    }
}


// delete busstop DELETE /api/busstop/:id
async function delStop(req,res) {
    const {id} = req.params;

    try{
        const result = await busStop.findOneAndDelete({_id:id});
        
        if(!result){
            return res.status(404).json({ message: "BusStop not found" });
        }

        return res.json({
            "message":"BusStop deleted Successfully",
            id: result._id,
            stopName : result.stopName,
            coordinates : result.coordinates,
            Ammenities : result.Ammenities
        })

    } catch(err){
        console.error(err.message);
        return res.status(500).json({message:"Server error - cannot delete busStop"});
    }
}


module.exports = {getStops, addStop, getStop, delStop};