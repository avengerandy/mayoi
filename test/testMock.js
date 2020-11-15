const assert = require('assert');
const Mock = require('../src/Mock.js');

let realFunction = () => 'real';
const fakeFunction = () => 'fake';

assert.strictEqual('real', realFunction());

realFunction = Mock.mock(realFunction, fakeFunction);
assert.strictEqual('fake', realFunction());

realFunction = Mock.unmock(realFunction);
assert.strictEqual('real', realFunction());
