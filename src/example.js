const test = require("./index.js");

test.run({
    root: "exampleTest",
    startFunction: () => console.log("initStartFunction"),
    endFunction: () => console.log("finalEndFunction")
});
