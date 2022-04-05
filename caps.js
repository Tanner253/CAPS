'use strict';

const eventPool = require("./lib/events.js");
const vendor = require('./lib/events.js');
const driver = require('./lib/events.js');


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
  let time = new Date.now();
  console.log(event, payload, time);
}
