var Purchase = require('../../models/purchase');
var Staff = require('../../models/staff');

exports.getPurchases = function (req, res) {
    Purchase.getPurchase(function (err, purchase) {
        if (err) {
            res.status(500).send({error: 'Getting purchase failed!'});
        } else {
            res.json(purchase);
        }
    })
};

exports.removePurchase = function(req, res) {
    var id = req.params._id;
    Purchase.removePurchase(id, function(err, purchase) {
        if (err) {
            res.status(500).send({ error: 'Deleting purchase failed!' });
        } else {
            res.json(purchase);
        }
    })
};

// TODO: fix
exports.addPurchase = function(req, res) {
    var purchase = req.body;

    // check that the staff exists by their email
    Staff.getStaffByMail(purchase.staff_email, function (err, staff) {
        if (err) {
            res.status(500).send({ error: 'No worker with email stated!' });
        } else {
            //res.json(staff);
            console.log(">> Finding staff");

            // check that we found our staff member
            if (!Util.isEmptyObject(staff)){
                console.log("Staff found");
                Purchase.addPurchase(purchase, function (err, purchase) {
                    if (err) {
                        res.status(500).send({error: 'Creating purchase failed!'});
                    } else {
                        res.json(purchase);
                    }
                });
            } else { console.log("Error finding staff") }
        }
    });
};