var Store = require('../../models/store');
var CacheUtil = require ('../cacheUtil');

exports.getStores = function (req, res) {
    Store.getStore(function(err, store){
        if (err) {
            res.status(500).send({ error: 'Listing stores failed!' });
        }
        else {
            res.json(store);
        }
    })
};