'use strict';

const Queue = require("./")

describe("testing queue storage", () => {
  test('Queue can store', () => { 
    let queue = new Queue();
    queue.store('test', {name: "whastgooood"});
    expect(queue.data['test']).toEqual({name: "whastgooood"})
  })    
})