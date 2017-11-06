const OwnFileStream = require('own-file-stream');
const config = require('./own-file-stream-config');

const ownFileStream = new OwnFileStream(config);

process.stdin.pipe(ownFileStream).pipe(process.stdout);