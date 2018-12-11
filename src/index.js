const async = require("async");
const patchConfig = require("../src/patchConfig.js");
const getAllTestFiles = require("../src/getAllTestFiles.js");

module.exports = function(config) {
    config = patchConfig(config);
    let testFiles = getAllTestFiles(config);
    async.eachSeries(testFiles, function (testFilePath) {
        let testFile = require(testFilePath);

    })
}

/*
simple tool that just use build-in function & async.js for test


config.startFunction();

let allTest = getAllTest(config);

console.log("----------------------------------------");
console.log("◉　Test Start：");

async.waterfall(allTest, function(err) {
    if (err) return console.log(err);
    console.log("----------------------------------------");
    console.log("◉　Report：" + context.pass + "／" + allTest.length);
    console.log("----------------------------------------");
    config.endFunction();
});
*/