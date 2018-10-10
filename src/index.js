const async = require("async");
const process = require("process");
const context = require("./util/context.js");
const getAllTest = require("./util/getAllTest.js");
const config = require(process.argv[2] === undefined ? "./config.js" : process.argv[2]);

/*
  simple tool that just use build-in function & async.js for test
*/

config.startFunction();

let allTest = getAllTest(config);

console.log("----------------------------------------");
console.log("◉　Test Start：");

async.waterfall(allTest, function() {
    console.log("----------------------------------------");
    console.log("◉　Report：" + context.pass + "／" + allTest.length);
    console.log("----------------------------------------");
    config.endFunction();
});
