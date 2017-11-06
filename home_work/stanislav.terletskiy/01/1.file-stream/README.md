Task:
=====
Create our own file stream inherit from EventEmitter and using process.stdin/stdout.

Solution:
=========
'Own file stream' is behawing almost like 'Duplex stream'.
It does next actions:
1. reads an user input from `process.stdin`.  
2. writes the user input to a file (file name can be set in a configuration, default name: `./demo/own-file-stream-content.txt`).
3. writes the user input to `process.stdout`.

Own file stream demo:
1. if you want to override default configuration, edit: `own-file-stream-config.js`
2. run: `node demo`