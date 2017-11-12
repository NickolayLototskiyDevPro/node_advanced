const path = require('path');
const logger = require('anode-fun-logger');

/**
 * All paths should be set as relative to a current folder.
 */
const sourceFolder = 'src/css';
const targetFolder = 'bundle/css';
const fileType = 'css';
const copyright = '/*\nWell as you can see\nI go back and forth, that\'s right\nSide to side\nBack and forth\nBack and forth\nBack and side to side\nLet\'s start advertising\nAnd make some real money!\n*/';

module.exports = {
    logger: logger,
    copyright,
    fileType,
    sourceFolder: path.resolve([__dirname, sourceFolder].join('/')),
    targetFolder: path.resolve([__dirname, targetFolder].join('/'))
};