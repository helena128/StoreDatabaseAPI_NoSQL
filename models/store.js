var mongoose = require('mongoose');

// Store schema
var storeSchema = mongoose.Schema({
    store_building: {
        type: String,
        required: [true, 'Store Building value cannot be null'],
        validate: {
            validator: function(v) {
                return /^[0-9]+$/.test(v);
            },
            message: '{VALUE} is not a valid building number!'
        }
    },
    store_street: {
        type: String,
        required: [true, 'Store Street value cannot be null'],
        validate: {
            validator: function(v) {
                return /^[A-Za-z ]+$/.test(v);
            },
            message: '{VALUE} is not a valid street!'
        }
    },
    store_city: {
        type: String,
        required: [true, 'Store City value cannot be null'],
        validate: {
            validator: function(v) {
                return /^[A-Z][A-Za-z ]+$/.test(v);
            },
            message: '{VALUE} is not a valid city!'
        }
    },
    store_zipcode: {
        type: String,
        required: [true, 'Store ZipCode value cannot be null'],
        validate: {
            validator: function(v) {
                return /^[0-9]{6}$/.test(v);
            },
            message: '{VALUE} is not a valid store ZipCode!'
        },
        unique: [true, 'ZipCode must be unique']
    }
},
{versionKey: false});

var Store = module.exports = mongoose.model('Store', storeSchema, 'store');

// get people
module.exports.getStore= function(callback, limit) {
    Store.find(callback).limit(limit);
};

// read by Id
module.exports.getStoreById = function(id, callback) {
    Store.findById(id, callback);
};

// add store
module.exports.addStore = function(people, callback) {
    Store.create(people, callback);
};

// delete store
module.exports.removeStore = function(id, callback){
    var query = {_id: id};
    Store.remove(query, callback);
};

// update store
module.exports.updateStore = function(id, store, options, callback){
    var query = {_id: id};
    var update = {
        //first_name: options.first_name
        store_street: store.store_street,
        store_building: store.store_building,
        store_city: store.store_city,
        store_zipcode: store.store_zipcode
    };

    Store.findOneAndUpdate(query, update, options, callback);
};