module.exports = async function (fun) {
    if (typeof fun === 'function') return await fun();
    return Promise.resolve();
};
