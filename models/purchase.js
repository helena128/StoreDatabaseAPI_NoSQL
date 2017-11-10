var mongoose = require('mongoose');

// Purchase schema
var purchaseSchema = mongoose.Schema({
    prod_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        unique: true
    },
    staff_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        required: true
    },
    client_id: {
        type: mongoose.Schema.Types.Object,
        ref: 'Client'
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