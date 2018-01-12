var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// setting directory for front
app.use(express.static(__dirname + '/client'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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
const StoreController = require('./modules/controllers/storeController');

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
    StoreController.getStores(req, res);
});


// here we use functions with cache
// get store by its id
app.get('/api/store/:_id', function (req, res) {
    StoreController.getStoreById(req, res);
});

// updating store
app.put('/api/store/:_id', function(req, res) {
    StoreController.updateStore(req, res);
});

// creating store
app.post('/api/store', function (req, res) {
    StoreController.addStore(req, res);
});


// Delete store
app.delete('/api/store/:_id', function(req, res) {
    StoreController.removeStore(req, res);
});


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
    ProductController.updateProduct(req, res);
});


// client
// add client
app.post('/api/client', function (req, res) {
    ClientController.addClient(req, res);
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