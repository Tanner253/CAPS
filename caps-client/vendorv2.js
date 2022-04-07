'use strict';

const VendorClient = require('./lib/VendorClient/index.js');
const chance = require('./chance.js')
const VendorQueue = new VendorClient('vendor');


  const payload = {
    time: new Date,
    store: 'ShakenBake',
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  }



//sending to listners
VendorQueue.publish('PICK-UP-READY', {packageId: payload.orderId, text: 'SUPER SOAKER 3000', ...payload});
VendorQueue.subscribe('PICK-UP-READY', VendorQueue.publish('DRIVER-IN-TRANSIT', {packageId: payload.packageId}));
VendorQueue.subscribe('DELIVERED', );