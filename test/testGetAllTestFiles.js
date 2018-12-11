const assert = require("assert");
const process = require("process");
const path = require("path");
const patchConfig = require("../src/patchConfig.js");
const getAllTestFiles = require("../src/getAllTestFiles.js");

let intermediateConfig = patchConfig({
    root: "exampleTest",
    ignore: ["testAsynchronous.js"]
});

let testPath = path.join(process.cwd(), intermediateConfig.root);

assert.deepEqual([
    path.join(testPath, "testSynchronous.js")
], getAllTestFiles(intermediateConfig));
