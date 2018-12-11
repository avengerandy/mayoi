module.exports = function (config) {
    if (config === undefined) config = {};
    if (config.root === undefined) config.root = "test";
    if (config.ignore === undefined) config.ignore = [
        "index.js", 
        "config.js"
    ];
    if (config.printPass === undefined) config.printPass = true;
    return config;
}