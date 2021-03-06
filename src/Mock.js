module.exports = {
    mockMap: new Map(),
    mock: function (realFunction, fakeFunction) {
        this.mockMap.set(fakeFunction, realFunction);
        return fakeFunction;
    },
    unmock: function (fakeFunction) {
        const realFunction = this.mockMap.get(fakeFunction);
        this.mockMap.delete(fakeFunction);
        return realFunction;
    }
};
