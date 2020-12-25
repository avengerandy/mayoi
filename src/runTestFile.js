const runIfFunction = require('./runIfFunction.js');
const printError = require('./printError.js');
const eachSeries = require('./eachSeries.js');

module.exports = async function runTestFile (testFile, config, count) {
    let testCounter = 0;
    await eachSeries(testFile.tests, async function (test) {
        testCounter++;
        await runIfFunction(testFile.startEach);
        try {
            await runIfFunction(test);
            count.allPassTestCounter++;
            if (config.printPass) {
                console.log(`${testCounter}.${test.name}: pass`);
            }
        } catch (error) {
            console.log(`${testCounter}.${test.name}: fail`);
            printError(error);
        } finally {
            await runIfFunction(testFile.endEach);
        }
    });
    count.allTestCounter += testCounter;
};
