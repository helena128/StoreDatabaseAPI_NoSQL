var mongoose = require('mongoose');

// Product
var productSchema = mongoose.Schema({
        product_name: {
            type: String,
            required: [true, 'Product name cannot be null'],
            unique: [true, 'There cannot be 2 products with the same name'],
            validate: {
                validator: function (v) {
                    return /^[A-Za-z0-9\- ]+$/.test(v);
                },
                message: '{VALUE} is not a valid product name!'
            }
        },
        product_price: {
            type: String,
            required: [true, 'Product price cannot be null'],
            validate: {
                validator: function (v) {
                    return /^[0-9]+$/.test(v);
                },
                message: '{VALUE} is not a valid product price!'
            }
        },
        product_pic: {
            type: String,
            required:   [true, 'Product pic cannot be null'],
            unique: [true, 'This image is already used']
        }

    },
    {versionKey: false});

var Product = module.exports = mongoose.model('Product', productSchema, 'product');

// get all products
module.exports.getProducts = function(callback, limit) {
    Product.find(callback).limit(limit);
};

// add product
module.exports.addProduct = function(product, callback) {
    Product.create(product, callback);
};

// delete product
module.exports.removeProduct = function(id, callback){
    var query = {_id: id};
    Product.remove(query, callback);
};

// update product
module.exports.updateProduct = function(id, product, options, callback){
    var query = {_id: id};
    var update = {
        //first_name: options.first_name
        product_name: product.product_name,
        product_price: product.product_price,
        product_pic: product.product_pic
    };
    /*console.log(update.store_zipcode + " >" + update.store_city + "< >" + update.store_building + "<  >" +
        update.store_street); */
    Product.findOneAndUpdate(query, update, options, callback);
};