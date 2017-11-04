var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(bodyParser.json({type: 'application/json'}));

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


// TODO: debug as it doesn't work
app.get('/api/people/:_id', function (req, res) {
    console.log(">> Sending people...");
    People.getPeopleById(req.param._id, function(err, people){
        if (err) {
            console.error(">> Error finding people");
            throw err;
        }
        res.json(people);
    })
});


app.post('/api/people', function (req, res) {
    var people1 = req.body;
    console.log(">> Posting people " + req.body);
    People.addPeople(people1, function(err, people1){
        if (err) {
            console.error(">> Error posting people");
            res.status(500).send(err);
            //throw err;
        }
        res.json(people1);
    })
});


app.listen(3000);
console.log('Running on port 3000...');