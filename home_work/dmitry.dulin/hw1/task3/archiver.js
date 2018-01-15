const fs = require('fs');
const zlib = require('zlib');
const file = './test.js';

function createGzip () {
  fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(`${file}.gz`))
    .on('finish', () => { console.info('Done')})
}

function createUnzip () {
  fs.createReadStream(`${file}.gz`)
    .pipe(zlib.createUnzip())
    .pipe(fs.createWriteStream(`./newtest.js`))
    .on('finish', () => { console.info('Done')})
}
