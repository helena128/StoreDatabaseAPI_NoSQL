var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// setting directory for front
app.use(express.static(__dirname + '/client'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(bodyParser.json({type: 'application/json'}));

// models
People = require('./models/people');
Store = require('./models/store');
Client = require('./models/clients');
Product = require('./models/product');
Staff = require('./models/staff');
Purchase = require('./models/purchase');

// Connect to mongoose
mongoose.connect('mongodb://localhost:27017/storedb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected");
});


// People operations
// Read all people
/*
app.get('/api/people', function (req, res) {
    console.log(">> Sending people...");
    People.getPeople(function(err, people){
        if (err) {
            console.error(">> Error finding people");
            res.status(500).send({ error: 'Listing people failed!' });
        } else {
            res.json(people);
        }
    })
});


// get people by email
app.get('/api/peoplemail/:mail', function (req, res) {
    var mail = req.params.mail;
    People.getPeopleByMail(mail, function(err, people){
        if (err) {
            console.error(">> Error finding people");
            res.status(500).send({ error: 'Listing people failed!' });
        } else {
            res.json(people);
        }
    })
});

// Read people by Id
app.get('/api/people/:_id', function (req, res) {
    // complaining to be deprecated, but works fine
    //console.log(">> Sending people..." + req.param('_id'));
    var id = req.params._id;
    People.getPeopleById(id, function(err, people){
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
            console.error(">> Error posting people" + err);
            res.status(500).send({ error: 'Sending people failed!' });
        } else {
            res.json(people1);
        }
    });
});

// Update people
app.put('/api/people/:_id', function(req, res) {
    var id = req.params._id;
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
*/


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
            if (!isEmptyObject(staff)){

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
    Purchase.getPurchase(function(err, purchase) {
        if (err) {
            console.error(">> Error getting purchase " + err);
            res.status(500).send({ error: 'Getting purchase failed!' });
        } else {
            res.json(purchase);
        }
    })
});

// delete purchase
app.delete('/api/purchase/:_id', function(req, res) {
    var id = req.params._id;
    Purchase.removePurchase(id, function(err, purchase) {
        if (err) {
            console.error(">> Error deleting purchase" + err);
            res.status(500).send({ error: 'Deleting purchase failed!' });
        } else {
            res.json(purchase);
        }
    })
});


// detect if our json value is null
function isEmptyObject(obj) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}

app.listen(3000);
console.log('Running on port 3000...');

module.exports = app;