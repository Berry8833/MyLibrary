var sumArray = function(arr) {
    let sum = 0;
    for (var k = 0; k < arr.length; k++) {
        sum += arr[k];
    }
    return sum;
}
var arr = [3, 1, 5, 6];
console.log(sumArray(arr));

var expect = chai.expect;
describe("sumArray", function() {
    it("returns the total of all the numbers in `arr`", function() {
        var arr = [4, 8, 15, 16, 23, 42];
        var result = sumArray(arr);
        expect(result).to.eql(108);
    });
});