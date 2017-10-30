const { EventEmitter } = require('events');

const onceEvent = new EventEmitter();

let listener = (msg) => {
    console.log(msg);
};

onceEvent.on('start', listener);

console.log(onceEvent.eventNames());
onceEvent.removeListener('start', listener);


onceEvent.emit('start', 'Hello world');

console.log(onceEvent.eventNames());

onceEvent.emit('start', 'Hello world');
