const fs = require('fs');
const server = require('https').createServer({
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
});

server.on('request', (req, res) => {
    res.writeHead(200, 'Running');
    res.end('Success test message');
});

server.on('error', (req, res) => {
    res.writeHead(403, 'Exception');
    res.end('Error Message');
});

server.listen(443);