let mockMap = new Map();

module.exports = {
    mock: function (realFunction, fakeFunction) {
        mockMap.set(fakeFunction, realFunction);
        return fakeFunction;
    },
    unmock: function (fakeFunction) {
        let realFunction = mockMap.get(fakeFunction);
        mockMap.delete(fakeFunction);
        return realFunction;
    }
}
