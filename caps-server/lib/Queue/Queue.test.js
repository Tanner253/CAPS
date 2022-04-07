'use strict';

const Queue = require("./")

describe("testing queue storage", () => {
  let queue = new Queue();
  test('Queue can store', () => { 
    queue.store('test', {name: "whastgooood"});
    expect(queue.data['test']).toEqual({name: "whastgooood"})
  })    
  test('Queue can read', () => { 
    let data = queue.read('test');
    expect(data).toEqual({name: "whastgooood"})
  })    
  test('Queue can delete', () => { 
    queue.remove('test');
    expect(queue.data['test']).toBeFalsy();
  })    
})