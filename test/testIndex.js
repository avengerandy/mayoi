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
        'group label = 1. test testAsynchronous.js',
        '1.test1: pass',
        '2.test2: fail',
        'error',
        'groupEnd',
        'group label = 2. test testSynchronous.js',
        'run mock testFileStartFunction',
        'run mock testStartEachFunction',
        '1.test1: pass',
        'run mock testEndEachFunction',
        'run mock testStartEachFunction',
        '2.test2: pass',
        'run mock testEndEachFunction',
        'run mock testFileEndFunction',
        'groupEnd',
        '----------------------------------------',
        '◉  Report：3／4',
        '----------------------------------------',
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
