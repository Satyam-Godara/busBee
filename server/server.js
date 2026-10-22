const express = require("express");

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({status: "ok", timestamp: new Date().toLocaleString()});
});


app.listen(3000, () => {
    console.log("Server Running at http://localhost:3000");
});