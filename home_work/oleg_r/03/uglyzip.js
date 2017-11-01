const fs = require('fs');
const zlib = require('zlib');

function zipper(fname) {
  const [name, ext]  = fname.split('.');
  if (ext !== 'js') {
    return;
  }
  const gzip = zlib.createGzip();
  const inpStream = fs.createReadStream('./resources/' + fname);
  const outStream = fs.createWriteStream('./resources/' + fname + '.gz');

  inpStream.pipe(gzip).pipe(outStream);

  console.log('\n\n FILE CREATED /resources/' + fname + '.gz');
}

function unzipper(zipName) {
  const [name, ext, zip]  = zipName.split('.');

  if (!zip || zip !== 'gz') {
    return;
  }

  const inp = fs.createReadStream('./resources/' + zipName);
  const out = fs.createWriteStream('./resources/' + name + '_new' + '.' + ext);
  const unzipper = zlib.Unzip();

  inp.pipe(unzipper).pipe(out);

  console.log('\n\n FILE CREATED /resources/' + name + '_new' + '.' + ext);
}

switch (process.argv[2]) {
  case 'zip':
    fs.readdirSync('./resources')
      .forEach(zipper);
    break;
  case 'unzip':
    fs.readdirSync('./resources')
      .forEach(unzipper);
    break;
  default:
    console.log('Specify "zip" or "unzip" as third argv param');
}

