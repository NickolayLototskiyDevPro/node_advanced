const fs = require('fs');
const zlib = require('zlib');
const file = process.argv[2];

switch (file.split('.').pop()) {
	case 'js':
		fs.createReadStream(file)
			.pipe(zlib.createGzip())
			.pipe(fs.createWriteStream(`${file}.gz`))
			.on('finish', () => console.log('Done'));
		break;
	case 'gz':
		let fileName;
		let tmp = file.split('.');
		
		tmp.pop();
		fileName = tmp.join('.');

		fs.createReadStream(file)
			.pipe(zlib.createUnzip())
			.pipe(fs.createWriteStream(fileName))
			.on('finish', () => console.log('Done'));
		break;
	default:
		break;
}