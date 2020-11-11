const assert = require("assert");

module.exports.startEach = function() {
    console.log("run mock testStartEachFunction");
}
module.exports.startFunction = function() {
    console.log("run mock testFileStartFunction");
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
    console.log("run mock testFileEndFunction");
}
module.exports.endEach = function() {
    console.log("run mock testEndEachFunction");
}
