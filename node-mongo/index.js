// Module imports
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Var, Let and Const assignments
const url = 'mongodb://localhost:27017';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);

    console.log('Connected correctly to the server');

    const db = client.db(dbname);
    const collection = db.collection("dishes");

    let objEntry = {
        "name": "Uthappizza",
        "description": "Test 2"
    };

    collection.insertOne(objEntry, (err, result) => {
        assert.equal(err, null);

        console.log('After insert: \n');
        console.log('result.ops', result.ops);

        collection.find({}).toArray((toArrayErr, docs) => {
            assert.equal(toArrayErr, null);

            console.log('Found: \n');
            console.log('docs', docs);

            db.dropCollection('dishes', (dropCollectionErr, result) => {
                assert.equal(dropCollectionErr, null);

                client.close();
            });
        });
    });
});