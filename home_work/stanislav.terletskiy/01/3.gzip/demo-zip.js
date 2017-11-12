const path = require('path');
const OwnGzip = require('own-gzip');
const logger = require('anode-fun-logger');

const sourceFolder = path.resolve([__dirname, 'src'].join('/'));
const targetFolder = path.resolve([__dirname, 'demo/zip/js'].join('/'));
const fileType = 'js';

const ownGzip = new OwnGzip({ logger, sourceFolder, targetFolder, fileType });
ownGzip.zip();