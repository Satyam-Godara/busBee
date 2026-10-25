const bus = require("../models/Bus");

async function getAllBus(req,res) {
    try{
        const buses = await bus.find({});

        return res.json({
            buses: buses.map(bus => ({
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

async function addBus(req,res) {
    const {rgnNo, modelName, busCode} = req.body || "";

    if(!rgnNo || !busCode || !modelName){
        return res.status(400).json({message : "rgnNo, buscode and modelName are required!"});
    }
    const formatRgnNo = rgnNo.toUpperCase();
    const formatBusCode = busCode.toUpperCase();

    const existing = await bus.findOne({$or :[ {rgnNo : formatRgnNo}, {busCode : formatBusCode}] });

    if(existing){
        return res.status(409).json({message : "Bus already exist"});
    }

    try{
        const bus = await bus.create({
            rgnNo: formatRgnNo,
            modelName: modelName,
            busCode : formatBusCode
        });

        return res.status(201).json({id: bus._id, rgnNo: bus.rgnNo, busCode:bus.busCode, modelName:bus.modelName});

    } catch(err){
        console.error(err.message);
        return res.status(500).json({message:"Server error - cannot create a new bus"});
    }
}


module.exports = {getAllBus, addBus};