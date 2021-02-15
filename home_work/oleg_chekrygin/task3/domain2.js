const express = require('express');
const domain = require('domain');
const app = express();
const dom = domain.create();

const MongoClient = require('mongodb').MongoClient;

dom.on('error', (err) => {
    console.log(`MongoClient application error ${err}`);
});

dom.run(() => {
    MongoClient.connect("mongodb://localhost:27017/integration_test", function(err, database) {
        if(err) throw err;

        app.listen(8000);
        console.log("Listening on port 8000");
    });
});