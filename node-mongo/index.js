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

let objUpdated = {
  "name": "vadonut",
  "description": "vadonut\'s description"
};

MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);

    console.log('Connected correctly to the server');

    const db = client.db(dbname);

    dboper.insertDocument(db, objEntry, 'dishes', (result) => {
      console.log('Inserted Document \n', result.ops);
      
      dboper.findDocument(db, 'dishes', (docs) => {
        console.log('Found Document \n', docs);
        
        dboper.updateDocument(db, {name: 'vadonut'}, {description: 'Updated description'}, 'dishes', (result) => {
          console.log('Updated document:\n', result.result);
          
          dboper.findDocument(db, 'dishes', (docs) => {
            console.log('Found documents:\n', docs);
            
            db.dropCollection('dishes', (result) => {
              console.log('Dropped collection: \n', result);
              
              client.close();
            });
          });
          
        });
      });
    });
});