const zlib = require('zlib');
const fs = require('fs');
const { EventEmitter } = require('events');

const filesEmitter = new EventEmitter();

function getFilesList() {
  let list = [];
  
  fs.readdir('./', (err, files) => {
    list = files.filter((file) => file.endsWith('.js'));
    
    filesEmitter.emit('filesList', list);
  });
  
  return list;
}