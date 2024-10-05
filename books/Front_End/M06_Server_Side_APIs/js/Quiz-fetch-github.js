// Initial variables to keep track of quiz progress
let currentQuestion = 0;
let timeLeft = 25;
let timer;
let score = 0;

// Example questions array
let questions = [
    {
        "question": "What is the purpose of the `getUserRepos` function in the script?",
        "options": [
            "To fetch repositories from GitHub for a specific user",
            "To display featured repositories based on a programming language",
            "To alert users if a GitHub username is invalid",
            "To fetch GitHub issues related to repositories"
        ],
        "answer": "To fetch repositories from GitHub for a specific user"
    },
    {
        "question": "How does the `formSubmitHandler` function respond when a user submits a GitHub username?",
        "options": [
            "It calls the `getUserRepos` function and clears the input field",
            "It alerts the user to enter a valid username",
            "It directly displays repositories",
            "It reloads the page"
        ],
        "answer": "It calls the `getUserRepos` function and clears the input field"
    },
    {
        "question": "What API URL does the `getFeaturedRepos` function use to fetch repositories based on a programming language?",
        "options": [
            "https://api.github.com/search/repositories?q=language+is:featured",
            "https://api.github.com/users/language/repos",
            "https://api.github.com/search/repositories?q=language+featured+issues",
            "https://api.github.com/search/repositories?q=language+is:featured&sort=help-wanted-issues"
        ],
        "answer": "https://api.github.com/search/repositories?q=language+is:featured&sort=help-wanted-issues"
    },
    {
        "question": "What happens if a user enters a valid GitHub username but the API request fails to fetch data?",
        "options": [
            "An alert with 'Error: status text' is shown",
            "The page reloads",
            "The form input field turns red",
            "The script does nothing"
        ],
        "answer": "An alert with 'Error: status text' is shown"
    },
    {
        "question": "How does the script handle the situation when no repositories are found for a GitHub user or programming language?",
        "options": [
            "It shows 'No repositories found.' in the `repos-container` element",
            "It alerts the user",
            "It redirects the user to a different page",
            "It fetches more repositories from other users"
        ],
        "answer": "It shows 'No repositories found.' in the `repos-container` element"
    },
    {
        "question": "What element in the HTML is used to display the repositories found from the GitHub API?",
        "options": [
            "The `repos-container` div",
            "The `language-buttons` div",
            "The `user-form` element",
            "The `repo-search-term` span"
        ],
        "answer": "The `repos-container` div"
    },
    {
        "question": "What event listeners are added to the `userFormEl` and `languageButtonsEl` elements in the script?",
        "options": [
            "`submit` for `userFormEl` and `click` for `languageButtonsEl`",
            "`click` for both elements",
            "`mouseover` for both elements",
            "`keyup` for both elements"
        ],
        "answer": "`submit` for `userFormEl` and `click` for `languageButtonsEl`"
    },
    {
        "question": "How does the `displayRepos` function differentiate between repositories with open issues and those without?",
        "options": [
            "It adds an icon with a red 'x' for open issues and a green checkmark for no issues",
            "It changes the background color of repositories with open issues",
            "It hides repositories with no issues",
            "It alerts the user if a repository has open issues"
        ],
        "answer": "It adds an icon with a red 'x' for open issues and a green checkmark for no issues"
    },
    {
        "question": "What class is added to a repository list item when it is created in the `displayRepos` function?",
        "options": [
            "'list-item flex-row justify-space-between align-center'",
            "'repo-item flex-row justify-space-between'",
            "'repo-list-item'",
            "'list-group-item flex-column'"
        ],
        "answer": "'list-item flex-row justify-space-between align-center'"
    },
    {
        "question": "What does the `repoEl` element do when a repository is clicked, and how does it use the repository name?",
        "options": [
            "It redirects the user to a new page with detailed repository info",
            "It displays a modal with repository details",
            "It reloads the page",
            "It fetches more repositories from the same user"
        ],
        "answer": "It redirects the user to a new page with detailed repository info"
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
