const runIfFunction = require('./runIfFunction.js');
const printError = require('./printError.js');
const eachSeries = require('./eachSeries.js');

module.exports = async function runTestFile (testFile, config, count) {
    await eachSeries(testFile.tests, async function (test) {
        count.subTestCount++;
        await runIfFunction(testFile.startEach);
        try {
            await runIfFunction(test);
            count.passTestCount++;
            if (config.printPass) {
                console.log(`${count.subTestCount}.${test.name}: pass`);
            }
        } catch (error) {
            console.log(`${count.subTestCount}.${test.name}: fail`);
            printError(error);
        } finally {
            await runIfFunction(testFile.endEach);
        }
    });
    count.allSubTestCount += count.subTestCount;
};
