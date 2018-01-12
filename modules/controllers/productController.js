var Product = require('../../models/product');

exports.getProducts = function (req, res) {
    Product.getProducts(function(err, product){
        if (err) {
            res.status(500).send({ error: 'Listing products failed!' });
        } else {
            res.json(product);
        }
    })
};

exports.addProduct = function (req, res) {
    var product1 = req.body;
    Product.addProduct(product1, function(err, product1){
        if (err) {
            res.status(500).send({ error: 'Posting product failed!' });
        } else {
            res.json(product1);
        }
    });
};

exports.removeProduct = function (req, res) {
    var id = req.params._id;
    Product.removeProduct(id, function(err, product) {
        if (err) {
            res.status(500).send({ error: 'Delete store failed!' });
        } else {
            res.json(product);
        }
    })
};

exports.updateProduct = function (req, res) {
    var id = req.params._id;
    var product = req.body;

    Product.updateProduct(id, product, {}, function(err, product){
        if (err) {
            res.status(500).send({ error: 'Updating store failed!' });
        } else {
            res.json(product);
        }
    })
};