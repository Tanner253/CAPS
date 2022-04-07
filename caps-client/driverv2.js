'use strict';

const VendorClient = require('./lib/VendorClient/index.js');
const DriverClient = require('./lib/VendorClient/index.js');

const VendorQueue = new VendorClient('vendor');
const DriverQueue = new DriverClient('driver');

VendorQueue.publish('CATCH-UP-VENDOR-MESSAGES', (payload));

//listening to vendor 
DriverQueue.subscribe('DRIVER-IN-TRANSIT', (payload) => {
  DriverQueue.publish('PICKED-UP-BY-DRIVER', payload);
});

VendorQueue.subscribe('PICKED-UP-BY-DRIVER', (payload) => {
  VendorQueue.publish('DELIVERED', payload);
});

