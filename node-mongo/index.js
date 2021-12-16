// Module imports
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

// Var, Let and Const assignments
const url = 'mongodb://localhost:27017';
const dbname = 'conFusion';

let objEntry = {
    "name": "Uthappizza",
    "description": "Test 2"
};

let entryToUpdate = {
    "name": 'Uthappizza'
};

let entryValueUpdated = {
    "description": "vadonut\'s description"
};

MongoClient.connect(url).then((client) => {
    console.log('Connected correctly to server');

    const db = client.db(dbname);

    dboper.insertDocument(db, objEntry, 'dishes')
        .then((result) => {
            console.log('Inserted Document \n', result.ops);

            return dboper.findDocument(db, 'dishes');
        })
        .then((docs) => {
            console.log('Found Document \n', docs);

            return dboper.updateDocument(db, entryToUpdate, entryValueUpdated, 'dishes');
        })
        .then((result) => {
            console.log('Updated document:\n', result.result);

            return dboper.findDocument(db, 'dishes');
        })
        .then((docs) => {
                console.log('Found documents:\n', docs);

            return db.dropCollection('dishes');
        })
        .then((result) => {
                console.log('Dropped collection: \n', result);

                    client.close();
        })
        .catch((err) => console.log('Check the following error: ', err));
});