const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const battleRoute = require('./api/battle');
const userRoute = require('./api/user');
const bodyParser = require("body-parser");
const cors = require('cors');

const config = require("./config");

mongoose.connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(success => {
    console.log("MongoDB connected!!!", config.db);
}).catch(err => {
    console.log("MongoDB connection failed!!!", err)
});

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json({
    limit: "1000kb"
}));

app.use(express.static(path.resolve(__dirname, "./ui/build")));

app.use('/api/battleRoute', battleRoute);
app.use('/api/userRoute', userRoute);

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./ui/build", "index.html"));
});


const port = process.env.PORT || config.port;

app.listen(port, function (err) {
    if (err) {
        console.log("Error in server setup");
    }
    else {
        console.log("Server listening on Port", port);
    }
})