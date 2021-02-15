# Chatbot #

## Requirements

At least one server and 2 clients should be started in order to get results.

### Node

Node v8.5.0 or above
Visit https://nodejs.org for installation details.

### npm

Node Package Manager, should come bundled with node.


### pm2/nodemon process managers
nodemon/pm2 will restart the server automatically on code change.

`$ npm install -g nodemon`

or

`$ npm install -g pm2`


## Project Installation

### Go to the project directory & install the dependencies

`$ npm install`


## Runing the project

### Run Server

`$ npm run start:server`

or

`$ nodemon ./server/src/server.js`

or

`$ pm2 start ./boot/start_server.json`


### Run Client

`$ npm run start:client`

or

`$ nodemon ./server/src/client.js`

or

`$ pm2 start ./boot/start_client.json`

