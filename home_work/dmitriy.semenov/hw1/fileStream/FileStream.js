const { EventEmitter } = require('events');
const fs = require('fs');


class FileStream extends EventEmitter {
  constructor(options) {
    super();
    this.filePath = options.path;
    this.readCb = options.read;
    
    readFile.call(this);
  }
  
  writeFile(data) {
    fs.writeFile("text.txt", data, (err) => {
      if(err) {
        return console.log(err);
      }
    
      console.log("The file was saved!");
    });
  }
}

function readFile() {
  const buffer = new Buffer()
  console.log(fs.readFileSync(this.filePath));
  // fs.readFile(this.filePath, (err, content) => {
  //   if (!err) {
  //     console.log(content);
  //     console.log('??');
  //     this.readCb();
  //     this.emit('read', content);
  //   }
  // });
}

const fileStream = new FileStream({
  path: './temp.txt',
  read() {
    // console.log('!!!!!!!!!');
  }
});

fileStream.on('read', (text) => {
  console.log('-----!!!-----');
});