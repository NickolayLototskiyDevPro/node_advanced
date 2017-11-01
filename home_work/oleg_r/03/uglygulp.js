const fs = require('fs');
const { Transform } = require('stream');

class MyMinifier extends Transform {
  constructor() {
    super({
      readableObjectMode : true,
      writableObjectMode: true
    });
  }

  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().replace(/\s/g, ''));
    callback();
  }
}

class Advertising extends Transform {
  constructor() {
    super({
      readableObjectMode : true,
      writableObjectMode: true
    });
  }

  _transform(chunk, encoding, callback) {
    this.push(chunk + ' JOY CASINO.COM CAN GO FUCK YOURSELF');
    callback();
  }
}

const outStream = fs.createWriteStream('./resources/out.css');
const filesToMinify = [
  'sample.css',
  'another.css',
  'third.css'
];

const streams = filesToMinify
  .map(fileName => fs.createReadStream(`./resources/${fileName}`));

function isPenult(index, array) {
  return array.length === index + 2;
}

function isLast(index, array) {
  return array.length === index + 1;
}

streams.forEach((stream, index, arr) => {
  if (isLast(index, arr)) {
    console.log('\n\n FILE CREATED AS resources/out.css');
    return;
  }

  // If next stream item will be last in chain we need add advertising to it after minifying
  if (isPenult(index, arr)) {
    stream.once('end', () => {
      arr[index + 1]
        .pipe(new MyMinifier())
        .pipe(new Advertising())
        .pipe(outStream)
    });
    return;
  }

  // Current stream item is not last or penultimate, just add minifier
  stream.once('end', () => {
    arr[index + 1]
      .pipe(new MyMinifier())
      .pipe(outStream);
  });
});

streams[0]
  .pipe(new MyMinifier())
  .pipe(outStream, {
    end: false
  });


