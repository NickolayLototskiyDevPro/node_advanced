const https = require('https');
const fs = require('fs');
const logger = require('anode-fun-logger');
const config = require('./https-server-config');

const greets = [
    'Hi!', 'Hallo!', 'Привет!'
];

const server = https.createServer({
    key: fs.readFileSync(config.key),
    cert: fs.readFileSync(config.cert)
});

server.listen(config.port, config.host);

server.on('listening', () => logger.write(`[INFO] Server is listening on https://${config.host}:${config.port}/\n`));

server.on('error', error => {
    logger.write(`[ERROR] an error encountered: ${error}`);
});

server.on('request', (req, res) => {
    responseCode = Math.floor(Math.random() * 10) === 4 ? 403 : 200;
    res.writeHead(responseCode);

    if (403 === responseCode) {
        res.end(`\\[#__#]/ Halt! Ich werde schießen!\n`);
        server.close();
    } else {
        res.end(`\\[^__^]/ ${greets[Math.floor(Math.random() * greets.length)]}!\n`);
    }
});

module.exports = server;