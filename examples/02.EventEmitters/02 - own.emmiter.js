const EventEmitter = require('events').EventEmitter;

class MyOwnEventEmitter extends EventEmitter {
    constructor(name){
        super();
        this.name = name;
    }

    convertName(){
        const oldName = this.name;
        this.name = this.name.split('').reverse().join('')
        console.log(this.name.split('').reverse().join(''));
        this.emit('reverse', oldName, this.name);
    }
}

const myEmitter = new MyOwnEventEmitter('Nick Event');

myEmitter.once('reverse', (oldName, newName) => {
    console.log(`Name changed ${oldName} -> ${newName}`);
});

myEmitter.addListener('restart', (err, msg) => {
    console.log(myEmitter.name);
    console.log(`${err} - ${msg}`);
});

//myEmitter.emit('restart', 'Unexpected error', 'Server was restarted');

myEmitter.convertName();
myEmitter.convertName();
myEmitter.convertName();