const context = require("./Context.js");
const runIfFunction = require("./runIfFunction.js");

module.exports = function (fun, sourceName, sourceFile, printPass) {
    return async function () {
        if (sourceName != context.sourceName) {
            await runIfFunction(sourceFile.start);
            console.log("----------------------------------------");
            console.log(context.count + ". test " + sourceName);
            context.sourceName = sourceName;
            context.count++;
            context.subCount = 1;
        }
        await runIfFunction(sourceFile.startEach);
        try {
            await fun();
            if (printPass) console.log("╠ " + context.subCount + "." + fun.name + "\t=> pass");
            context.pass++;
        } catch (error) {
            console.log("╠ " + "." + fun.name + "\t=> fail");
            console.log("║　　" + "error message：" + error.message);
            for (var i in error) {
                console.log("║　  ┝　" + i + "：" + error[i]);
            }
        }
        await runIfFunction(sourceFile.endEach);
        context.subCount++;
        context.nowCount++;
        if (context.nowCount == context.allTsetCount) {
            await runIfFunction(sourceFile.end);
        }
    }
}