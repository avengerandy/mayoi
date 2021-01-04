const runIfFunction = require('./runIfFunction.js');
const printError = require('./printError.js');
const eachSeries = require('./eachSeries.js');

module.exports = async function runTestFile (testFile, config, count) {
    await eachSeries(testFile.tests, async function (test) {
        await runIfFunction(testFile.startEach);
        try {
            await runIfFunction(test);
            count.allPassTestCounter++;
            if (config.printPass) {
                console.log(`✔ ${test.name}`);
            }
        } catch (error) {
            console.log(`✘ ${test.name}`);
            console.group();
            printError(error);
            console.groupEnd();
        } finally {
            await runIfFunction(testFile.endEach);
        }
    });
    count.allTestCounter += testFile.tests.length;
};
