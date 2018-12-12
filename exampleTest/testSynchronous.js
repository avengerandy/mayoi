const assert = require("assert");

module.exports.startEach = function() {
    console.log("startEach");
}
module.exports.startFunction = function() {
    console.log("start");
}
module.exports.tests = [
    function test_1() {
        assert.equal("test_1", "test_1");
    },
    function test_2() {
        assert.equal(200, 200);
    }
];
module.exports.endFunction = function() {
    console.log("end");
}
module.exports.endEach = function() {
    console.log("endEach");
}
