// Initial variables to keep track of quiz progress
let currentQuestion = 0;
let timeLeft = 25;
let timer;
let score = 0;

// Example questions array
let questions = [
    {
        "question": "What does the `logEvenNums` function do?",
        "options": ["Logs all even numbers up to `num`", "Logs all odd numbers up to `num`", "Logs only the number `num`", "Logs all numbers from 0 to `num`"],
        "answer": "Logs all even numbers up to `num`"
    },
    {
        "question": "What does the condition `i % 2 === 0` check in the `logEvenNums` function?",
        "options": ["If `i` is odd", "If `i` is even", "If `i` is greater than 0", "If `i` is a prime number"],
        "answer": "If `i` is even"
    },
    {
        "question": "Why is `window._temp` used in the `before` block?",
        "options": ["To store temporary data", "To store the original `console.log`", "To store the result of the function", "To manipulate the `for` loop"],
        "answer": "To store the original `console.log`"
    },
    {
        "question": "What is the purpose of modifying `console.log` in the `before` block?",
        "options": ["To count how many times `console.log` is called", "To capture the arguments passed to `console.log`", "To store the log results in a file", "To modify the numbers logged"],
        "answer": "To capture the arguments passed to `console.log`"
    },
    {
        "question": "In the test, what does `console.log.calledWith()` return?",
        "options": ["The numbers logged by the `logEvenNums` function", "An error message", "The original `console.log` function", "The number passed to `logEvenNums`"],
        "answer": "The numbers logged by the `logEvenNums` function"
    },
    {
        "question": "What numbers does the test case expect to be logged when `num = 13`?",
        "options": ["All numbers from 0 to 13", "Only odd numbers from 0 to 13", "Even numbers from 0 to 13", "Prime numbers from 0 to 13"],
        "answer": "Even numbers from 0 to 13"
    },
    {
        "question": "What is the purpose of the `after` block in this code?",
        "options": ["To delete the `logEvenNums` function", "To restore the original `console.log` function", "To store the test results", "To change the output format"],
        "answer": "To restore the original `console.log` function"
    },
    {
        "question": "Which libraries are being used for testing in this code?",
        "options": ["Mocha and Chai", "Jasmine and Chai", "Mocha and Jasmine", "Jest and Chai"],
        "answer": "Mocha and Chai"
    },
    {
        "question": "What does the `for` loop in the `logEvenNums` function do?",
        "options": ["It iterates from 0 to `num` and logs odd numbers", "It iterates from 0 to `num` and logs even numbers", "It iterates over only even numbers", "It starts from `num` and logs backwards"],
        "answer": "It iterates from 0 to `num` and logs even numbers"
    },
    {
        "question": "What happens if `num` is 0 in the `logEvenNums` function?",
        "options": ["It logs 0", "It logs nothing", "It logs an error", "It logs both 0 and 1"],
        "answer": "It logs 0"
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
