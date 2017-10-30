const { EventEmitter } = require('events');

const event = new EventEmitter();

setTimeout(()=> {
    console.log(new Date().getSeconds());
    event.addListener('start', (date) => {
        console.log(date.getSeconds());
    });
}, 2000);

setTimeout(() => {
    event.emit('start', 'Heloooooooo!');
}, 1000);


setTimeout(() => {
    event.emit('start', new Date());
}, 3000);