var mongoose = require('mongoose');

// Client schema
var clientSchema = mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'People',
        required: true,
        unique: true
    }
});

var Client = module.exports = mongoose.model('Client', clientSchema, 'client');

module.exports.getClients = function(callback){
    Client.find(callback).limit(limit);
};