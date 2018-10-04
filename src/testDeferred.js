const assert = require('assert');
const Deferred = require("../src/promiseTrigger/Deferred.js");

module.exports = [
    async function test_resolve() {
        let promiseTrigger = new Deferred();
        assert.equal("PENDING", promiseTrigger.getState());
        promiseTrigger.resolve("successMessage");
        assert.equal("FULFILLED", promiseTrigger.getState());
        assert.equal("successMessage", await promiseTrigger.getPromise());
    },
    async function test_reject(subCount) {
        let promiseTrigger = new Deferred();
        assert.equal("PENDING", promiseTrigger.getState());
        promiseTrigger.reject("rejectMessage");
        assert.equal("REJECTED", promiseTrigger.getState());
        try {
            await promiseTrigger.getPromise();
        } catch (rejectMessage) {
            assert.equal("rejectMessage", rejectMessage);
        }
    }
]
