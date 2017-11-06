'use strict';

let messageDictionary = require(`${basePath}/services/config/message.service/dictionary`);

module.exports = class MessageService {

  constructor() {
    this._setMessageDictionary(messageDictionary);
    this._ACTION_KEYS   = { req: 'req', res: 'res' };
    this._CONTEXT       = {
      greeting     : 'greeting',
      howAreYou    : 'howAreYou',
      randomPhrases: 'randomPhrases',
      bye          : 'bye' }
  }


  _setMessageDictionary(messageDictionary) {
    this._messageDictionary = messageDictionary;
  }

  _getMessageDictionary() {
    return this._messageDictionary;
  }

  _getActionKeys() {
    return this._ACTION_KEYS;
  }

  _getContext() {
    return this._CONTEXT;
  }

  _getResponseMessage(message, exitConversation) {
    return {
      message: `: ${message}`,
      proceed: !!!(exitConversation)
    };
  }

  _generateMessageFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  getResponse(message) {
    let self = this;
    let messageDictionary = this._getMessageDictionary();

    if(!message) {
      return self._getResponseMessage(self._generateMessageFromArray(self._getMessageDictionary()[self._getContext().greeting].req));
    }

    for(let contextKey in messageDictionary) {
      let currentCntxt = messageDictionary[contextKey];
      for(let actionKey in currentCntxt) {
        if(currentCntxt[actionKey].indexOf(message) > -1) {
          
          if(actionKey === self._getActionKeys().req) {
            return self._getResponseMessage(self._generateMessageFromArray(currentCntxt[self._getActionKeys().res]), false);
          }
          
          if(contextKey === self._getContext().bye) {
            return self._getResponseMessage('', true)
          }
          
        }
      }
    }

    return self._getResponseMessage(self._generateMessageFromArray(self._getMessageDictionary()[self._getContext().randomPhrases].req));
  }
  
  getExitRequest() {
    let self = this;
    return self._getResponseMessage(self._generateMessageFromArray(self._getMessageDictionary()[self._getContext().bye].req));
  }
};