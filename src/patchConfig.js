const defaultConfig = {
    root: 'test',
    ignore: [
        'index.js',
        'config.js'
    ],
    printPass: true
};

module.exports = function (config) {
    return { ...defaultConfig, ...config };
};
