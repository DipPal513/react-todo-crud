const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = 3000; // Corrected port value
const todohandler = require("./routeHandler/todoHandler");
const app = express();

// Use cors middleware correctly
app.use(cors());

app.use(express.json());

mongoose.connect("mongodb+srv://pretompal513:Ozh8bSsaIQWqHCod@cluster0.lejknbn.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true, // Corrected option name
    useUnifiedTopology: true, // Corrected option name
}).then(() => {
    console.log('Connection success');
}).catch((err) => {
    console.error("Error occurred!", err); // Use console.error for errors
});

app.use('/todo', todohandler);

app.listen(3000, () => {
    console.log("app is listening on port 3000");
});
