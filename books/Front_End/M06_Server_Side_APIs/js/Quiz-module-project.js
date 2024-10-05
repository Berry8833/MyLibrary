// Initial variables to keep track of quiz progress
let currentQuestion = 0;
let timeLeft = 25;
let timer;
let score = 0;

// Example questions array
let questions = [
    {
        "question": "What is the purpose of the `formSubmitHandler` function?",
        "options": [
            "It listens for form submissions and processes the GitHub username",
            "It clears the page content when the form is submitted",
            "It fetches repositories based on programming language",
            "It updates the text content of the repository container"
        ],
        "answer": "It listens for form submissions and processes the GitHub username"
    },
    {
        "question": "What does the `buttonClickHandler` function handle?",
        "options": [
            "Form submissions",
            "Button clicks to search repositories by programming language",
            "Displaying repository issues",
            "Displaying the username on the webpage"
        ],
        "answer": "Button clicks to search repositories by programming language"
    },
    {
        "question": "What is the purpose of the `getUserRepos` function?",
        "options": [
            "It sends a GET request to GitHub's API to retrieve repositories of a user",
            "It displays repository data on the webpage",
            "It sends a POST request to GitHub's API",
            "It updates the search term in the UI"
        ],
        "answer": "It sends a GET request to GitHub's API to retrieve repositories of a user"
    },
    {
        "question": "What API URL does the `getUserRepos` function use to get repositories of a specific user?",
        "options": [
            "'https://api.github.com/repos/' + user",
            "'https://api.github.com/users/' + user + '/repos'",
            "'https://api.github.com/search/repositories?q=' + user",
            "'https://github.com/' + user + '/repos'"
        ],
        "answer": "'https://api.github.com/users/' + user + '/repos'"
    },
    {
        "question": "How does the `getFeaturedRepos` function sort repositories?",
        "options": [
            "By the number of stars",
            "By the number of forks",
            "By the number of help-wanted issues",
            "By the number of contributors"
        ],
        "answer": "By the number of help-wanted issues"
    },
    {
        "question": "Which element's text content is updated by the `displayRepos` function to show the search term?",
        "options": [
            "nameInputEl",
            "repoSearchTerm",
            "repoContainerEl",
            "statusEl"
        ],
        "answer": "repoSearchTerm"
    },
    {
        "question": "What happens when there are no repositories found for the search term?",
        "options": [
            "A new search is initiated",
            "The page reloads",
            "'No repositories found.' is displayed in the repository container",
            "An error message is shown"
        ],
        "answer": "'No repositories found.' is displayed in the repository container"
    },
    {
        "question": "How does the `displayRepos` function format the repository name?",
        "options": [
            "By combining the repository name and description",
            "By combining the owner's login and repository name",
            "By combining the repository language and repository name",
            "By combining the owner's login and the number of forks"
        ],
        "answer": "By combining the owner's login and repository name"
    },
    {
        "question": "What happens if a repository has open issues?",
        "options": [
            "A red icon and the number of issues are displayed",
            "A green icon and 'No issues' are displayed",
            "A yellow warning is displayed",
            "Nothing happens"
        ],
        "answer": "A red icon and the number of issues are displayed"
    },
    {
        "question": "Which element is used to add event listeners for language buttons?",
        "options": [
            "repoContainerEl",
            "languageButtonsEl",
            "userFormEl",
            "repoSearchTerm"
        ],
        "answer": "languageButtonsEl"
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
