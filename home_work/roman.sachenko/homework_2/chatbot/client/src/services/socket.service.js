'use strict';

module.exports = class SocketService {
  constructor(client) {
    this._client = client;
  }

  getClient() {
    return this._client;
  }

  processMessage(messageResponse) {

    if(messageResponse.proceed) {
      this._client.write(`${messageResponse.message}`)
    } else {
      this._client.end();
    }
  }
};