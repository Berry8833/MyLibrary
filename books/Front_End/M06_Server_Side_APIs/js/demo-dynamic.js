var usersContainer = document.getElementById('users');
var fetchButton = document.getElementById('fetch-button');
function getApi() {
    var requestUrl = 'https://api.github.com/users?per_page=5';
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        for(var y = 0; y < data.length; y++) {
            var userName = document.createElement('h3');
            var userUrl = document.createElement('p');
            userName.textContent = data[y].login;
            userUrl.textContent = data[y].url;
            usersContainer.append(userName);
            usersContainer.append(userUrl);
        }
    })
};
fetchButton.addEventListener('click', getApi);