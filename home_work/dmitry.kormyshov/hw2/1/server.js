const server = require('net').createServer();

let counter = 0;
let sockets = {};

server.on('connection', socket => {
    socket.setEncoding('utf8');
    
    socket.id = counter++;
    sockets[socket.id] = socket;

    console.log('Client connected');

    socket.on('data', data => {
        Object.entries(sockets).forEach(([, cs]) => {
            if (cs.id != socket.id) {
                cs.write(`${socket.id}: ${data}`);
            }
        }, this);
    });

    socket.on('end', () => {
        delete sockets[socket.id];
        console.log('Client disconnected');
    });

    socket.on('error', () => {
        delete sockets[socket.id];
        console.log('Client disconnected with error');
    });
});


server.listen(8000, () => console.log('Server bound'));
