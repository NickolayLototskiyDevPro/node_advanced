const EventEmitter = require('events').EventEmitter;

class MyEmitter extends EventEmitter{

}

const evenListenerFn = () => {
  console.log(++m);
}

const myEmitter = new MyEmitter();
let m = 0;

myEmitter.once('event', evenListenerFn);
myEmitter.once('event', evenListenerFn);

myEmitter.emit('event');
// Prints: 1

myEmitter.emit('event');
// Ignored
myEmitter.emit('event');
// Ignored
myEmitter.emit('event');
// Ignored
myEmitter.emit('event');
// Ignored