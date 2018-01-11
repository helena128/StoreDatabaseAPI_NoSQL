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
const PurchaseController = require('./modules/purchaseController');

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
    console.log(">> Posting product..." + req.body.product_name); // debugging
    var product1 = req.body;
    console.log('>> Product' + product1.product_name +' ' + product1.product_price + ' ' + product1.product_price);
    Product.addProduct(product1, function(err, product1){
        if (err) {
            console.error(">> Error posting products");
            res.status(500).send({ error: 'Posting products failed!' });
        } else {
            res.json(product1);
        }
    });
});

// get products
app.get('/api/product', function (req, res) {
    console.log(">> Sending products...");
    Product.getProducts(function(err, product){
        if (err) {
            console.error(">> Error finding products");
            res.status(500).send({ error: 'Listing products failed!' });
        } else {
            //console.log(product.product_name + " " + product.product_price);
            res.json(product);
        }
    })
});

app.delete('/api/product/:_id', function(req, res) {
    var id = req.params._id;
    // console.log('Trying to delete: ' + id);
    Product.removeProduct(id, function(err, product) {
        if (err) {
            console.error(">> Error updating store" + err);
            res.status(500).send({ error: 'Delete store failed!' });
        } else {
            res.json(product);
        }
    })
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
    console.log(">> Sending products...");
    Client.getClients(function(err, client){
        if (err) {
            console.error(">> Error finding products");
            res.status(500).send({ error: 'Listing products failed!' });
        } else {
            //console.log(product.product_name + " " + product.product_price);
            res.json(client);
        }
    })
});

// getting all clients
// complains about deprecated mpromise library
/*
app.get('/api/client', function (req, res) {
    Client.getClients(function(err, client) {
        if (err) {
            console.error(">> Error getting clients " + err);
            res.status(500).send({ error: 'Getting clients failed!' });
        } else {
            res.json(client);
        }
    })
});
*/

app.delete('/api/client/:_id', function(req, res) {
    var id = req.params._id;
    Client.removeClient(id, function(err, client) {
        if (err) {
            console.error(">> Error deleting client" + err);
            res.status(500).send({ error: 'Deleting client failed!' });
        } else {
            res.json(client);
        }
    })
});

// add client by id in PARAMS
/*
app.post('/api/client/:_id', function(req, res) {
    var client = new Client({ cli_id : req.params._id});
    Client.addClient(client, function (err, client) {
        if (err) {
            console.error(">> Error creating client by Id" + err);
            res.status(500).send({ error: 'Creating client by id failed!' });
        } else {
            res.json(client);
        }
    });
});
*/


// staff
// add staff
app.post('/api/staff', function(req, res) {
    var staff = req.body;
    Staff.addStaff(staff, function(err, staff) {
        if (err) {
            console.error(">> Error creating staff" + err);
            res.status(500).send({ error: 'Creating staff failed!' });
        } else {
            res.json(staff);
        }
    })
});

// get staff
app.get('/api/staff', function (req, res) {
    Staff.getStaff(function(err, staff) {
        if (err) {
            console.error(">> Error getting clients " + err);
            res.status(500).send({ error: 'Getting clients failed!' });
        } else {
            res.json(staff);
        }
    })
});

// delete staff
app.delete('/api/staff/:_id', function(req, res) {
    var id = req.params._id;
    Staff.removeStaff(id, function(err, staff) {
        if (err) {
            console.error(">> Error deleting staff" + err);
            res.status(500).send({ error: 'Deleting staff failed!' });
        } else {
            res.json(staff);
        }
    })
});

app.get('/api/staff/mail/:mail', function (req, res) {
    var mail = req.params.mail;
    Staff.getStaffByMail(mail, function(err, people){
        if (err) {
            console.error(">> Error finding people");
            res.status(500).send({ error: 'Listing people failed!' });
        } else {
            res.json(people);
        }
    })
});



// purchase
// add purchase
// TODO: check not only staff's email BUT name + client name and email + product
app.post('/api/purchase', function(req, res) {
    var purchase = req.body;

    // check that the staff exists by their email
    Staff.getStaffByMail(purchase.staff_email, function (err, staff) {
        if (err) {
            console.error(">> Error finding staff");
            res.status(500).send({ error: ' failed!' });
        } else {
            //res.json(staff);
            console.log(">> Staff found");

            // check that we found our staff member
            if (!Util.isEmptyObject(staff)){

                Purchase.addPurchase(purchase, function (err, purchase) {
                    if (err) {
                        console.error(">> Error creating purchase" + err);
                        res.status(500).send({error: 'Creating purchase failed!'});
                    } else {
                        res.json(purchase);
                    }
                });
            }
        }
    });
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