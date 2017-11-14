const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const domain = require('domain');

const logger = require('anode-fun-logger');

const appConfig = require('./app-config'); 
const mongodbConfig = require('./mongodb-config'); 

const domain1 = domain.create();
const domain2 = domain.create();

domain1.on('error', (error) => {
    logger.write(`[ERROR] Domain1\n ${error.stack}`);
    process.exit(1);
});
        
domain2.on('error', (error) => {
    logger.write(`[ERROR] Domain2\n ${error.stack}`);
    process.exit(1);
});

domain1.run(() => {
    mongoClient.connect(`${mongodbConfig.uri}`, (error, db) => {
        if (error) {
            throw error;
        }

        domain2.run(() => startApp({db}));
    });
});

function startApp(options) {
    const app = express();
    const {db} = options;
    
    app.listen(appConfig.port, appConfig.host, () => {
        logger.write(`[INFO] App is running on http://${appConfig.host}:${appConfig.port}/\n`);
    });
    
    app.get('/', (req, res) => {
        let todos = db.todos.map(item => `<li>${item.name}</li>`).join('');
        res.send(`
            <h1>All todos</h1>
            <ol>${todos}</ol>
        `);
    });
}
