var Purchase = require('../models/purchase');

exports.getPurchases = function (req, res) {
    Purchase.getPurchase(function (err, purchase) {
        if (err) {
            console.error(">> Error getting purchase " + err);
            res.status(500).send({error: 'Getting purchase failed!'});
        } else {
            res.json(purchase);
        }
    })
};

