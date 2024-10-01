var titleCase = function(str) {
    var result = [];
  
    var words = str.split(' ');
  
    for (var u = 0; u < words.length; u++) {
      var word = words[u].split('');
  
      word[0] = word[0].toUpperCase();
  
      result.push(word.join(''));
    }
  
    return result.join(' ');
};

var expect = chai.expect;

describe('titleCase', function() {
  it('should return `The Quick Brown Fox Jumped Over The Lazy Dog` when given `the quick brown fox jumped over the lazy dog`', function() {
    var str = 'the quick brown fox jumped over the lazy dog';

    var result = titleCase(str);

    expect(result).to.eql('The Quick Brown Fox Jumped Over The Lazy Dog');
  });

  it('should return `A Christmas Carol` when given `a christmas carol`', function() {
    var str = 'a christmas carol';

    var result = titleCase(str);

    expect(result).to.eql('A Christmas Carol');
  });
});

  