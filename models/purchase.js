var mongoose = require('mongoose');

// Purchase schema
var purchaseSchema = mongoose.Schema({
    staff_first_name: {
        type: String,
        required: [true, 'First name required'],
        validate: {
            validator: function(v) {
                return /^[A-Z][a-z]+$/.test(v);
            },
            message: '{VALUE} is not a valid first name!'
        }
    },
    staff_last_name: {
        type: String,
        required: [true, 'Last name required'],
        validate: {
            validator: function(v) {
                return /^[A-Z][a-z]+$/.test(v);
            },
            message: '{VALUE} is not a valid last name!'
        }
    },
    staff_email: {
        type: String,
        required: [true, 'Email required'],
        unique: [true, 'Email must be unique'],
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9]{1,}@[a-z]{3,}\.[a-z]{3}$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    client_first_name: {
        type: String,
        validate: {
            validator: function(v) {
                return /^[A-Z][a-z]+$/.test(v);
            },
            message: '{VALUE} is not a valid first name!'
        }
    },
    client_last_name: {
        type: String,
        validate: {
            validator: function(v) {
                return /^[A-Z][a-z]+$/.test(v);
            },
            message: '{VALUE} is not a valid last name!'
        }
    },
    client_email: {
        type: String,
        unique: [true, 'Email must be unique'],
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9]{1,}@[a-z]{3,}\.[a-z]{3}$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
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
    date_sold: {
        type: Date,
        default: Date.now()
    },
    amount: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[0-9]+$/.test(v);
            },
            message: '{VALUE} is not a valid product price!'
        },
        default: "1"
    }
});

var Purchase = module.exports = mongoose.model('Purchase', purchaseSchema, 'purchase');

module.exports.addPurchase = function(purchase, callback){
    Purchase.create(purchase, callback)
};

module.exports.getPurchase = function(callback){
    Purchase.find({}).populate('prod_id').populate('staff_id').populate('client_id').exec(callback)
};

module.exports.removePurchase = function(id, callback){
    var query = {_id: id};
    Purchase.remove(query, callback);
};