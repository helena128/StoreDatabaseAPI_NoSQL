var Staff = require('../../models/staff');

exports.getStaffByMail = function(req, res) {
    var mail = req.params.mail;
    Staff.getStaffByMail(mail, function(err, people){
        if (err) {
            res.status(500).send({ error: 'Getting staff by mail failed!' });
        } else {
            res.json(people);
        }
    })
};

exports.deleteStaff = function(req,res) {
    var id = req.params._id;
    Staff.removeStaff(id, function(err, staff) {
        if (err) {
            res.status(500).send({ error: 'Deleting staff failed!' });
        } else {
            res.json(staff);
        }
    })
};

exports.getStaff = function (req, res) {
    Staff.getStaff(function(err, staff) {
        if (err) {
            res.status(500).send({ error: 'Getting staff failed!' });
        } else {
            res.json(staff);
        }
    })
};

exports.addStaff = function (req, res) {
    var staff = req.body;
    Staff.addStaff(staff, function(err, staff) {
        if (err) {
            res.status(500).send({ error: 'Creating staff failed!' });
        } else {
            res.json(staff);
        }
    })
};