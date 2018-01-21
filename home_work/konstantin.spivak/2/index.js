const path = require("path");
const minify = require("./minify");
const { WriteStream, ReadStream, readdir } = require("fs");


const config = require("./config");
let writeStream = new WriteStream(`${config.distPath}/out.css`);
writeStream.on('error', (e) => {
    console.log(e);
});

readdir(config.scanPath, (err, files) => {
    let clearFiles = files.filter(file => path.extname(file) === '.css');
    clearFiles = clearFiles.map(file => {
        return `${config.scanPath}/${file}`;
    });
    clearFiles.push('./joycasion.css');

    clearFiles.forEach(file => {
        let readFile = new ReadStream(file);
        readFile.pipe(minify()).pipe(writeStream);

        readFile.on('error', (e)=> {
            console.log(e);
        })
    });
});
