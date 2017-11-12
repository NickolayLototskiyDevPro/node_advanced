const net = require('net');
const logger = require('anode-fun-logger');
const messageGenerator = require('work-report-generator');
const config = require('./chat-room-demo-config')

const socket = net.createConnection({port: config.port, host: config.host});

const questions = [
    'Tell me pls, what is the next task?',
    'What are you talking about?',
    'Great! And what are you doing?',
    'How could I handle this?',
    'And then?',
    'Any idea?',
    '???',
]

socket.on('connect', () => {
    logger.write(`[OK] Connected...\n`);

    socket.write(questions[Math.floor(Math.random() * questions.length)]);
});
    
socket.on('error', error => {
    logger.write(`[ERROR] I have an error:\n${error}\n`);
    logger.write(`[INFO] Disconnected...\n`);
    socket.end();
});

socket.on('data', data => {
    logger.write(`[INFO] Received message: \n${data}\n`)

    let message = questions[Math.floor(Math.random() * questions.length)];

    if (-1 !== questions.indexOf(data.toString()) || Math.round(Math.random())) {
        message = messageGenerator();
    }
    setTimeout(() => {
        logger.write(`${message}\n`)
        socket.write(message);
    }, Math.floor(Math.random() * 4000) + 3000); 
});
