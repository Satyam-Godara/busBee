const express = require("express");
const router = express.Router();

const {getStops, getStop, addStop, delStop} = require("../controllers/busstop");

router.get('/all', getStops);
router.get('/:id', getStop);
router.post('/add', addStop);
// router.put('/:id', editStop);
router.delete('/:id', delStop);


module.exports = router;