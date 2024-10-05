// Initial variables to keep track of quiz progress
let currentQuestion = 0;
let timeLeft = 25;
let timer;
let score = 0;

// Example questions array
let questions = [
    {
        "question": "What is the purpose of the request made to the GitHub API in the provided code?",
        "options": [
            "To get repository information",
            "To get 5 GitHub issues from the 'twitter/chill' repository",
            "To fetch details about GitHub users",
            "To fetch repository commits"
        ],
        "answer": "To get 5 GitHub issues from the 'twitter/chill' repository"
    },
    {
        "question": "Which method is used to send the request to the GitHub API?",
        "options": [
            "post()",
            "put()",
            "fetch()",
            "get()"
        ],
        "answer": "fetch()"
    },
    {
        "question": "What is the URL of the GitHub API request in the provided code?",
        "options": [
            "'https://api.github.com/repos/berry8833/chill/issues?per_page=5'",
            "'https://api.github.com/repos/twitter/chill/issues?per_page=5'",
            "'https://api.github.com/issues?per_page=5'",
            "'https://api.github.com/repos/github/chill/issues?per_page=5'"
        ],
        "answer": "'https://api.github.com/repos/twitter/chill/issues?per_page=5'"
    },
    {
        "question": "What does the first `.then()` function do in the code?",
        "options": [
            "Logs the issues to the console",
            "Parses the JSON response into a JavaScript object",
            "Fetches the user details",
            "Logs the request URL"
        ],
        "answer": "Parses the JSON response into a JavaScript object"
    },
    {
        "question": "What are the two pieces of information logged to the console for each issue?",
        "options": [
            "Issue title and creation date",
            "Issue description and assigned user",
            "Issue URL and the user's login",
            "Issue number and the user's email"
        ],
        "answer": "Issue URL and the user's login"
    },
    {
        "question": "How many issues are fetched from the GitHub API in this request?",
        "options": [
            "3",
            "10",
            "7",
            "5"
        ],
        "answer": "5"
    },
    {
        "question": "What is logged to the console before the loop begins?",
        "options": [
            "'GitHub Repo Issues'",
            "'GitHub Repo Commits'",
            "'GitHub Repository Logs'",
            "'GitHub Issues List'"
        ],
        "answer": "'GitHub Repo Issues'"
    },
    {
        "question": "Which HTML section displays the instruction to open the console in the browser?",
        "options": [
            "header",
            "footer",
            "main",
            "section"
        ],
        "answer": "footer"
    },
    {
        "question": "What does the `for` loop do in the JavaScript code?",
        "options": [
            "It logs each issue's title to the console",
            "It iterates through the data array to log each issue's URL and user login",
            "It sends a new request for each issue in the repository",
            "It updates the webpage with the list of issues"
        ],
        "answer": "It iterates through the data array to log each issue's URL and user login"
    },
    {
        "question": "In which HTML element is the JavaScript file included in this project?",
        "options": [
            "The header element",
            "The section element",
            "The script element in the body",
            "The div element"
        ],
        "answer": "The script element in the body"
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
