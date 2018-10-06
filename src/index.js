const fs = require("fs");
const path = require("path");
const async = require("async");
const process = require("process");
const config = require(process.argv[2] === undefined ? "./config.js" : process.argv[2]);

/*
  simple tool that just use build-in function & async.js for test
*/

//config.startFunction();

let allTest = [];

fs.readdirSync(config.root).filter(
    sourceName => !config.ignore.includes(sourceName)
).map(
    sourceName => path.join(config.root, sourceName)
).filter(
    source => fs.lstatSync(source).isFile()
).map(
    source => path.basename(source)
).forEach(sourceName => {
    require("./" + sourceName).forEach(sourceFunction => {
        allTest.push(testAbleDecorator(sourceFunction, sourceName));
    });
});

console.log("----------------------------------------");
console.log("◉　Test Start：");

let newStep = {
    pass: 0, 
    sourceName: "", 
    count: 1, 
    subCount: 1
}

async.waterfall(allTest, function() {
    console.log("----------------------------------------");
    console.log("◉　Report：" + newStep.pass + "／" + allTest.length);
    console.log("----------------------------------------");
    //config.endFunction();
});

function testAbleDecorator(fun, sourceName) {
    return async function () {
        if (sourceName != newStep.sourceName) {
            console.log("----------------------------------------");
            console.log(newStep.count + ". test " + sourceName);
            newStep.sourceName = sourceName;
            newStep.count++;
            newStep.subCount = 1;
        }
        try {
            await fun();
            if (config.printPass) console.log("╠ " + newStep.subCount + "." + fun.name + "\t=> pass");
            newStep.pass++;
        } catch (error) {
            console.log("╠ " + "." + fun.name + "\t=> fail");
            console.log("║　　" + "error message：" + error.message);
            for (var i in error) {
                console.log("║　  ┝　" + i + "：" + error[i]);
            }
        }
        newStep.subCount++;
    }
}
