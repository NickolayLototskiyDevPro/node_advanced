const fs = require('fs');
//const zlib = require('zlib');

const startDate = new Date();
const file = fs.createReadStream('./file.txt');

const copy = fs.createWriteStream('./copy.txt');

file.on('data', (chunk) => {
    file.pipe(copy);
});






/*const readableStream = fs.createReadStream('./file.txt');
var duplex = zlib.createGzip();
var writable = fs.createWriteStream('file.txt.gz');
readableStream.pipe(duplex).pipe(writable);

const fileStream = fs.readFile('./file.txt', (err, data) => {
    console.log(data.toString('utf8'));
})*/