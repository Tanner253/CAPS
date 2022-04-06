'use strict';
module.exports = (socket) => (payload) => {
  console.log('PACKAGE PICKED UP ~ ', { DRIVER: payload.orderId});
  socket.emit('DELIVERED', payload)
}