module.exports = async function (fun) {
    if (typeof fun === "function") await fun();
}