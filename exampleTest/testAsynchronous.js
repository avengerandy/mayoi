const assert = require('assert');

module.exports.tests = [
    async function test_1() {
        let asyncFuncrion = new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve("Promise1");
            }, 1000);
        });
        assert.equal("Promise1", await asyncFuncrion);
    },
    async function test_2() {
        let asyncFuncrion = new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve("Promise2");
            }, 500);
        });
        assert.equal("Promise2", await asyncFuncrion);
    }
]
