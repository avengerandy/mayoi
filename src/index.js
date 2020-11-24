const async = require('async');
const path = require('path');
const Mock = require('../src/Mock.js');
const patchConfig = require('./patchConfig.js');
const getAllTestFiles = require('./getAllTestFiles.js');
const runIfFunction = require('./runIfFunction.js');
const printError = require('../src/printError.js');

module.exports = {
    run: function (config) {
        config = patchConfig(config);
        const testFiles = getAllTestFiles(config);
        const count = {
            fileTestCount: 0,
            allSubTestCount: 0,
            subTestCount: 0,
            passTestCount: 0
        };

        function runTestFile (testFile) {
            return new Promise(function (resolve, reject) {
                async.eachSeries(testFile.tests, async function (test) {
                    count.subTestCount++;
                    try {
                        await runIfFunction(testFile.startEach);
                        await runIfFunction(test);
                        count.passTestCount++;
                        if (config.printPass) {
                            console.log(`╠ ${count.subTestCount}.${test.name}\t=> pass`);
                        }
                        await runIfFunction(testFile.endEach);
                    } catch (error) {
                        console.log(`╠ ${count.subTestCount}.${test.name}\t=> fail`);
                        printError(error);
                    }
                }, async function (error) {
                    if (error) reject(error);
                    await runIfFunction(testFile.endFunction);
                    count.allSubTestCount += count.subTestCount;
                    resolve();
                });
            });
        }

        function runTest () {
            return new Promise(function (resolve, reject) {
                async.eachSeries(testFiles, async function (testFilePath) {
                    count.fileTestCount++;
                    const testFile = require(testFilePath);
                    console.log('----------------------------------------');
                    console.log(count.fileTestCount + '. test ' + path.basename(testFilePath));
                    console.log('----------------------------------------');
                    await runIfFunction(testFile.startFunction);
                    count.subTestCount = 0;
                    await runTestFile(testFile);
                }, function (error) {
                    if (error) reject(error);
                    resolve();
                });
            });
        }

        async.eachSeries([
            async () => await runIfFunction(config.startFunction),
            async () => await runTest(),
            async function () {
                console.log('----------------------------------------');
                console.log('◉  Report：' + count.passTestCount + '／' + count.allSubTestCount);
                console.log('----------------------------------------');
                await runIfFunction(config.endFunction);
            }
        ], async function (func) {
            await func();
        });
    },
    mock: Mock
};
