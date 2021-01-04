const assert = require('assert');
const test = require('../src/index.js');
const Mock = require('../src/Mock.js');

const consoleCallHistory = [];
console.log = Mock.mock(console.log, function (log) {
    consoleCallHistory.push(log);
});
console.group = Mock.mock(console.group, function (label) {
    consoleCallHistory.push('group label = ' + label);
});
console.groupEnd = Mock.mock(console.groupEnd, function (label) {
    consoleCallHistory.push('groupEnd');
});

const errorInstanceList = [];
console.error = Mock.mock(console.error, function (error) {
    consoleCallHistory.push('error');
    errorInstanceList.push(error);
});

test.run({
    root: 'exampleTest',
    startFunction: () => console.log('\trun initStartFunction'),
    endFunction: () => console.log('\trun finalEndFunction')
});

setTimeout(() => {
    assert.deepStrictEqual([
        '\trun initStartFunction',
        'group label = testAsynchronous.js',
        '✔ test1',
        '✘ test2',
        'group label = undefined',
        'error',
        'groupEnd',
        'groupEnd',
        undefined,
        'group label = testSynchronous.js',
        'run mock testFileStartFunction',
        'run mock testStartEachFunction',
        '✔ test1',
        'run mock testEndEachFunction',
        'run mock testStartEachFunction',
        '✔ test2',
        'run mock testEndEachFunction',
        'run mock testFileEndFunction',
        'groupEnd',
        undefined,
        undefined,
        'report: 3 / 4 passing',
        '\trun finalEndFunction'
    ], consoleCallHistory);

    try {
        assert.strictEqual(1, 2);
    } catch (error) {
        assert.strictEqual(errorInstanceList.length, 1);
        assert.deepStrictEqual(errorInstanceList[0], error);
    }

    console.log = Mock.unmock(console.log);
    console.group = Mock.unmock(console.group);
    console.groupEnd = Mock.unmock(console.groupEnd);
    console.error = Mock.unmock(console.error);
}, 2000);
