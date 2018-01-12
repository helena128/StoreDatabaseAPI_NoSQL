var mongoose = require('mongoose');

// Client schema
var clientSchema = mongoose.Schema({
        first_name: {
            type: String,
            required: [true, 'First name required'],
            validate: {
                validator: function(v) {
                    return /^[A-Z][a-z]+$/.test(v);
                },
                message: '{VALUE} is not a valid first name!'
            }
        },
        last_name: {
            type: String,
            required: [true, 'Last name required'],
            validate: {
                validator: function(v) {
                    return /^[A-Z][a-z]+$/.test(v);
                },
                message: '{VALUE} is not a valid last name!'
            }
        },
        phone: {
            type: String,
            required: [true, 'Phone required'],
            unique: [true, 'Phone must be unique'],
            validate: {
                validator: function(v) {
                    return /^8-[0-9]{3}-[0-9]{3}-[0-9]{2}[-]{0,1}[0-9]{2}$/.test(v);
                },
                message: '{VALUE} is not a valid phone number!'
            }
        },
        email: {
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
        passport: {
            type: String,
            required: true,
            unique: [true, 'Passport number must be unique'],
            validate: {
                validator: function(v) {
                    return /^[0-9]{4}-[0-9]{6}$/.test(v);
                },
                message: '{VALUE} is not a valid passport number!'
            }
        },
        sex: {
            type: String,
            enum: ['m', 'f']
        },
        date_of_registration: {
            type: Date,
            default: Date.now()
        },

        date_of_birth: {
            type: Date
        },

        password: {
            type: String,
            minlength: 6,
            required: [true, 'Password required']
        }
    },

    {
        versionKey: false
    });

var Client = module.exports = mongoose.model('Client', clientSchema, 'client');

module.exports.getClients = function(callback){
    Client.find(callback);
};

module.exports.addClient = function(client, callback){
    Client.create(client, callback)
};

module.exports.removeClient = function(id, callback){
    var query = {_id: id};
    Client.remove(query, callback);
};