var mongoose = require('mongoose');

// Staff schema
var staffSchema = mongoose.Schema({
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
    },

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
        validate: {
            validator: function(v) {
                return /^[0-9]{6}$/.test(v);
            },
            message: '{VALUE} is not a valid store ZipCode!'
        },
        unique: [true, 'ZipCode must be unique']
    },
    staff_pic: {
        type: String
    }
});

var Staff = module.exports = mongoose.model('Staff', staffSchema, 'staff');

module.exports.addStaff = function(staff, callback){
    Staff.create(staff, callback)
};

module.exports.getStaff = function(callback){
    Staff.find(callback);
};

module.exports.removeStaff = function(id, callback){
    var query = {_id: id};
    Staff.remove(query, callback);
};

module.exports.getStaffByMail = function(mail, callback) {
    var query = Staff.findOne({'email': mail}).exec(callback);
};