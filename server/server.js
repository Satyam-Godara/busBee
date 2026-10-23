const express = require("express");
const app = express();


const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({status: "ok", timestamp: new Date().toLocaleString()});
});


app.listen(PORT, () => {
    console.log("Server Running at http://localhost:3000");
});