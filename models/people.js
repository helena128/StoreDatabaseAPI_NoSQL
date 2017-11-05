 var mongoose = require('mongoose');

// People schema
 var peopleSchema = mongoose.Schema({
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
         minlength: 6
     }
 },

     {
         versionKey: false
     });

 var People = module.exports = mongoose.model('People', peopleSchema, 'people');

 // get people
 module.exports.getPeople = function(callback, limit) {
     People.find(callback).limit(limit);
 };

 // read by Id
 module.exports.getPeopleById = function(id, callback) {
     People.findById(id, callback);
 };

 // add people
 module.exports.addPeople = function(people, callback) {
     People.create(people, callback);
 };

 // update
 module.exports.updatePeople = function(id, people, options, callback){
     var query = {_id: id};
     var update = {
         first_name: options.first_name,
         last_name: options.last_name,
         phone: options.phone,
         email: options.email,
         passport: options.passport,
         sex: options.sex,
         date_of_registration: options.date_of_registration,
         date_of_birth: options.date_of_birth,
         password: options.password
     };
     People.findOneAndUpdate(query, update, options, callback);
 };

 // delete
 module.exports.removePeople = function(id, callback){
     var query = {_id: id};
     People.remove(query, callback);
 };