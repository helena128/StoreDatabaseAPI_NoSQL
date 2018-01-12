var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// setting up redis
var redis = require('redis');
var client = redis.createClient();

// set cache interval
const CACHE_INTERVAL = 10000;

// setting directory for front
app.use(express.static(__dirname + '/client'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(bodyParser.json({type: 'application/json'}));


// models
Store = require('./models/store');
Client = require('./models/clients');
Product = require('./models/product');
Staff = require('./models/staff');
Purchase = require('./models/purchase');


// routing
const PurchaseController = require('./modules/controllers/purchaseController');
const StaffController = require('./modules/controllers/staffController');
const ClientController = require('./modules/controllers/clientController');
const ProductController = require('./modules/controllers/productController');

// operations
var cacheOp = require('./modules/cacheOperations');

// util
var Util = require('./modules/util');

// Connect to mongoose
mongoose.connect('mongodb://localhost:27017/storedb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected");
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


// here we use functions with cache
// get store by its id
app.get('/api/store/:_id', function (req, res) {
    console.log("> Sending store...");
    var id = req.params._id;

    client.get(id, function(err, result) {
        if (err) console.log('Error searching cache');
        if (!Util.isEmptyObject(result)) { // search in cache
            console.log('>> Found in cache');
            res.json(JSON.parse(result));
        } else { // if not in cache
            console.log('>> Empty in cache. Finding in DB...');
            Store.getStoreById(id, function (err, store) {
                if (err) {
                    console.error(">> Error finding stores");
                    res.status(500).send({error: 'Listing stores failed!'});
                } else { // add to cache
                    console.log('>> Found in DB');
                    //client.setex(id, CACHE_INTERVAL, JSON.stringify(store));
                    if (!Util.isEmptyObject(store)) {
                        cacheOp.setCache(client, store, CACHE_INTERVAL);
                        res.json(store);
                    }
                }
            });
        }
    });
});

// updating store
app.put('/api/store/:_id', function(req, res) {
    var id = req.params._id;
    var store = req.body;
    Store.updateStore(id, store, {}, function(err, store){
        if (err) {
            console.error(">> Error updating people" + err);
            res.status(500).send({ error: 'Updating people failed!' });
        } else {
            console.log(">> Store is updated in cache", store);
            //client.setex(store._id, CACHE_INTERVAL, JSON.stringify(store)); // save the new store to cache
            cacheOp.deleteCache(client, id);
            res.json(store);
        }
    })
});

// creating store
app.post('/api/store', function (req, res) {
    var store1 = req.body;
    console.log('> Creating store');
    Store.addStore(store1, function(err, store1){
        if (err) {
            console.error(">> Error posting stores", err);
            res.status(500).send({ error: 'Posting stores failed!' });
        } else {
            console.log(">> Store is set to cache: ", JSON.parse(store1));
            //client.setex(store1._id, CACHE_INTERVAL, JSON.stringify(store1)); // save the new store to cache
            cacheOp.setCache(client, store1, CACHE_INTERVAL);
            res.json(store1);
        }
    });
});


// Delete store
app.delete('/api/store/:_id', function(req, res) {
    var id = req.params._id;
    console.log('> Trying to delete store: ', id);
    Store.removeStore(id, function(err, store) {
        if (err) {
            console.error(">> Error deleting store", err);
            res.status(500).send({ error: 'Deleting store failed!' });
        } else {
            // delete cache
            cacheOp.deleteCache(client, id);
            res.json(store);
        }
    })
});

/*
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
*/


// products
// add product
app.post('/api/product', function (req, res) {
    ProductController.addProduct(req, res);
});

// get products
app.get('/api/product', function (req, res) {
    ProductController.getProducts(req, res);
});

app.delete('/api/product/:_id', function(req, res) {
    ProductController.removeProduct(req, res);
});

app.put('/api/product/:_id', function(req, res) {
    //var id = req.param('_id');
    var id = req.params._id;
    var product = req.body;

    //console.log(">> id" + id + " " + store.store_zipcode);

    Product.updateProduct(id, product, {}, function(err, product){
        if (err) {
            console.error(">> Error updating store" + err);
            res.status(500).send({ error: 'Updating store failed!' });
        } else {
            res.json(product);
        }
    })
});



// client
// add client by people's id
app.post('/api/client', function (req, res) {
    console.log(">> Posting client..." + req.body.passport); // debugging
    var client1 = req.body;
    Client.addClient(client1, function(err, client1){
        if (err) {
            console.error(">> Error posting people" + err);
            res.status(500).send({ error: 'Sending people failed!' });
        } else {
            res.json(client1);
        }
    });
});


app.get('/api/client', function (req, res) {
    ClientController.getClients(req, res);
});

// remove clients
app.delete('/api/client/:_id', function(req, res) {
    ClientController.removeClient(req, res);
});

// staff
// add staff
app.post('/api/staff', function(req, res) {
    StaffController.addStaff(req, res);
});

// get staff
app.get('/api/staff', function (req, res) {
    StaffController.getStaff(req, res);
});

// delete staff
app.delete('/api/staff/:_id', function(req, res) {
    StaffController.deleteStaff(req, res);
});

// get staff by mail
app.get('/api/staff/mail/:mail', function (req, res) {
    StaffController.getStaffByMail(req, res);
});



// purchase
// add purchase TODO: fix
app.post('/api/purchase', function(req, res) {
    PurchaseController.addPurchase(req, res);
});


// get purchase
app.get('/api/purchase', function (req, res) {
    PurchaseController.getPurchases(req,res);
});


// delete purchase
app.delete('/api/purchase/:_id', function(req, res) {
    PurchaseController.removePurchase(req,res);
});


app.listen(3000);
console.log('Running on port 3000...');

module.exports = app;