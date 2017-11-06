'use strict';

const idProvider = require(`${basePath}/services/id.service`);

module.exports = class Socket {
  constructor(socket) {
    this._socket = socket;
    this._setSocketId(this._generateId());
  }

  _setSocketId(id) {
    this._socket._id = id;
  }
  
  _generateId() {
    return idProvider.generateId();
  }

  getSocket() {
    return this._socket;
  }

};