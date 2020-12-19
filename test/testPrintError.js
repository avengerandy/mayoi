const assert = require('assert');
const printError = require('../src/printError.js');
const Mock = require('../src/Mock.js');

const errorInstanceList = [];

console.error = Mock.mock(console.error, function (error) {
    errorInstanceList.push(error);
});

try {
    assert.strictEqual(1, 2);
} catch (error) {
    printError(error);
    assert.strictEqual(errorInstanceList.length, 1);
    assert.strictEqual(errorInstanceList[0], error);
}

console.error = Mock.unmock(console.error);
