const path = require('path');
const runIfFunction = require('./runIfFunction.js');
const runTestFile = require('./runTestFile.js');
const eachSeries = require('./eachSeries.js');

module.exports = async function runTest (testFiles, config, count) {
    await eachSeries(testFiles, async function (testFilePath) {
        count.fileTestCount++;
        const testFile = require(testFilePath);
        console.log('----------------------------------------');
        console.log(count.fileTestCount + '. test ' + path.basename(testFilePath));
        console.log('----------------------------------------');
        await runIfFunction(testFile.startFunction);
        count.subTestCount = 0;
        await runTestFile(testFile, config, count);
    });
};
