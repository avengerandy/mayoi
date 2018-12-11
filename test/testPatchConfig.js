const assert = require("assert");
const patchConfig = require("../src/patchConfig.js");

let defaultConfig = patchConfig();

let intermediateConfig = patchConfig({
    ignore: [],
    printPass: false
});

let completeConfig = patchConfig({
    root: "src",
    ignore: ["index.js"],
    printPass: true,
    custom: "customConfig"
});

assert.deepEqual({
    "root": "test",
    "ignore": [
        "index.js", 
        "config.js"
    ],
    "printPass": true
}, defaultConfig);

assert.deepEqual({
    "root": "test",
    "ignore": [],
    "printPass": false
}, intermediateConfig);

assert.deepEqual({
    root: "src",
    ignore: ["index.js"],
    printPass: true,
    custom: "customConfig"
}, completeConfig);
