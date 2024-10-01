// Initial variables to keep track of quiz progress
let currentQuestion = 0;
let timeLeft = 25;
let timer;
let score = 0;

// Example questions array
let questions = [
    {
        "question": "What is the purpose of the `oddOrEven` function?",
        "options": [
            "To calculate the square of a number.",
            "To check if a number is divisible by 3.",
            "To determine if a number is odd or even.",
            "To find the maximum of two numbers."
        ],
        "answer": "To determine if a number is odd or even."
    },
    {
        "question": "What does the `oddOrEven` function return when passed an odd number?",
        "options": [
            "'Even'",
            "'Odd'",
            "The number itself.",
            "An error."
        ],
        "answer": "'Odd'"
    },
    {
        "question": "Which method from the `chai` library is used for testing in this code?",
        "options": [
            "assert",
            "should",
            "expect",
            "equal"
        ],
        "answer": "expect"
    },
    {
        "question": "In the first test, what number is passed to the `oddOrEven` function?",
        "options": [
            "1002",
            "777",
            "1000",
            "4321"
        ],
        "answer": "777"
    },
    {
        "question": "What result is expected from the first test when passing the number 777?",
        "options": [
            "'Even'",
            "'Odd'",
            "null",
            "undefined"
        ],
        "answer": "'odd'"
    },
    {
        "question": "What will be returned by the `oddOrEven` function when passed the number 1002?",
        "options": [
            "'Odd'",
            "'Even'",
            "null",
            "undefined"
        ],
        "answer": "'Even'"
    },
    {
        "question": "What type of testing framework is used in this code?",
        "options": [
            "Jasmine",
            "Jest",
            "Mocha",
            "Cypress"
        ],
        "answer": "Mocha"
    },
    {
        "question": "What type of assertion does the test use from the `chai` library?",
        "options": [
            "to.equal",
            "to.eql",
            "to.deepEqual",
            "to.be.true"
        ],
        "answer": "to.eql"
    },
    {
        "question": "What is the expected output of the second test case when the number 1002 is passed?",
        "options": [
            "'Odd'",
            "'Even'",
            "'Error'",
            "'Invalid input'"
        ],
        "answer": "'Even'"
    },
    {
        "question": "What value is compared in the second test case for the number 1002?",
        "options": [
            "'Odd' and 'Even'",
            "1002 and 'Even'",
            "Result and 'Even'",
            "'True' and 'False'"
        ],
        "answer": "Result and 'Even'"
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
