const assert = require('assert');
const patchConfig = require('../src/patchConfig.js');

const defaultConfig = patchConfig();
assert.deepStrictEqual({
    root: 'test',
    ignore: ['index.js', 'config.js'],
    printPass: true
}, defaultConfig);

const rootConfig = patchConfig({
    root: 'root'
});
assert.deepStrictEqual({
    root: 'root',
    ignore: ['index.js', 'config.js'],
    printPass: true
}, rootConfig);

const ignoreConfig = patchConfig({
    ignore: []
});
assert.deepStrictEqual({
    root: 'test',
    ignore: [],
    printPass: true
}, ignoreConfig);

const printPassConfig = patchConfig({
    printPass: false
});
assert.deepStrictEqual({
    root: 'test',
    ignore: ['index.js', 'config.js'],
    printPass: false
}, printPassConfig);

const completeConfig = patchConfig({
    root: 'root',
    ignore: ['ignore.js'],
    printPass: false,
    custom: 'someCustomConfig'
});
assert.deepStrictEqual({
    root: 'root',
    ignore: ['ignore.js'],
    printPass: false,
    custom: 'someCustomConfig'
}, completeConfig);
