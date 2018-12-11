const assert = require("assert");
const runIfFunction = require("../src/runIfFunction.js");

let realFunction = function () {
    return "real";
}

let fakeFunction = 5;

runIfFunction(realFunction).then((value) => {
    assert.equal("real", value);
}).catch((err) => {
    throw err
});

runIfFunction(fakeFunction).then((value) => {
    assert.equal("not a function", value);
}).catch((err) => {
    throw err
});
