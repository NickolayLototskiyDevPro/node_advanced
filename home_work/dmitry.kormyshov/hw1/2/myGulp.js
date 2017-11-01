const fs = require('fs');
const { Transform } = require('stream');
const inputPath = process.argv[2];
const outputPath = process.argv[3];
const bundleFileName = 'bundle.css';
const copyright = 'copyright.css'

const minify = new Transform({
	transform(chunk, encoding, callback) {
		this.push(chunk.toString().replace(/\s/g, ''));
		callback();
	}
});

fs.readdir(inputPath, (err, files) => {
	files = files.map(file => `${inputPath}/${file}`);
	files.push(copyright);

	files.forEach((file) => {
		fs.createReadStream(file)
			.pipe(minify)
			.pipe(fs.createWriteStream(`${outputPath}/${bundleFileName}`))
	});
});
