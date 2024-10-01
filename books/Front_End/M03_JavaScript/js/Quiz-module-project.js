// Initial variables to keep track of quiz progress
let currentQuestion = 0;
let timeLeft = 25;
let timer;
let score = 0;

// Example questions array
let questions = [
    {
        "question": "What happens when the 'Play' button is clicked?",
        "options": [
            "The game resets.",
            "One player is randomly selected to rest, and the others compete.",
            "The game ends.",
            "All players compete at the same time."
        ],
        "answer": "One player is randomly selected to rest, and the others compete."
    },
    {
        "question": "What is the maximum number of points a player needs to win the game?",
        "options": [
            "10",
            "15",
            "20",
            "25"
        ],
        "answer": "20"
    },
    {
        "question": "Which function is responsible for randomly selecting the resting player?",
        "options": [
            "playGame()",
            "capitalize()",
            "checkWinner()",
            "disableGame()"
        ],
        "answer": "playGame()"
    },
    {
        "question": "What happens when a player reaches 20 points?",
        "options": [
            "The game continues.",
            "The winner is announced, and the game is disabled.",
            "The points reset to zero.",
            "A new player joins the game."
        ],
        "answer": "The winner is announced, and the game is disabled."
    },
    {
        "question": "What does the function capitalize() do in this code?",
        "options": [
            "It capitalizes all letters in a string.",
            "It capitalizes the first letter of a string.",
            "It converts a number to a string.",
            "It adds points to a player's score."
        ],
        "answer": "It capitalizes the first letter of a string."
    },
    {
        "question": "Where is the score of each player displayed?",
        "options": [
            "In the marquee section.",
            "Inside the tennis court.",
            "In the individual player sections (susu, nunu, pupu).",
            "Inside the goal holes."
        ],
        "answer": "In the individual player sections (susu, nunu, pupu)."
    },
    {
        "question": "What happens if the 'Play' button is clicked after one player wins?",
        "options": [
            "The game resets automatically.",
            "The game continues with the same players.",
            "The button is disabled and says 'Game Over.'",
            "The winner’s points reset."
        ],
        "answer": "The button is disabled and says 'Game Over.'"
    },
    {
        "question": "How does the game decide who wins a point during each round?",
        "options": [
            "The player with the highest score always wins.",
            "A random player from the competing players is selected to win the point.",
            "The resting player always wins the point.",
            "Points are awarded in turn."
        ],
        "answer": "A random player from the competing players is selected to win the point."
    },
    {
        "question": "What content is displayed in the marquee section?",
        "options": [
            "The score of the players.",
            "A welcome message and player descriptions.",
            "The name of the player who is resting.",
            "The final result of the game."
        ],
        "answer": "A welcome message and player descriptions."
    },
    {
        "question": "Which CSS class is responsible for styling the goal holes?",
        "options": [
            ".player-side",
            ".tennis-court",
            ".goal-hole",
            ".game-container"
        ],
        "answer": ".goal-hole"
    }
];

// Function to start the quiz
function startQuiz() {
  const username = document.getElementById("username").value;
  if (username.trim() === "") {
    alert("Please enter your name.");
    return;
  }

  // Hide the start screen and show the quiz screen
  document.getElementById("start-container").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";

  // Shuffle the questions to randomize the quiz
  questions = shuffleArray(questions);

  // Display the first question
  displayQuestion();

  // Start the timer
  startTimer();
}

// Function to display a question and its options
function displayQuestion() {
  const questionContainer = document.getElementById("question");

  // Get the current question and its options
  const questionText = questions[currentQuestion].question;
  const options = questions[currentQuestion].options;

  // Create the HTML for the question and options
  const questionHtml = `
        <div class="question-number">Question ${currentQuestion + 1}:</div>
        <div class="question-text">${questionText}</div>
        <div class="options">
            ${options.map((option) => createOption(option)).join("")}
        </div>
    `;

  // Set the HTML inside the question container
  questionContainer.innerHTML = questionHtml;

  // Show the "Next" button after the question is displayed
  document.getElementById("next-question").style.display = "block";
}

// Function to create the HTML for an option
function createOption(option) {
  return `
        <div class="option">
            <input type="radio" name="answer" value="${option}"> ${option}
        </div>`;
}

// Function to start the countdown timer
function startTimer() {
  timer = setInterval(function () {
    if (timeLeft > 0) {
      timeLeft--;
      document.getElementById("time").textContent = timeLeft;
    } else {
      clearInterval(timer);
      document.getElementById("time").textContent = "Time's up!";
      disableOptions();
      setTimeout(nextQuestion, 2000);
    }
  }, 1000);
}

// Function to check the selected answer
function checkAnswer() {
  clearInterval(timer); // Stop the timer
  const selectedAnswer = document.querySelector('input[name="answer"]:checked'); //option was already created, but added checked there for this answer
  const feedback = document.getElementById("feedback");

  if (!selectedAnswer) {
    feedback.textContent = "Please select an answer!";
    return;
  }

  const answer = selectedAnswer.value;
  if (answer === questions[currentQuestion].answer) {
    score++;
    feedback.textContent = "Correct!";
  } else {
    feedback.textContent = `Incorrect. The correct answer is ${questions[currentQuestion].answer}.`;
  }

  disableOptions();
  setTimeout(nextQuestion, 1000); // Move to the next question after a short delay
}

// Function to disable all options (used after the answer is selected or time runs out)
function disableOptions() {
  document.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.disabled = true;
  });
}

// Function to move to the next question
function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    timeLeft = 25; // Reset the timer
    displayQuestion(); // Show the next question
    startTimer(); // Start the timer again
    document.getElementById("feedback").textContent = "";
  } else {
    showResult(); // Show the result if the quiz is finished
  }
}

// Function to show the final result
function showResult() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result-container").style.display = "block";

  const username = document.getElementById("username").value;
  const percentage = (score / questions.length) * 100;

  let resultText;
  if (percentage >= 50) {
    resultText = `<span class="pass">You Pass!</span>`;
  } else {
    resultText = `<span class="fail">You Fail!</span>`;
  }

  document.getElementById("result").innerHTML = `
        ${username}, you scored ${score} out of ${questions.length}!<br>${resultText}`;
}

// Function to restart the quiz
function testAgain() {
  currentQuestion = 0;
  timeLeft = 25;
  score = 0;
  questions = shuffleArray(questions);

  document.getElementById("result-container").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";

  displayQuestion();
  startTimer();
}

// Function to shuffle an array (used to randomize questions and options)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
