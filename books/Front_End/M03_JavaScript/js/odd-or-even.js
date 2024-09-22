var oddOrEven = function(num) {
    if (num%2 == 0){
        console.log("Even");
    }else{
        console.log("odd");
    }
}

var oddOrEven = function(num) {
    if (num%2 === 0){
        return("Even");
    }else{
        return("odd");
    }
}

var expect = chai.expect;

describe("oddOrEven", function() {
    it('should return the string "odd" if a number IS NOT evenly divisible by 2', function() {
        var num = 777;
        var result = oddOrEven(num);
        expect(result).to.eql("odd");
    });
    it('should return the string "even" if a number IS evenly divisible by 2', function() {
        var num = 1002;
        var result = oddOrEven(num);
        expect(result).to.eql("Even");
    });
});