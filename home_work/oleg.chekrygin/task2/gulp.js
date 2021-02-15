const fs = require('fs');
const files = fs.readdirSync(__dirname);
const path = require('path');
const { Readable } = require('stream');
const { Transform } = require('stream');
const out = fs.createWriteStream('common.css');

const inStream = new Readable({
    read (err, data) {
        this.push(data);
    }
});

const transform = new Transform({
    transform (chunk, encoding, callback) {
        const transformedChunk = transformBuffer(chunk);
        callback(null, transformedChunk);
    }
});

commonReadableStream(files, (err, data) => {
    inStream.push(data);
});

function transformBuffer (buff) {
    return buff.toString('ascii').replace(/(\r\n|\n|\r|\s)/gm,'')
}

function commonReadableStream (files, cb) {
    for(let i in files) {
        if (files[i].indexOf('.css') !== -1) {
            fs.readFile(path.join(__dirname, files[i]), (err, data) => {
                return cb(null, data);
            });
        }
    }
}

inStream.pipe(transform).pipe(out);