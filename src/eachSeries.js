module.exports = async function (items, callback) {
    for (const item of items) {
        await callback(item);
    }
};
