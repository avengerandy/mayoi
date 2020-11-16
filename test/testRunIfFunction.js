const assert = require('assert');
const runIfFunction = require('../src/runIfFunction.js');

const realFunction = () => 'real';
const fakeFunction = 5;

runIfFunction(realFunction).then((value) => {
    assert.strictEqual('real', value);
}).catch((err) => {
    throw err;
});

runIfFunction(fakeFunction).then((value) => {
    assert.strictEqual(undefined, value);
}).catch((err) => {
    throw err;
});
