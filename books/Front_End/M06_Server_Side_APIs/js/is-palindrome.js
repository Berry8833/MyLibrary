var isPalindrome = function(str) {
    var reversedString = str
    .split('')
    .reverse()
    .join('');

    if (reversedString === str) {
        return true;
    }
    else {
        return false;
    }
};

var expect = chai.expect;
describe('isPalindrome', function() {
    it('takes a string and returns true if the string is a palindrome', function() {
        var str = 'radar';

        var result = isPalindrome(str);
        
        expect(result).to.eql(true);
    });
    it('takes a string and returns false if the string is nor a palindrome', function() {
        var str = 'engage';

        var result = isPalindrome(str);

        expect(result).to.eql(false);
    });
});