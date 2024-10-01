// Initial variables to keep track of quiz progress
let currentQuestion = 0;
let timeLeft = 25;
let timer;
let score = 0;

// Example questions array
let questions = [
    {
        "question": "What is the purpose of the function `logNums`?",
        "options": [
            "To log numbers from 1 to a given number.",
            "To log only even numbers.",
            "To log numbers in reverse order.",
            "To log numbers with a delay."
        ],
        "answer": "To log numbers from 1 to a given number."
    },
    {
        "question": "What parameter does the `logNums` function take?",
        "options": [
            "String",
            "Array",
            "Object",
            "Number"
        ],
        "answer": "Number"
    },
    {
        "question": "What will happen if you call `logNums(5)`?",
        "options": [
            "It will log numbers from 1 to 5.",
            "It will log numbers from 0 to 5.",
            "It will log numbers from 1 to 6.",
            "It will log nothing."
        ],
        "answer": "It will log numbers from 1 to 5."
    },
    {
        "question": "Which testing framework is being used in this code?",
        "options": [
            "Jasmine",
            "Mocha",
            "Jest",
            "QUnit"
        ],
        "answer": "Mocha"
    },
    {
        "question": "What assertion library is used in conjunction with Mocha?",
        "options": [
            "Chai",
            "Jest",
            "Sinon",
            "Karma"
        ],
        "answer": "Chai"
    },
    {
        "question": "What is the expected output of the test case in the `describe` block?",
        "options": [
            "[1, 2, 3, 4, 5]",
            "[1, 2, 3, 4, 5, 6, 7, 8, 9]",
            "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]",
            "[0, 1, 2, 3, 4, 5]"
        ],
        "answer": "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
    },
    {
        "question": "What is the purpose of the `before` hook in this code?",
        "options": [
            "To run code after each test.",
            "To set up the testing environment.",
            "To clean up resources after tests.",
            "To run tests in parallel."
        ],
        "answer": "To set up the testing environment."
    },
    {
        "question": "How does the `console.log` function get overridden?",
        "options": [
            "By creating a new function.",
            "By directly modifying the console object.",
            "By using an external library.",
            "By calling the original console.log inside the new function."
        ],
        "answer": "By calling the original console.log inside the new function."
    },
    {
        "question": "What is stored in `window._temp.log`?",
        "options": [
            "The original console.log function.",
            "The result of the log function.",
            "The number of times console.log is called.",
            "A reference to the last logged message."
        ],
        "answer": "The original console.log function."
    },
    {
        "question": "What will happen if you delete `window._temp` after the test case?",
        "options": [
            "It will remove all logged messages.",
            "It will restore the original console.log.",
            "It will cause an error.",
            "It will not affect anything."
        ],
        "answer": "It will restore the original console.log."
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
