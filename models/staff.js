var mongoose = require('mongoose');

// Client schema
var staffSchema = mongoose.Schema({
    staff_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'People',
        required: true,
        unique: true
    },
    store_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    staff_pic: {
        type: String,
        required: true
    }
});

var Staff = module.exports = mongoose.model('Staff', staffSchema, 'staff');

module.exports.addStaff = function(staff, callback){
    Staff.create(staff, callback)
};

module.exports.getStaff = function(callback){
    Staff.find({}).populate('staff_id').populate('store_id').exec(callback)
};

module.exports.removeStaff = function(id, callback){
    var query = {_id: id};
    Staff.remove(query, callback);
};
