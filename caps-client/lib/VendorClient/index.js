'use strict';
const { io } = require('socket.io-client');
const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:3000/caps'


class VendorClient {
  constructor(queueId){
    this.queueId = queueId;
    this.socket = io(SOCKET_URL);
    this.socket.emit('join', { queueId });
    this.socket.on('join', (id) => {
      console.log('Joined Vendor Queue :: ', id);
    });
  }

  publish(event, payload){
    //automatically attatch id to payload that will be publisherd
    this.socket.emit(event, { queueId: this.queueId, ...payload });
  }

  subscribe(event, cb){
    this.socket.on(event, cb);
  }
}

module.exports = VendorClient;