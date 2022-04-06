'use strict';

const eventPool = require('./eventPool.js');
const chance = require('./chance.js');

const vendorHandler = require('./client/vendor/index.js');
const driverHandler = require('./client/driver/index.js');
const deliveryHandler = require('./client/delivery/index.js');

eventPool.on('PICK-UP', vendorHandler);
eventPool.on('IN-TRANSIT', driverHandler);
eventPool.on('DELIVERY', deliveryHandler);

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
  eventPool.emit('PICK-UP', {PAYLOAD: payload})
}, 3000);

//logger methods
eventPool.on('PICKUP', (payload) => {
  logEvent('PICKUP', payload);
});
eventPool.on('TRANSIT', (payload) => {
  logEvent('TRANSIT', payload);
});
eventPool.on('DELIVERED', (payload) => {
  logEvent('DELIVERED', payload);
});

function logEvent(event, payload) {
  let time = Date.now();
  console.log('CAPS MAIN LOGGER ::', event, payload, time);
}
