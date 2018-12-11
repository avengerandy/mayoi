module.exports = function (error) {
    console.log("║　　" + "error message：" + error.message);
    for (let i in error) console.log("║　  ┝　" + i + "：" + error[i]);
}