'use strict';

const VendorClient = require('.');

const { io } = require('socket.io-client');

jest.mock('socket.io-client', () => {
  return {
    io: jest.fn(() => {
      return {
        on: jest.fn(),
        emit: jest.fn()
      };
    }),
  };
});

describe("testing the vendor client", () => {

  test('should call socket funcs on instantation', () => { 
    jest.clearAllMocks();
    let client = new VendorClient('test');

    expect(io).toHaveBeenCalledWith('http://localhost:3000/caps');
    expect(client.socket.emit).toHaveBeenCalledWith('join', { queueId: 'test' });
    expect(client.socket.on).toHaveBeenCalled();
  })

})