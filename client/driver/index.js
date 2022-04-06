'use strict';
module.exports = (socket) => (payload) => {
  console.log('PACKAGE PICKED UP', { DRIVER: payload});
  socket.emit('DELIVERED', payload)
}