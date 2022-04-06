'use strict';


module.exports = (socket) => (payload) => {
  console.log('PACKAGE READY FOR PICKUP!', {VENDOR: payload});
  socket.emit('IN-TRANSIT', payload)
}