const path = require('path');
const runIfFunction = require('./runIfFunction.js');
const runTestFile = require('./runTestFile.js');
const eachSeries = require('./eachSeries.js');

module.exports = async function (testFiles, config, count) {
    await eachSeries(testFiles, async function (testFilePath) {
        const testFile = require(testFilePath);
        console.group(path.basename(testFilePath));
        await runIfFunction(testFile.startFunction);
        await runTestFile(testFile, config, count);
        await runIfFunction(testFile.endFunction);
        console.groupEnd();
        console.log();
    });
};
