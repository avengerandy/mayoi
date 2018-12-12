const async = require("async");
const patchConfig = require("./patchConfig.js");
const getAllTestFiles = require("./getAllTestFiles.js");
const runIfFunction = require("./runIfFunction.js");
const printError = require("../src/printError.js");

module.exports = function(config) {
    config = patchConfig(config);
    let testFiles = getAllTestFiles(config);

    function runTest() {
        return new Promise(function (resolve, reject) {
            async.eachSeries(testFiles, async function (testFilePath) {
                let testFile = require(testFilePath);
                await runIfFunction(testFile.startFunction);
                let subCount = 1;
                async.eachSeries(testFile.tests, async function (test) {
                    try {
                        await runIfFunction(testFile.startEach);
                        await runIfFunction(test);
                        if (config.printPass) {
                            console.log("╠ " + subCount++ + "." + test.name + "\t=> pass");
                        }
                        await runIfFunction(testFile.endEach);
                    } catch (error) {
                        console.log("╠ " + "." + test.name + "\t=> fail");
                        printError(error);
                    }
                }, async function (error) {
                    if (error) reject(error);
                    await runIfFunction(testFile.endFunction);
                });
            }, function (error) {
                if (error) reject(error);
                resolve();
            });
        });
    }
    
    async.waterfall([
        async () => await runIfFunction(config.startFunction),
        async () => await runTest(),
        async () => await runIfFunction(config.endFunction)
    ], (error) => {if (error) throw error});
}
