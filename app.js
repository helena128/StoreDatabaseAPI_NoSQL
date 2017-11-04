var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

People = require('./models/people');

// Connect to mongoose
mongoose.connect('mongodb://localhost:27017/storedb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected");
});

app.get('/', function (req, res) {
    res.send('Please use /api/store');
});

app.get('/api/people', function (req, res) {
    console.log(">> Sending people...");
    People.getPeople(function(err, people){
        if (err) {
            console.error(">> Error finding people");
            throw err;
        }
        res.json(people);
    })
});

app.listen(3000);
console.log('Running on port 3000...');