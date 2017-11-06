'use strict';

let currentId     = 1;
const SERVICE_ID  = 'Service';

module.exports = {
  generateId: () => {
    return currentId++;
  },

  getServiceId: () => {
    return SERVICE_ID;
  }
};