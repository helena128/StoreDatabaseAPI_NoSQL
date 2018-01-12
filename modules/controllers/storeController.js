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

exports.addStore = function (req, res) {
    var store1 = req.body;

    Store.addStore(store1, function(err, store1){
        if (err) {
            res.status(500).send({ error: 'Posting stores failed!' });
        } else {
            CacheUtil.setCache(client, store1, CACHE_INTERVAL); // caching new store
            res.json(store1);
        }
    });
};


exports.updateStore = function (req, res) {
    var id = req.params._id;
    var store = req.body;
    Store.updateStore(id, store, {}, function(err, store){
        if (err) {
            res.status(500).send({ error: 'Updating store failed!' });
        } else {
            console.log(">> Store is updated in cache", store);
            cacheOp.deleteCache(client, id); // delete updated from cache
            res.json(store);
        }
    })
};

exports.removeStore = function (req, res) {
    var id = req.params._id;

    Store.removeStore(id, function(err, store) {
        if (err) {
            res.status(500).send({ error: 'Deleting store failed!' });
        } else {
            // delete cache
            cacheOp.deleteCache(client, id);
            res.json(store);
        }
    })
};