const fs = require('fs');
const { EventEmitter } = require('events');

const filesEmitter = new EventEmitter();

init();

function init() {
  let preparedStyles = '';
  getFilesList();
  
  filesEmitter.once('filesList', (files) => {
    let filesReadQuantity = 0;
    
    files.forEach((file) => {
      fs.readFile(file, (err, data) => {
        filesReadQuantity += 1;
        preparedStyles += prepareStyles(data);
        
        if (filesReadQuantity === files.length) {
          preparedStyles += '\u00A9joycasino.com';
          filesEmitter.emit('stylesMinify', preparedStyles);
        }
      });
    });
  });
  
  filesEmitter.once('stylesMinify', (styles) => {
    writeFile('bundle.css', styles);
  })
}

function getFilesList() {
  let list = [];
  
  fs.readdir('./', (err, files) => {
    list = files.filter((file) => file.endsWith('.css'));
    
    filesEmitter.emit('filesList', list);
  });
  
  return list;
}

function prepareStyles(stylesContent) {
  return stylesContent.toString().replace(/(?:\r\n|\r|\n)/g, '').replace(/ /g,'');
}

function writeFile(fileName, content) {
  fs.writeFile(fileName, content, (err) => {
    if(err) {
      return console.log(err);
    }
    
    console.log("The file was saved!");
  });
}