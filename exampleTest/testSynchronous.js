const assert = require("assert");

let color = {
    cyan: "\x1b[36m%s\x1b[0m", 
    green: "\x1b[36m%s\x1b[32m"
}

module.exports.startEach = function() {
    console.log(color.green, "run mock testStartEachFunction");
}
module.exports.startFunction = function() {
    console.log(color.cyan, "run mock testFileStartFunction");
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
    console.log(color.cyan, "run mock testFileEndFunction");
}
module.exports.endEach = function() {
    console.log(color.green, "run mock testEndEachFunction");
}
