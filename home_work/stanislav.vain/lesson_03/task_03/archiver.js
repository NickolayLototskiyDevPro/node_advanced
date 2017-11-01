const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function compress(file) {
  if (!fs.existsSync(file) || !(/\.(js)$/i).test(file)) {
    throw new Error(`File ${file} doesn't exist or has an inappropriate extension.`);
  }

  const filePath = path.resolve(file);
  const options = { level: zlib.Z_BEST_SPEED, memLevel: zlib.Z_BEST_SPEED };
  const gzip = zlib.createGzip(options);
  const inputStream = fs.createReadStream(filePath);
  const outStream = fs.createWriteStream(`${file}.gz`);

  try {
    inputStream
      .pipe(gzip)
      .pipe(outStream);
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = { compress };
