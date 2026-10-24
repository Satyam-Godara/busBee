require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const busRoute = require("./routes/bus");
const busstopRoute = require("./routes/busstop");
const routeRoute = require("./routes/route");
const tripRoute = require("./routes/trip");
const userRoute = require("./routes/user");


const app = express();

// middlewares
app.use(express.json());


// api routes.
app.use('/api/bus',     busRoute);
app.use('/api/busstop', busstopRoute);
app.use('/api/route',   routeRoute);
app.use('/api/trip',    tripRoute);
app.use('/api/user',    userRoute);

// healthcheck
app.get('/api/health', (req, res) => {
    res.status(200).json({status: "ok", timestamp: new Date().toLocaleString()});
});



const PORT = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server Running at http://localhost:3000");
        })
    });