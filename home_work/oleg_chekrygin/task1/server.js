const server  = require('net').createServer();
const s = require('net').Socket();

server.on('connection', socket => {
    socket.write('Welcome new client', 'utf8');

    socket.on('data', (data) => {
        console.log('Client says:', data.toString());
        setTimeout(() => {
            socket.write(generateRandomMessage(generateRandomNumber(0, 2)), 'utf8');
        }, `${generateRandomNumber(3, 7)}000`)
    });
});

server.listen(8080, () => {
    console.log('Server Bound');
});

s.connect(8080);
s.on('data', (data) => {
    console.log('Server says:', data.toString());
    setTimeout(() => {
        s.write(generateRandomMessage(generateRandomNumber(3, 5)), 'utf8');
    }, `${generateRandomNumber(3, 7)}000`)
});

function generateRandomNumber (min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

function generateRandomMessage(index) {
    var messageArray = ['I was just thinking about you!',
        'You are a great example for others.',
        'You have great ideas',
        'When I grow up I want to be you!',
        'I appreciate all of your opinions',
        'You are so beautiful '];

    return messageArray[index];
}