module.exports = function (error) {
    console.log(`║    error message：${error.message}`);
    for (const i in error) console.log(`║    ┝  ${i}：${error[i]}`);
};
