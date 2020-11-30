const Mock = require('../src/Mock.js');
const patchConfig = require('./patchConfig.js');
const eachSeries = require('./eachSeries.js');
const getAllTestFiles = require('./getAllTestFiles.js');
const runIfFunction = require('./runIfFunction.js');
const runTest = require('./runTest.js');

module.exports = {
    run: async function (config) {
        config = patchConfig(config);
        const testFiles = getAllTestFiles(config);
        const count = {
            fileTestCount: 0,
            allSubTestCount: 0,
            subTestCount: 0,
            passTestCount: 0
        };

        await eachSeries([
            async () => await runIfFunction(config.startFunction),
            async () => await runTest(testFiles, config, count),
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
