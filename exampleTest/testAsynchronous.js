const assert = require('assert');

module.exports.tests = [
    async function test1 () {
        const asyncFuncrion = new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve('Promise1');
            }, 1000);
        });
        assert.strictEqual('Promise1', await asyncFuncrion);
    },
    async function test2 () {
        const asyncFuncrion = new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(2);
            }, 500);
        });
        assert.strictEqual(1, await asyncFuncrion);
    }
];
