const bus = require("../models/Bus");

// getAllBuses GET /api/bus/all
async function getAllBus(req,res) {
    try{
        const buses = await bus.find({});

        return res.json({
            buses: buses.map(bus => ({
                id: bus?._id,
                rgnNo : bus.rgnNo,
                modelName : bus.modelName,
                busCode : bus.busCode,
                capacity : bus.capacity
            }))
        })

    } catch(err){
        console.error(err.message);
        return res.status(500).json({message:"Server error - cannot get buses"});
    }
}

// get one bus GET /api/bus/:id
async function getBus(req,res) {
    const {id} = req.params;

    try{
        const BUS = await bus.findById(id);

        if(!BUS){
            return res.status(404).json({ message: "Bus not found" });
        }

        return res.json({
            id: BUS._id,
            rgnNo : BUS.rgnNo,
            modelName : BUS.modelName,
            busCode : BUS.busCode,
            capacity : BUS.capacity
        })

    } catch(err){
        console.error(err.message);
        return res.status(500).json({message:"Server error - cannot get bus"});
    }
}


// add a new Bus POST /api/bus
async function addBus(req,res) {
    const {rgnNo, modelName, busCode, capacity} = req.body || {};

    if(!rgnNo || !busCode || !modelName || !capacity){
        return res.status(400).json({message : "rgnNo, buscode ,capacity and modelName are required!"});
    }
    const formatRgnNo = rgnNo.toUpperCase();
    const formatBusCode = busCode.toUpperCase();

    const existing = await bus.findOne({$or :[ {rgnNo : formatRgnNo}, {busCode : formatBusCode}] });

    if(existing){
        return res.status(409).json({message : "Bus already exist"});
    }

    try{
        const newBus = await bus.create({
            rgnNo: formatRgnNo,
            modelName: modelName,
            busCode : formatBusCode,
            capacity: capacity
        });

        return res.status(201).json({
            id: newBus._id, 
            rgnNo: newBus.rgnNo, 
            busCode:newBus.busCode, 
            modelName:newBus.modelName, 
            capacity:newBus.capacity
        });

    } catch(err){
        console.error(err.message);
        return res.status(500).json({message:"Server error - cannot create a new bus"});
    }
}


// delete bus DELETE /api/bus/:id
async function delBus(req,res) {
    const {id} = req.params;

    try{
        const BUS = await bus.findOneAndDelete({_id:id});
        
        if(!BUS){
            return res.status(404).json({ message: "Bus not found" });
        }

        return res.json({
            "message":"Bus deleted Successfully",
            id: BUS._id,
            rgnNo : BUS.rgnNo,
            modelName : BUS.modelName,
            busCode : BUS.busCode,
            capacity : BUS.capacity
        })

    } catch(err){
        console.error(err.message);
        return res.status(500).json({message:"Server error - cannot delete bus"});
    }
}


module.exports = {getAllBus, addBus, getBus, delBus};