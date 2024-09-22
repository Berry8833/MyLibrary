var logNums = function(num) {
    for (a = 1; a <= num; a = a + 1){
        console.log(a);
    }
}

var expect = chai.expect;

before(function() {
    window._temp = {};
    window._temp.log = console.log;
    window.console.log = (function(...args) {
        var values = [];

        var log = function(args) {
            values.push(args);
            window._temp.log(args);
        };

        log.calledWith = function() {
            return values;
        };

        return log;
    })();
});

describe("logNums", function() {
    it("log number 1 through `num`", function() {
        var num = 10;
        logNums(num);
        expect(console.log.calledWith()).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        delete window._temp;
    });
})