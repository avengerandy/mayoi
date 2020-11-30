const assert = require('assert');
const test = require('../src/index.js');
const Mock = require('../src/Mock.js');

let errorCache = '';

console.log = Mock.mock(console.log, function (log) {
    errorCache += `${log}\n`;
});

test.run({
    root: 'exampleTest',
    startFunction: () => console.log('\trun initStartFunction'),
    endFunction: () => console.log('\trun finalEndFunction')
});

setTimeout(() => {
    assert.strictEqual(`\trun initStartFunction
----------------------------------------
1. test testAsynchronous.js
----------------------------------------
╠ 1.test1\t=> pass
╠ 2.test2\t=> fail
║    error message：Expected values to be strictly equal:

1 !== 2

║    ┝  generatedMessage：true
║    ┝  code：ERR_ASSERTION
║    ┝  actual：1
║    ┝  expected：2
║    ┝  operator：strictEqual
----------------------------------------
2. test testSynchronous.js
----------------------------------------
run mock testFileStartFunction
run mock testStartEachFunction
╠ 1.test1\t=> pass
run mock testEndEachFunction
run mock testStartEachFunction
╠ 2.test2\t=> pass
run mock testEndEachFunction
run mock testFileEndFunction
----------------------------------------
◉  Report：3／4
----------------------------------------
\trun finalEndFunction
`, errorCache);

    console.log = Mock.unmock(console.log);
}, 2000);
