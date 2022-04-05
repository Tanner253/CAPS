'use strict';

const eventPool = require('./events.js');

eventPool.on('PICKUP', (payload) => {

  setInterval(() => {
    eventPool.emit('TRANSIT', payload);
    console.log(`DRIVER: Picked up order ${payload.orderID}:: `, payload);
  }, 1000);

  setInterval(() => {
    eventPool.emit('DELIVERED', payload);
    console.log(`DRIVER: Picked up order ${payload.orderID}:: `, payload);
  }, 3000);

})
