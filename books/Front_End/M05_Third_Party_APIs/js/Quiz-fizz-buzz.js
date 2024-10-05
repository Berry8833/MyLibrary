// Initial variables to keep track of quiz progress
let currentQuestion = 0;
let timeLeft = 25;
let timer;
let score = 0;

// Example questions array
let questions = [
    {
        "question": "What does the Fizz Buzz function do when a number is divisible by both 3 and 5?",
        "options": ["It prints 'Fizz'", "It prints 'Buzz'", "It prints 'Fizz Buzz'", "It prints the number"],
        "answer": "It prints 'Fizz Buzz'"
    },
    {
        "question": "What does the mocha.setup('bdd') function do?",
        "options": ["Sets up Mocha for asynchronous tests", "Sets Mocha's interface to BDD", "Enables strict mode for the tests", "Configures Mocha to run automatically"],
        "answer": "Sets Mocha's interface to BDD"
    },
    {
        "question": "Which assertion library is being used in this test?",
        "options": ["Mocha", "Chai", "Jasmine", "QUnit"],
        "answer": "Chai"
    },
    {
        "question": "What is the purpose of the before() function in this test suite?",
        "options": ["To reset the console.log method", "To override console.log for capturing outputs", "To run tests before the script is loaded", "To add mock data before testing"],
        "answer": "To override console.log for capturing outputs"
    },
    {
        "question": "How does the test capture the console.log output?",
        "options": ["By using console.log directly", "By pushing logs to an array", "By using a spy method", "By writing the output to the DOM"],
        "answer": "By pushing logs to an array"
    },
    {
        "question": "What does console.log.calledWith() return?",
        "options": ["The actual logged values", "The expected output values", "The number of times console.log was called", "An array of function call arguments"],
        "answer": "An array of function call arguments"
    },
    {
        "question": "In the provided test case, what should the output be when the array element is divisible by 3?",
        "options": ["'Fizz'", "'Buzz'", "'Fizz Buzz'", "The number itself"],
        "answer": "'Fizz'"
    },
    {
        "question": "What value does the test expect when the Fizz Buzz function encounters the number 7?",
        "options": ["7", "'Fizz'", "'Buzz'", "'Fizz Buzz'"],
        "answer": "7"
    },
    {
        "question": "What value is expected to be logged for the number 10 in the array?",
        "options": ["'Fizz'", "'Buzz'", "'Fizz Buzz'", "10"],
        "answer": "'Buzz'"
    },
    {
        "question": "What happens after all tests are completed in the after() function?",
        "options": ["The original console.log is restored", "The test results are cleared", "The array of logged values is reset", "A final summary is printed to the console"],
        "answer": "The original console.log is restored"
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
