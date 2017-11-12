const path = require('path');
const OwnGzip = require('own-gzip');
const logger = require('anode-fun-logger');

const sourceFolder = path.resolve([__dirname, 'demo/zip/js'].join('/'));
const unzipFolder = path.resolve([__dirname, 'demo/unzip/js'].join('/'));
const fileType = 'js.gz';

const ownGzip = new OwnGzip({ logger, sourceFolder, targetFolder: unzipFolder, fileType });
ownGzip.unzip();