const assert = require('assert');
const test = require('../src/index.js');
const Mock = require('../src/Mock.js');

let errorCache = "";

console.log = Mock.mock(console.log, (log) => errorCache += `${log}\n`);

test.run({
    root: "exampleTest",
    startFunction: () => console.log("\trun initStartFunction"),
    endFunction: () => console.log("\trun finalEndFunction")
});

setTimeout(() => {
    assert.equal(
        '\trun initStartFunction\n' +
        '----------------------------------------\n' +
        '1. test testAsynchronous.js\n' +
        '----------------------------------------\n' +
        '╠ 1.test_1\t=> pass\n' +
        '╠ 2.test_2\t=> fail\n' +
        "║　　error message：'Promise2' == 'not Promise2'\n" +
        '║　  ┝　generatedMessage：true\n' +
        '║　  ┝　code：ERR_ASSERTION\n' +
        '║　  ┝　actual：Promise2\n' +
        '║　  ┝　expected：not Promise2\n' +
        '║　  ┝　operator：==\n' +
        '----------------------------------------\n' +
        '2. test testSynchronous.js\n' +
        '----------------------------------------\n' +
        'run mock testFileStartFunction\n' +
        'run mock testStartEachFunction\n' +
        '╠ 1.test_1\t=> pass\n' +
        'run mock testEndEachFunction\n' +
        'run mock testStartEachFunction\n' +
        '╠ 2.test_2\t=> pass\n' +
        'run mock testEndEachFunction\n' +
        'run mock testFileEndFunction\n' +
        '----------------------------------------\n' +
        '◉　Report：3／4\n' +
        '----------------------------------------\n' +
        '\trun finalEndFunction\n'
    , errorCache);

    console.log = Mock.unmock(console.log);
}, 2000);
