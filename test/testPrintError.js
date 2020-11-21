const assert = require('assert');
const printError = require('../src/printError.js');
const Mock = require('../src/Mock.js');

let errorCache = '';

console.log = Mock.mock(console.log, function (log) {
    errorCache += `${log}\n`;
});

try {
    assert.strictEqual(1, 2);
} catch (error) {
    printError(error);
}

assert.strictEqual(`║    error message：Expected values to be strictly equal:

1 !== 2

║    ┝  generatedMessage：true
║    ┝  code：ERR_ASSERTION
║    ┝  actual：1
║    ┝  expected：2
║    ┝  operator：strictEqual
`, errorCache);

console.log = Mock.unmock(console.log);
