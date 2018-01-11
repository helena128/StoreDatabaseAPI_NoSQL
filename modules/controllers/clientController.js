var Client = require( '../../models/clients' );

exports.removeClient = function(req, res) {
    var staff = req.body;
    Staff.addStaff(staff, function(err, staff) {
        if (err) {
            res.status(500).send({ error: 'Creating client failed!' });
        } else {
            res.json(staff);
        }
    })
};

exports.getClients = function (req, res) {
    Client.getClients(function(err, client){
        if (err) {
            res.status(500).send({ error: 'Listing clients failed!' });
        } else {
            res.json(client);
        }
    })
};