const Mock = require('../src/Mock.js');
const patchConfig = require('./patchConfig.js');
const getAllTestFiles = require('./getAllTestFiles.js');
const runIfFunction = require('./runIfFunction.js');
const runTest = require('./runTest.js');

module.exports = {
    run: async function (config) {
        config = patchConfig(config);
        const testFiles = getAllTestFiles(config);
        const count = {
            allTestCounter: 0,
            allPassTestCounter: 0
        };

        await runIfFunction(config.startFunction);
        await runTest(testFiles, config, count);
        console.log('----------------------------------------');
        console.log('◉  Report：' + count.allPassTestCounter + '／' + count.allTestCounter);
        console.log('----------------------------------------');
        await runIfFunction(config.endFunction);
    },
    mock: Mock
};
