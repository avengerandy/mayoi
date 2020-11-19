const assert = require('assert');
const path = require('path');

// mock fs & process module
const fakeCmd = 'fakeCwd';
const fakeRoot = 'fakeRoot';
const Module = require('module');
const originalRequire = Module.prototype.require;
Module.prototype.require = function (requestPath) {
    switch (requestPath) {
        case 'fs':
            return {
                readdirSync: () => ['fakeFile1', 'fakeFile2', 'fakeFolder'],
                lstatSync: function (filePath) {
                    return {
                        isFile: () => filePath !== path.join(fakeCmd, fakeRoot, 'fakeFolder')
                    };
                }
            };
        case 'process':
            return {
                cwd: () => fakeCmd
            };
    };
    return originalRequire.apply(this, arguments);
};
const getAllTestFiles = require('../src/getAllTestFiles.js');
Module.prototype.require = originalRequire;

const config = {
    root: fakeRoot,
    ignore: ['fakeFile1']
};
assert.deepStrictEqual([
    path.join(fakeCmd, fakeRoot, 'fakeFile2')
], getAllTestFiles(config));
