const express = require('express');
const domain = require('domain');
const server = express();

const dom = domain.create();

dom.on('error', (err) => {
    console.log(`Express application error ${err}`);
});

dom.run(() => {
    server.get('/', (req, res) => {
        res.send('WORKING!')
    });

    server.get('/error', (req, res) => {
        setTimeout(() => {
            throw new Error('Something broke!');
        }, 1000)
    });

    server.listen(8080, function () {
        console.log('Example app listening on port 8080!');
    });
});