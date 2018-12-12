const test = require("./index.js");

test({
    root: "exampleTest",
    startFunction: () => console.log("initStartFunction"),
    endFunction: () => console.log("finalEndFunction")
});
