const assert = require("assert");
const Mock = require("../src/Mock.js");

let realFunction = () => "real";
let fakeFunction = () => "fake";

assert.equal("real", realFunction());

realFunction = Mock.mock(realFunction, fakeFunction);
assert.equal("fake", realFunction());

realFunction = Mock.unmock(realFunction);
assert.equal("real", realFunction());
