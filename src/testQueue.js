const assert = require('assert');
const Queue = require("../src/dataStructure/Queue.js");

let queue = new Queue();

module.exports = [
    function test_push() {
        queue.push(1);
        queue.push('a');
        queue.push(5);
    },
    function test_getSizeAfterPush() {
        assert.equal(3, queue.getSize());
    },
    function test_getHead() {
        assert.equal(1, queue.getHead());
    },
    function test_getTail() {
        assert.equal(5, queue.getTail());
    },
    function test_pop() {
        assert.equal(1, queue.pop());
        assert.equal('a', queue.pop());
        assert.equal(5, queue.pop());
    },
    function test_getSizeAfterPop() {
        assert.equal(0, queue.getSize());
    }
]
