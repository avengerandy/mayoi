const assert = require("assert");
const printError = require("../src/printError.js");
const Mock = require("../src/Mock.js");

let errorCache = "";

console.log = Mock.mock(console.log, (log) => errorCache += `${log}\n`);

try {
    assert.equal(1, 2);
} catch (error) {
    printError(error);  
}

assert.equal(
    "║　　error message：1 == 2\n" + 
    "║　  ┝　generatedMessage：true\n" + 
    "║　  ┝　name：AssertionError [ERR_ASSERTION]\n" + 
    "║　  ┝　code：ERR_ASSERTION\n" + 
    "║　  ┝　actual：1\n" + 
    "║　  ┝　expected：2\n" + 
    "║　  ┝　operator：==\n"
, errorCache);

console.log = Mock.unmock(console.log);
