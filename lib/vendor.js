'use strict';

const eventPool = require('./events.js');

setInterval(() => {
  let payload = {
    store: '1-206-flowers',
    orderID: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
    customer: 'Jamal Braun',
    address: 'Schmittfort, LA',
  };

  eventPool.emit('PICKUP', payload);
  console.log('vendor', payload);
}, 3000);
