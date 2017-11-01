const domain = require('domain').create();
const { Server } = require('http');
const port = 3000;
const host = 'localhost';

domain.on('error', (err) => {
    console.log('Error appears');
    console.log(err);
    process.exit(1);
})

domain.run(() => {
    const server = new Server((req, res) => {
        //req.emit('error', 'Error from stream');
        req.data.uu = 1;
        //throw new Error('Something goes wrong');
    });
    
    server.listen(port, host, () => {
        console.log(`Server listen on ${host}:${port}`);
    });
});

