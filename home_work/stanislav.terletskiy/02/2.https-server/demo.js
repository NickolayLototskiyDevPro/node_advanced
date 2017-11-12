const https = require('https');
const logger = require('anode-fun-logger');
const { port, host } = require('./https-server-config');

// Ignore self signed certs.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Run server
const server = require('./server');

server.on('listening', () => {
    let intervalId = setInterval(() => {
        https.get(`https://${host}:${port}/`, (res) => {
            res.on('data', (data) => {
                logger.write(`(${res.statusCode}) ${data}\n`);

                if (403 === res.statusCode) {
                    clearInterval(intervalId);
                    logger.write(`[INFO] Server has returned status code 403.\n`);
                    logger.write(`[OK] End demo.\n`);
                }
            });
            
        }).on('error', (error) => {
            logger.write(`[ERROR] ${error}\n`);
        });
    }, 403);
});