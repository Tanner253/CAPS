'use strict';
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/caps');

const chance = require('./chance.js');

const handleReceived = require('./client/delivery/index.js');
const vendorCB = require('./client/vendor/index.js');
const vendorCBCopy = vendorCB(socket);

socket.on('PICK-UP', vendorCBCopy);
socket.on('DELIVERED', handleReceived);

function payloadCreation () {
  const payload = {
    time: new Date,
    store: 'ShakenBake',
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  }
  return payload;
}

setInterval(() => {
  let payload = payloadCreation();
  socket.emit('PICK-UP', {PAYLOAD: payload});
}, 3000);
