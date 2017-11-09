var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// setting directory for front
app.use(express.static(__dirname + '/client'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(bodyParser.json({type: 'application/json'}));

People = require('./models/people');
Store = require('./models/store');

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

// People operations
// Read all people
app.get('/api/people', function (req, res) {
    console.log(">> Sending people...");
    People.getPeople(function(err, people){
        if (err) {
            console.error(">> Error finding people");
            res.status(500).send({ error: 'Listing people failed!' });
        }
        res.json(people);
    })
});

// Read people by Id
app.get('/api/people/:_pid', function (req, res) {
    // complaining to be deprecated, but works fine
    console.log(">> Sending people..." + req.param('_pid'));
    People.getPeopleById(req.param('_pid'), function(err, people){
        if (err) {
            console.error(">> Error finding people");
            //throw err;
            res.status(500).send({ error: 'Listing people failed!' });
        }
        res.json(people);
    })
});

// Create people
app.post('/api/people', function (req, res) {
    //console.log(">> Sending people..." + req.body.passport); // debugging
    var people1 = req.body;

    People.addPeople(people1, function(err, people1){
        if (err) {
            console.error(">> Error posting people");
            res.status(500).send({ error: 'Sending people failed!' });
        } else {
            res.json(people1);
        }
    });
});

// Update people
// TODO: make this work
app.put('/api/people/:_id', function(req, res) {
    var id = req.param('_id');
    var people = req.body;
    People.updatePeople(id, people, {}, function(err, people){
        if (err) {
            console.error(">> Error updating people" + err);
            res.status(500).send({ error: 'Updating people failed!' });
        } else {
            res.json(people);
        }
    })
});

// Delete people
app.delete('/api/people/:_id', function(req, res) {
    var id = req.params._id;
    People.removePeople(id, function(err, people) {
        if (err) {
            console.error(">> Error updating people" + err);
            res.status(500).send({ error: 'Updating people failed!' });
        } else {
            res.json(people);
        }
    })
});



// store
// get all stores
app.get('/api/store', function(req, res) {
    console.log(">> Sending stores...");
    Store.getStore(function(err, people){
        if (err) {
            console.error(">> Error finding stores");
            res.status(500).send({ error: 'Listing stores failed!' });
        }
        res.json(people);
    })
});

app.post('/api/store', function (req, res) {
    //console.log(">> Sending people..." + req.body.passport); // debugging
    var store1 = req.body;
    //console.log('>> Store' + store1.store_street +' ' + store1.store_building + ' ' + store1.store_zipcode);
    Store.addStore(store1, function(err, store1){
        if (err) {
            console.error(">> Error posting stores");
            res.status(500).send({ error: 'Posting stores failed!' });
        } else {
            res.json(store1);
        }
    });
});

// Delete store
app.delete('/api/store/:_id', function(req, res) {
    var id = req.params._id;
    // console.log('Trying to delete: ' + id);
    Store.removeStore(id, function(err, store) {
        if (err) {
            console.error(">> Error updating store" + err);
            res.status(500).send({ error: 'Delete store failed!' });
        } else {
            res.json(store);
        }
    })
});


app.put('/api/store/:_id', function(req, res) {
    //var id = req.param('_id');
    var id = req.params._id;
    var store = req.body;

    //console.log(">> id" + id + " " + store.store_zipcode);

    Store.updateStore(id, store, {}, function(err, store){
        if (err) {
            console.error(">> Error updating store" + err);
            res.status(500).send({ error: 'Updating store failed!' });
        } else {
            res.json(store);
        }
    })
});


app.listen(3000);
console.log('Running on port 3000...');

module.exports = app;