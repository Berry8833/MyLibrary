var requestUrl = 'https://api.github.com/repos/twitter/chill/issues?per_page=5';
fetch(requestUrl)
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log('Github Repo Issues \k--------');
    for (var k = 0; k < data.length; k++) {
        console.log(data[k].url);
        console.log(data[k].user.login);
    }
});