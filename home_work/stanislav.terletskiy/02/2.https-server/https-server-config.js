const path = require('path');

module.exports = {
    port: 443,
    host: '127.0.0.1',
    key: path.resolve([__dirname, '.ssl', 'key.pem'].join('/')),
    cert: path.resolve([__dirname, '.ssl', 'cert.pem'].join('/'))
}