let susuPoints = 0;
let nunuPoints = 0;
let pupuPoints = 0;
const maxPoints = 20;

document.getElementById('play-btn').addEventListener('click', playGame);

// Initialize the game state
updateCompetingPlayers();

function playGame() {
    // Define players
    let players = ['susu', 'nunu', 'pupu'];

    // Randomly select one player to sit out
    let sittingOutIndex = Math.floor(Math.random() * players.length);
    let sittingOut = players[sittingOutIndex];

    // Determine the competing players
    let competingPlayers = players.filter(player => player !== sittingOut);

    // Update the competing players display
    document.getElementById('player1').innerText = `Player 1: ${capitalize(competingPlayers[0])}`;
    document.getElementById('player2').innerText = `Player 2: ${capitalize(competingPlayers[1])}`;

    // Display the player who is not competing in the goal hole
    document.getElementById('resting-player').innerText = `${capitalize(sittingOut)} is resting`;

    // Randomly select one of the competing players to win the point
    let pointWinner = competingPlayers[Math.floor(Math.random() * competingPlayers.length)];

    // Update points based on the winner
    if (pointWinner === 'susu') {
        susuPoints += 1;
        document.getElementById('susu-points').innerText = susuPoints;
    } else if (pointWinner === 'nunu') {
        nunuPoints += 1;
        document.getElementById('nunu-points').innerText = nunuPoints;
    } else if (pointWinner === 'pupu') {
        pupuPoints += 1;
        document.getElementById('pupu-points').innerText = pupuPoints;
    }

    // Update marquee with the judge's announcement
    let announcement = `${capitalize(pointWinner)} has skillfully claimed the point! | ${capitalize(sittingOut)} can only watch and strategize!`;
    document.getElementById('announcement-marquee').innerText = announcement;

    // Check for game winner
    checkWinner();
}

function checkWinner() {
    let messageElement = document.getElementById('message');

    if (susuPoints >= maxPoints) {
        messageElement.innerText = "SuSu & Robot win the game!";
        disableGame();
    } else if (nunuPoints >= maxPoints) {
        messageElement.innerText = "NuNu & Robot win the game!";
        disableGame();
    } else if (pupuPoints >= maxPoints) {
        messageElement.innerText = "Pupu & Robot win the game!";
        disableGame();
    }
}

function disableGame() {
    document.getElementById('play-btn').disabled = true;
    document.getElementById('play-btn').innerText = "Game Over";
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function updateCompetingPlayers() {
    // Initial display before any play
    document.getElementById('player1').innerText = "Player 1: ";
    document.getElementById('player2').innerText = "Player 2: ";
    document.getElementById('resting-player').innerText = "";
}
