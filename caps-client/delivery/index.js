'use strict';

module.exports = (payload) => {
  console.log('Thank you ~ DELIVERED ', {CUSTOMER: payload.orderId});
}