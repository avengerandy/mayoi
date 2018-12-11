const assert = require("assert");
const runIfFunction = require("../src/runIfFunction.js");

let realFunction = () => "real";
let fakeFunction = 5;

runIfFunction(realFunction).then((value) => {
    assert.equal("real", value);
}).catch((err) => {
    throw err
});

runIfFunction(fakeFunction).then((value) => {
    assert.equal(undefined, value);
}).catch((err) => {
    throw err
});
