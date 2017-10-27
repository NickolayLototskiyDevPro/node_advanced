const { EventEmitter } = require('events');

const notifier = new EventEmitter();
const logger = new EventEmitter();
const superPuperClass = new EventEmitter();
console.log(superPuperClass.getMaxListeners());

setTimeout(()=>{
    for(let i = 0; i < 5; i++){
        superPuperClass.emit('WeAllGonaDie', 'Im joking', i);
    }
}, 1000);

const handler = (msg)=>{
    console.log(msg);
}

const handler2 = (msg, count) => {
    console.log(`${msg} - ${count}`)
}

superPuperClass.once('WeAllGonaDie', handler);
superPuperClass.on('WeAllGonaDie', handler2);
console.log(superPuperClass.listeners('WeAllGonaDie')[0]('This is not listener'));

superPuperClass.on('Hell', ()=> {
    console.log('This is the hell!')
})
console.log(superPuperClass.removeAllListeners());

notifier.addListener('notify', msg => {
    console.log(`Notify ${msg}`);
});

notifier.addListener('notify', (msg, num, count) => {
    console.log(`Hello ${msg}`);
    console.log(`Num ${num}`);
    console.log(`Count ${count}`);
});

notifier.addListener('notify', msg => {
    console.log(`Good bye ${msg}`);
});

notifier.once('oneTime', msg => {
    console.log(msg)
})

console.log(notifier.eventNames());

notifier.emit('oneTime', 'One');
console.log(notifier.eventNames());
notifier.emit('oneTime', 'Two');

setTimeout(()=>{
    notifier.emit('notify', 'hell yeah!', 2, 3);
}, 1000);

logger.on('warning', message => {
    console.log(`WARN: ${message}`);
});

logger.on('error', message => {
    console.log(`ERR: ${message}`);
});

notifier.once('wonMillion', message => {
    console.log(message)
});

console.log(notifier.eventNames());
console.log(notifier.listenerCount('notify'));

notifier.removeAllListeners('error');
console.log(notifier.listenerCount('error'));

logger.emit('warning', 'Attention wrong action!')
logger.emit('error', 'Something goes wrong');
logger.emit('error', 'Fatal error');
setTimeout(() => {
    notifier.emit('notify', 'save process');
}, 1000)
