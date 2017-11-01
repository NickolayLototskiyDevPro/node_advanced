// - Create gzip archiver and un-archiver -> archive un-archive js files only.

const zlib = require('zlib');
const gzip = zlib.createGzip();
const path = require('path');
const fs = require('fs');

class Archiver {
    constructor () {}

    zip (files) {
        const jsFiles = this.filterJsFiles(files);

        for (let i in jsFiles) {
            fs.createReadStream(jsFiles[i])
                .pipe(gzip)
                .pipe(fs.createWriteStream(`zipped.gz`));
        }
    }

    unZip (archive) {
        const archiveFiles = this.filterArchiveFiles(archive);

        for (let i in archiveFiles) {
            fs.createReadStream(archiveFiles[i])
                .pipe(zlib.createUnzip())
                .pipe(fs.createWriteStream(`unzipped.js`));
        }
    }

    filterJsFiles (files) {
        return files.filter( (file) => file.indexOf('.js') !== -1);
    }

    filterArchiveFiles (files) {
        return files.filter( (file) => file.indexOf('.gz') !== -1);
    }
}

const archiver = new Archiver();

archiver.zip(fs.readdirSync(__dirname)); //For zipping all files in directory
//archiver.unZip(fs.readdirSync(__dirname));  //For unzipping all files in directory