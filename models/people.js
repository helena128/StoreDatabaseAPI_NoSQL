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
         validate: {
             validator: function(v) {
                 return /^[a-zA-Z0-9]{1,}@[a-z]{3,}\.[a-z]{3}$/.test(v);
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
 });

 var People = module.exports = mongoose.model('People', peopleSchema, 'people');

 // get people
 module.exports.getPeople = function(callback, limit){
     People.find(callback).limit(limit);
 };