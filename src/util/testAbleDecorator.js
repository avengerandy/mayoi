const context = require("./context.js");
const runIfFunction = require("./runIfFunction.js");

module.exports = function (fun, sourceName, sourceFile, printPass) {
    return async function () {
        if (sourceName != context.sourceName) {
            await runIfFunction(context.nowFunction.end);
            await runIfFunction(sourceFile.start);
            console.log("----------------------------------------");
            console.log(context.count + ". test " + sourceName);
            context.nowFunction = fun;
            context.sourceName = sourceName;
            context.count++;
            context.subCount = 1;
        }
        try {
            await runIfFunction(sourceFile.startEach);
            await fun();
            if (printPass) console.log("╠ " + context.subCount + "." + fun.name + "\t=> pass");
            await runIfFunction(sourceFile.endEach);
            context.pass++;
        } catch (error) {
            console.log("╠ " + "." + fun.name + "\t=> fail");
            console.log("║　　" + "error message：" + error.message);
            for (var i in error) {
                console.log("║　  ┝　" + i + "：" + error[i]);
            }
        }
        context.subCount++;
    }
}