const EventEmitter = require('events');
const myEE = new EventEmitter();
myEE.on('foo', () => {
    console.log('!!!!!!!!!!!!!!!!!')
});
myEE.on('foo', () => {
    console.log('!!!!!!!!!!!!!!!!!')
});
myEE.on('foo', () => {
    console.log('!!!!!!!!!!!!!!!!!')
});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});
console.log(myEE.eventNames())
console.log( myEE.listenerCount('foo'));
//console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]