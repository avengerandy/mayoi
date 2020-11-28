const assert = require('assert');
const eachSeries = require('../src/eachSeries.js');

let temp = '';

eachSeries(['1', '2', '3'], async function (item) {
    await new Promise(function (resolve) {
        setImmediate(function () {
            temp += item;
            resolve();
        });
    });
}).then(
    () => assert.strictEqual('123', temp)
).catch(function (err) {
    throw err;
});
