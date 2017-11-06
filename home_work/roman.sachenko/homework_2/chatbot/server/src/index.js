'use strict';

global.basePath         = `${__dirname}`;
const net               = require('net');
const SocketService     = require(`${basePath}/services/socket.service`);
const UserPullService   = require(`${basePath}/services/userPull.service`);
const IdService         = require(`${basePath}/services/id.service`);
const userPullService   = new UserPullService();

//TODO: Wrap in service
const SERVICE_MESSAGES = {
  CONNECTION: {
    ESTABLISHED: 'Connection established',
    ERROR: 'Connection error'
  },
  USER: {
    CONNECTED     : 'New User Connected',
    DISCONNECTED  : 'User Disconnected'
  }
};

const server = net.createServer((socket) => {

  const currentSocket = new SocketService(socket).getSocket();
  userPullService.addUser(currentSocket);
  sendConnectionMessage(currentSocket);

  currentSocket.on('data', (data) => {
    broadCast(currentSocket._id, data.toString());
  });

  currentSocket.on('error', (err) => {
    log(`${SERVICE_MESSAGES.CONNECTION.ERROR}: ${err}`);
  });

  currentSocket.on('end', (data) => {
    userPullService.deleteUser(currentSocket);
    sendDisconnectMessage(currentSocket);
  })
});

server.listen(8124, () => {
  log(SERVICE_MESSAGES.CONNECTION.ESTABLISHED);
});


/**
 * Simple broadcast machine
 * Builds messages and sends them
 * @param from
 * @param message
 * @param exclude
 */
function broadCast(from, message, exclude = []) {

  try {
    let users           = userPullService.getUsers();
    let messageToSend   = getFullMessage(from, message);

    for(let key in users) {
      if(from != key && exclude.indexOf(parseInt(key)) < 0) {
        //TODO: export logger
        log(`Sending from ${from} to ${key}`);
        users[key].write(messageToSend);
      }
    }
  } catch(err) {
    //TODO: Update error handling process
    log(err);
  }

}

/**
 * Broadcasts user connect message
 * @param connectedUser {object} user socket
 */
function sendConnectionMessage(connectedUser) {
  let message = `${SERVICE_MESSAGES.USER.CONNECTED}: ${connectedUser._id}`;
  broadCast(IdService.getServiceId(),  message, [ connectedUser._id ]);
}

/**
 * Broadcasts user disconnect message
 * @param connectedUser {object} user socket
 */
function sendDisconnectMessage(connectedUser) {
  let message = `${SERVICE_MESSAGES.USER.DISCONNECTED}: ${connectedUser._id}`;
  broadCast(IdService.getServiceId(),  message, [ connectedUser._id ]);
}

/**
 * Returns full message object
 * @param from {object} - socket object
 * @param message {string}
 */
function getFullMessage(from, message) {
  const MESSAGE_LENGTH_MAX = 5000;
  const MESSAGE_LENGTH_MIN = 0;

  if(!(message.length > MESSAGE_LENGTH_MIN && message.length <= MESSAGE_LENGTH_MAX)) {
    throw new Error('message length is not valid')
  }

  if(!from) {
    from = 'UNDEFINED';
  }

  return JSON.stringify({ message, from, online: userPullService.countUsers() });
}

/**
 * Simple log wrapper
 * @param message
 */
function log(message) {
  console.log(`[${new Date()}] ${message}`);
}