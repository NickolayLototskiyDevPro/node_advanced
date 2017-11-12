const net = require('net');
const logger = require('anode-fun-logger');
const config = require('./chat-room-demo-config')

const server = net.createServer();
const names = ['Emma', 'Bob', 'Lukas', 'Olivia', 'Mia']

let clients = [];

server.on('connection', client => {
    clients.push({ id: Date.now(), name: names[clients.length] || 'Anonymous', client });

    logger.write(`[INFO] New clien has connected...\nWOW! There ${clients.length < 2 ? 'is' : 'are'} ${clients.length} client${clients.length < 2 ? '' : 's'} in the Chat. \\[^__^]/\n`);
    
    client.on('error', error => {
        if (error !== 'ECONNRESET') {
            logger.write(`[ERROR] Client has encountered an error:\n${error}\n`);
        }
    });

    client.on('data', data => {
        let clientName = clients.filter(entry => entry.client === client).pop().name;
        
        logger.write(`${'\033[0;36m'}${clientName}:${'\033[0m'} ${data}\n`);

        clients
            .filter(entry => entry.client !== client)
            .forEach(entry => entry.client.write(data.toString()));
    });
    
    client.on('close', (client) => {
        clients.splice(clients.indexOf(client), 1);
        client = undefined;
        logger.write(`[INFO] A client has gone...\nThere ${clients.length < 2 ? 'is' : 'are'} only ${clients.length} client${clients.length < 2 ? '' : 's'} in the Chat. /[-_-]\\\n`);
    });
});

server.on('error', error => {
    logger.write(`[ERROR] an error encountered: ${error}`);
});

server.on('listening', () => logger.write(`[INFO] Server is listening on ${config.host}:${config.port}\n`));

server.listen(config.port, config.host);