'use strict';

module.exports = class UserPullService {
  constructor() {
    this._users = {};
  }

  _getUserListFromPull() {
    return this._users;
  }

  _addUserToPull(userId, userData) {
   this._users[userId] = userData;
  }

  _deleteUserFromPull(userId) {
    delete this._users[userId];
  }

  addUser(userConnection) {
    let newUserId = userConnection._id;

    if(!(Object.keys(userConnection) && Object.keys(userConnection).length)) {
      throw new Error('no connection provided');
    }

    if(this._getUserListFromPull()[newUserId]) {
      throw new Error('user already exist');
    }

    this._addUserToPull(newUserId, userConnection);
  }

  deleteUser(userConnection) {
    let userId = userConnection._id;

    if(!userId) {
      throw new Error('no connection provided');
    }

    this._deleteUserFromPull(userId);
  }

  getUsers() {
    return this._getUserListFromPull();
  }
  
  countUsers() {
    return Object.keys(this._getUserListFromPull()).length;
  }
};