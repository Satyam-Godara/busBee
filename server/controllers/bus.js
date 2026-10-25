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
    rgnNo = rgnNo.toUpperCase();
    busCode = busCode.toUpperCase();

    const existing = await bus.findOne({$or :[ {rgnNo : rgnNo}, {busCode : busCode}] });

    if(existing){
        return res.status(409).json({message : "Bus already exist"});
    }

    try{
        const bus = await bus.create({
            rgnNo: rgnNo,
            modelName: modelName,
            busCode : busCode
        });

        return res.status(201).json({id: bus._id, rgnNo: bus.rgnNo, busCode:bus.busCode, modelName:bus.modelName});

    } catch(err){
        console.error(err.message);
        return res.status(500).json({message:"Server error - cannot create a new bus"});
    }
}


module.exports = {getAllBus, addBus};