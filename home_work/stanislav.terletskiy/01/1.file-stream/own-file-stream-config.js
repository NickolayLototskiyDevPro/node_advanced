const path = require('path');
const logger = require('anode-fun-logger');

/**
 * All paths should be set as relative to a current folder.
 */
const contentFilePath = 'demo/own-file-stream-content.txt';

module.exports = {
    logger: logger,
    contentFilePath: path.resolve([__dirname, contentFilePath].join('/')),
};