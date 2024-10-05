// Initial variables to keep track of quiz progress
let currentQuestion = 0;
let timeLeft = 25;
let timer;
let score = 0;

// Example questions array
let questions = [
    {
        "question": "What does the `isPalindrome` function check for?",
        "options": [
            "It checks if a string contains only letters",
            "It checks if a string is a palindrome",
            "It checks if a string is an anagram",
            "It checks if a string has no spaces"
        ],
        "answer": "It checks if a string is a palindrome"
    },
    {
        "question": "How does the `isPalindrome` function reverse the input string?",
        "options": [
            "It uses the `split()`, `reverse()`, and `join()` methods",
            "It uses a loop to reverse the string",
            "It uses the `toUpperCase()` method to reverse the string",
            "It uses recursion to reverse the string"
        ],
        "answer": "It uses the `split()`, `reverse()`, and `join()` methods"
    },
    {
        "question": "What value is returned by the `isPalindrome` function if the reversed string matches the original?",
        "options": [
            "The function returns false",
            "The function returns undefined",
            "The function returns true",
            "The function returns null"
        ],
        "answer": "The function returns true"
    },
    {
        "question": "What is the purpose of the Mocha library in the provided HTML file?",
        "options": [
            "To handle animations on the webpage",
            "To run JavaScript test cases",
            "To make AJAX requests",
            "To style the webpage"
        ],
        "answer": "To run JavaScript test cases"
    },
    {
        "question": "Which testing framework is used along with Mocha to perform assertions in the tests?",
        "options": [
            "Jasmine",
            "QUnit",
            "Chai",
            "Karma"
        ],
        "answer": "Chai"
    },
    {
        "question": "What does the first test case in the `describe` block check?",
        "options": [
            "It checks if a string is an anagram",
            "It checks if a string is a palindrome",
            "It checks if a string contains only letters",
            "It checks if a string has spaces"
        ],
        "answer": "It checks if a string is a palindrome"
    },
    {
        "question": "In the test case where the string is 'radar', what is the expected output of the `isPalindrome` function?",
        "options": [
            "false",
            "true",
            "undefined",
            "null"
        ],
        "answer": "true"
    },
    {
        "question": "What is being tested in the second test case of the `describe` block?",
        "options": [
            "If the string is a palindrome",
            "If the string contains only letters",
            "If the string is not a palindrome",
            "If the string contains numbers"
        ],
        "answer": "If the string is not a palindrome"
    },
    {
        "question": "What is the result of calling `isPalindrome` with the string 'engage'?",
        "options": [
            "true",
            "false",
            "null",
            "undefined"
        ],
        "answer": "false"
    },
    {
        "question": "How is the `expect` function from Chai used in this test?",
        "options": [
            "It is used to run the test cases",
            "It is used to load external libraries",
            "It is used to assert that the result matches the expected outcome",
            "It is used to initialize variables"
        ],
        "answer": "It is used to assert that the result matches the expected outcome"
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
