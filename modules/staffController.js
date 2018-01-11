var Staff = require('../models/staff');

exports.getStaffByMail = function(req, res) {
    var mail = req.params.mail;
    Staff.getStaffByMail(mail, function(err, people){
        if (err) {
            console.error(">> Error finding staff");
            res.status(500).send({ error: 'Listing people failed!' });
        } else {
            res.json(people);
        }
    })
};