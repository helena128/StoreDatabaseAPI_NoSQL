var mongoose = require('mongoose');

// Client schema
var clientSchema = mongoose.Schema({
    cli_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'People',
        required: true,
        unique: true
    }
});

var Client = module.exports = mongoose.model('Client', clientSchema, 'client');

module.exports.getClients = function(/*callback*/){
    //Client.find(callback).populate('cli_id');
    Client.find({}).populate('cli_id').exec(function(error, posts) {
        console.log(JSON.stringify(posts, null, "\t"))
    })
};