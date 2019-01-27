# Loli
> a tiny nodeJS unittest framework like true JS

## Screenshot
<p align="center">
    <img src = "https://raw.githubusercontent.com/avengerandy/mayoi/master/example.png" width="90%"/>
</p>

## Introduction
Loli is a small unittest framework that depend on only [**async**](http://caolan.github.io/async/). It just provide two compoment: 
* a function for search your test file and run it
* a Mock Object for mock & unmock function that your test depend on

## Installation
use npm install
``` bash
npm install mayoi
```

## Usage - setup

create folder for test file
``` bash
mkdir mayoiTest
touch mayoiTest/index.js
touch mayoiTest/testSynchronous.js
touch mayoiTest/testAsynchronous.js
```

index.js
``` js
const mayoi = require("mayoi");

mayoi.run({
    root: "mayoiTest",
    ignore: "index.js"
});
```

testSynchronous.js
``` js
const assert = require("assert");

module.exports.tests = [
    function test_1() {
        assert.equal("testString1", "testString2");
    },
    function test_2() {
        assert.equal(200, 200);
    }
];
```

testAsynchronous.js
``` js
const assert = require('assert');

module.exports.tests = [
    async function test_1() {
        let asyncFuncrion = new Promise(function (resolve, reject) {
            setTimeout(() => { resolve("Promise1"); }, 1000);
        });
        assert.equal("Promise1", await asyncFuncrion);
    },
    async function test_2() {
        let asyncFuncrion = new Promise(function (resolve, reject) {
            setTimeout(() => { resolve("Promise2"); }, 500);
        });
        assert.equal("Promise2", await asyncFuncrion);
    }
];
```

run test
``` bash
node mayoiTest/index.js
```

you can also add test script in package.json like
``` js
...
"scripts": {
    "test": "node mayoiTest/index.js"
},
...
```

then you will see
<p align="center">
    <img src = "https://raw.githubusercontent.com/avengerandy/mayoi/master/runTest.png" width="90%"/>
</p>

## Usage - hook function on test

## Usage - mock function & object

## Developer - Get Source Code

## Developer - Tests

## Developer - Architecture
