const runIfFunction = require('./runIfFunction.js');
const printError = require('./printError.js');
const eachSeries = require('./eachSeries.js');

module.exports = async function runTestFile (testFile, config, count) {
    await eachSeries(testFile.tests, async function (test) {
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
    });
    await runIfFunction(testFile.endFunction);
    count.allSubTestCount += count.subTestCount;
};
