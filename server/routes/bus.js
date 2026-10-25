const express = require("express");
const {getBus, getAllBus, addBus, delBus} = require("../controllers/bus");
const router = express.Router();

router.get('/all', getAllBus);
router.get('/:id', getBus);
router.post('/', addBus); //admin middle ware
// router.patch('/:id', )
router.delete('/:id', delBus); //admin mddleware
module.exports = router;