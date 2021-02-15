'use strict';

/**
 * Weak messaging algorithm works for 2 users max.
 * In case you joining more than 2 user it's going oto be a total nightmare in messages. Nothing is going to be handled smoothly.
 * @type {string}
 */

global.basePath       = `${__dirname}`;
const net             = require('net');
const MessageService  = require(`${basePath}/services/message.service`);
const SocketService   = require(`${basePath}/services/socket.service`);
const messageService  = new MessageService();


//TODO: export contacts into service
const SERVICE_ID    = 'Service'; //Service ID for socket

/**
 * Max messages to send
 * Once we reach the limit the system will end all the chats
 * @type {number}
 */
const MAX_MESSAGES  = 20;
let messageCounter  = 0;
let isTerminated    = false;



const clientSocket = net.createConnection({ port: 8124 }, () => {
  let socketService   = new SocketService(clientSocket);
  let client          = socketService.getClient();

  client.on('data', (data) => {
    let inputMessageObject = JSON.parse(data.toString());
    displayInoutMessage(inputMessageObject);

    if(isTerminated) {
      client.end();
    }
    
    if(isAllowedToSend(inputMessageObject)) {

      setTimeout(() => {
        let messageResponse = messageMachine(inputMessageObject);

        /**
         * Hot Patch of the message because I'm too lazy today to re-write the service
         */
        if(isValidUser(inputMessageObject.from)) {
          //TODO: rewrite the service in close this part
          messageResponse.message = `to '${inputMessageObject.from}' ${messageResponse.message}`;
        }

        socketService.processMessage(messageResponse);
      }, getDelay());
    }

  });


  client.on('end', () => {
    log('disconnected from server');
  });

});


function isValidUser(userId) {
  return (userId !== SERVICE_ID);
}

function isAllowedToSend(inputMessageObject) {
  return (SERVICE_ID !== inputMessageObject.from || inputMessageObject.online > 1);
}


function getMessageBody(messageObject) {
  return (messageObject.from === SERVICE_ID) ? '' : messageObject.message;
}

function messageMachine(inputMessageObject) {
  if(isTerminated || messageCounter < MAX_MESSAGES) {
    messageCounter++;
    return messageService.getResponse(getMessageBody(inputMessageObject));
  }

  isTerminated = true;
  return messageService.getExitRequest();
}

function getDelay() {
  const MIN_VALUE = 3000;
  const MAX_VALUE = 7000;

  return parseInt(Math.random() * (MAX_VALUE - MIN_VALUE) + MIN_VALUE);
}

function displayInoutMessage(inputMessageObject) {
  log(`[${new Date()}] From '${inputMessageObject.from}' ${inputMessageObject.message}`);
}

function log(message) {
  console.log(message);
}