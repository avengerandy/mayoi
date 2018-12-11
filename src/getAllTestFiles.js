const fs = require("fs");
const path = require("path");
const process = require("process");

module.exports = function (config) {
    let testPath = path.join(process.cwd(), config.root);
    return fs.readdirSync(testPath).filter(
        sourceName => !config.ignore.includes(sourceName)
    ).map(
        sourceName => path.join(testPath, sourceName)
    ).filter(
        source => fs.lstatSync(source).isFile()
    );
}