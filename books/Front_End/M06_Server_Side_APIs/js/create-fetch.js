var repoList = document.querySelector('ul');
var fetchButton = document.getElementById('fetch-button');

function getApi() {
    var requestUrl = 'https://api.github.com/users/Berry8833/repos';
    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        for (var a = 0; a < data.length; a++) {
            var listItem = document.createElement('li');
            listItem.textContent = data[a].html_url;
            repoList.appendChild(listItem);
        }
    });
}
fetchButton.addEventListener('click', getApi);