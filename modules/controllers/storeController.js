var Store = require('../../models/store');
var CacheUtil = require ('../cacheUtil');
var ObjectUtil = require('../objectUtil');

// redis
var redis = require('redis');
var client = redis.createClient();

// set cache interval
const CACHE_INTERVAL = 10000;


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

exports.getStoreById = function (req, res) {
    var id = req.params._id;

    client.get(id, function(err, result) {
        if (err) {
            res.status(500).send({ error: 'Couldn\'t get store' });
            return;
        }

        // search in cache
        if (!ObjectUtil.isEmptyObject(result)) {
            console.log('>> Found in cache'); // debugging
            res.json(JSON.parse(result));
        } else { // if not in cache
            console.log('>> Empty in cache. Finding in DB...');
            Store.getStoreById(id, function (err, store) {
                if (err) {
                    res.status(500).send({error: 'Listing stores failed!'});
                } else { // add to cache and send
                    console.log('>> Found in DB');
                    if (!ObjectUtil.isEmptyObject(store)) {
                        CacheUtil.setCache(client, store, CACHE_INTERVAL);
                        res.json(store);
                    }
                }
            });
        }
    });
};

