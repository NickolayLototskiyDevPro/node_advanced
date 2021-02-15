const express = require('express');
const mongoose = require('mongoose');
const domain = require('domain');

const db = mongoose.connection;

const domain1 = domain.create();
const domain2 = domain.create();

const app = express();


db.on('error', (err) => {
    throw new Error(err);
})

domain1.on('error', (err) => {
    console.error(err);
})

domain2.on('error', () => {
    console.error('Hello error!');
})

domain1.run(() => {
    mongoose.connect('mongodb://localhost/test');
}); 

app.get('/hello', function (req, res) {
    res.send('Hello World!');
});

app.get('*', function (req, res) {
    throw new Error('Something bad!');
});

domain2.run(() => {
    app.listen(8000, function () {
        console.log('Listening on port 8000!');
    });
}); 
