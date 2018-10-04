const server = require("../src/server.js");

module.exports = {
    "root": "test",
    "ignore": [
        "index.js", 
        "config.js"
    ],
    "printPass": true,
    "startFunction": function() {
        server.start();
    },
    "endFunction": function() {
        server.end();
    }
}