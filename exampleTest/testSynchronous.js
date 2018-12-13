const assert = require("assert");

let cyan = "\x1b[36m%s\x1b[0m";

module.exports.startEach = function() {
    console.log("run mock testStartEachFunction");
}
module.exports.startFunction = function() {
    console.log(cyan, "run mock testFileStartFunction");
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
    console.log(cyan, "run mock testFileEndFunction");
}
module.exports.endEach = function() {
    console.log("run mock testEndEachFunction");
}
