const { spawn } = require('child_process');

// Run server
require('./server');

// create two clients
spawn('node', ['client.js']);
spawn('node', ['client.js']);