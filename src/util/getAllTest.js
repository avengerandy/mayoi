const fs = require("fs");
const path = require("path");
const process = require("process");
const testAbleDecorator = require("./testAbleDecorator.js")
const context = require("./Context.js")

module.exports = function (config) {
    let allTest = [];
    fs.readdirSync(config.root).filter(
        sourceName => !config.ignore.includes(sourceName)
    ).map(
        sourceName => path.join(config.root, sourceName)
    ).filter(
        source => fs.lstatSync(source).isFile()
    ).forEach(sourceName => {
        let sourceFile = require(path.join(process.cwd(), sourceName));
        context.allTsetCount += sourceFile.tests.length;
        sourceFile.tests.forEach(sourceFunction => {
            allTest.push(testAbleDecorator(sourceFunction, path.basename(sourceName), sourceFile, config.printPass));
        });
    });
    return allTest;
}