const path = require('path');
const runIfFunction = require('./runIfFunction.js');
const runTestFile = require('./runTestFile.js');
const eachSeries = require('./eachSeries.js');

module.exports = async function runTest (testFiles, config, count) {
    let testFileCounter = 0;
    await eachSeries(testFiles, async function (testFilePath) {
        testFileCounter++;
        const testFile = require(testFilePath);
        console.group(testFileCounter + '. test ' + path.basename(testFilePath));
        await runIfFunction(testFile.startFunction);
        await runTestFile(testFile, config, count);
        await runIfFunction(testFile.endFunction);
        console.groupEnd();
    });
};
