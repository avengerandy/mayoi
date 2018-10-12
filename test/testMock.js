const assert = require("assert");
const Mock = require("../src/util/Mock.js");

let realFunction = function () {
    return "real";
}

let fakeFunction = function () {
    return "fake";
}

assert.equal("real", realFunction());

realFunction = Mock.mock(realFunction, fakeFunction);
assert.equal("fake", realFunction());

realFunction = Mock.unmock(realFunction);
assert.equal("real", realFunction());
