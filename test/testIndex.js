const assert = require('assert');
const test = require('../src/index.js');
const Mock = require('../src/Mock.js');

let logCache = '';
console.log = Mock.mock(console.log, function (log) {
    logCache += `${log}\n`;
});

const errorInstanceList = [];
console.error = Mock.mock(console.error, function (error) {
    errorInstanceList.push(error);
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
`, logCache);

    try {
        assert.strictEqual(1, 2);
    } catch (error) {
        assert.strictEqual(errorInstanceList.length, 1);
        assert.deepStrictEqual(errorInstanceList[0], error);
    }

    console.log = Mock.unmock(console.log);
    console.error = Mock.unmock(console.error);
}, 2000);
