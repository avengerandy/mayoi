module.exports = {
    "root": "src",
    "ignore": [
        "index.js", 
        "config.js"
    ],
    "printPass": true,
    "startFunction": function() {
        console.log("startFunction");
    },
    "endFunction": function() {
        console.log("endFunction");
    }
}
