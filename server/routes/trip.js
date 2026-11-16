const express = require("express");
const {getTrip, getTrips, startTrip, endTrip} = require('../controllers/trip');
const router = express.Router();


router.get('/all', getTrips);
router.get('/:id', getTrip);
router.post('/start', startTrip);
router.post('/end/:id', endTrip);

module.exports = router;