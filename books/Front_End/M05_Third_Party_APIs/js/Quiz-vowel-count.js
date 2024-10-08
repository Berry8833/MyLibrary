// Initial variables to keep track of quiz progress
let currentQuestion = 0;
let timeLeft = 25;
let timer;
let score = 0;

// Example questions array
let questions = [
    {
        "question": "What is the purpose of the vowelCount function?",
        "options": ["To count vowels in a string", "To count consonants in a string", "To reverse a string", "To find the length of a string"],
        "answer": "To count vowels in a string"
    },
    {
        "question": "Which array is used in the vowelCount function to store vowels?",
        "options": ["['b', 'c', 'd', 'f', 'g']", "['a', 'e', 'i', 'o', 'u']", "['x', 'y', 'z']", "['s', 't', 'r']"],
        "answer": "['a', 'e', 'i', 'o', 'u']"
    },
    {
        "question": "What does the indexOf method check in the vowelCount function?",
        "options": ["It checks if a letter is a vowel", "It checks if a string is empty", "It checks the length of the string", "It checks if a letter is uppercase"],
        "answer": "It checks if a letter is a vowel"
    },
    {
        "question": "How does the vowelCount function handle uppercase letters?",
        "options": ["It ignores them", "It converts them to lowercase", "It counts them as consonants", "It removes them from the string"],
        "answer": "It converts them to lowercase"
    },
    {
        "question": "What will the vowelCount function return when given an empty string?",
        "options": ["The number 1", "The number 0", "An error message", "A null value"],
        "answer": "The number 0"
    },
    {
        "question": "How many vowels are expected in the string 'programmer' according to the test?",
        "options": ["2", "3", "4", "5"],
        "answer": "3"
    },
    {
        "question": "How many vowels are expected in the string 'I think, therefore I am.' according to the test?",
        "options": ["6", "7", "8", "9"],
        "answer": "8"
    },
    {
        "question": "What library is used for the assertions in the test cases?",
        "options": ["Mocha", "Chai", "Jest", "Jasmine"],
        "answer": "Chai"
    },
    {
        "question": "What testing framework is used to set up the tests for the vowelCount function?",
        "options": ["Jasmine", "Jest", "Mocha", "QUnit"],
        "answer": "Mocha"
    },
    {
        "question": "What is the purpose of mocha.run() at the end of the HTML file?",
        "options": ["To stop the tests", "To define the test cases", "To run the test cases", "To display the test results"],
        "answer": "To run the test cases"
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
