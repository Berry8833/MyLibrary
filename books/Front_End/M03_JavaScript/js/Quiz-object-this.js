// Initial variables to keep track of quiz progress
let currentQuestion = 0;
let timeLeft = 25;
let timer;
let score = 0;

// Example questions array
let questions = [
    {
        "question": "What is `this` referring to in the global scope?",
        "options": [
            "The document object.",
            "The window object.",
            "The helloThis function.",
            "The child object."
        ],
        "answer": "The window object."
    },
    {
        "question": "What does the `helloThis()` function log to the console when called in the global scope?",
        "options": [
            "'Inside this function, this is [object Window]'",
            "'Inside this function, this is undefined'",
            "'Inside this function, this is child object'",
            "'Inside this function, this is investor object'"
        ],
        "answer": "'Inside this function, this is [object Window]'"
    },
    {
        "question": "What does the `ageTenYears()` method in the `child` object log to the console?",
        "options": [
            "10",
            "20",
            "15",
            "NaN"
        ],
        "answer": "20"
    },
    {
        "question": "What is `this` referring to inside the `ageTenYears()` method?",
        "options": [
            "The global object.",
            "The `child` object.",
            "The `window` object.",
            "The `investor` object."
        ],
        "answer": "The `child` object."
    },
    {
        "question": "What is the value of `initialInvestment` in the `investor` object?",
        "options": [
            "1000",
            "5000",
            "7500",
            "3000"
        ],
        "answer": "5000"
    },
    {
        "question": "What does the `investmentGrowth()` method in the `investor` object calculate?",
        "options": [
            "Investment after 5 years.",
            "Initial investment minus 15%.",
            "Investment growth by multiplying by 1.15.",
            "Total investment plus 1000."
        ],
        "answer": "Investment growth by multiplying by 1.15."
    },
    {
        "question": "What is `this` referring to inside the `investmentGrowth()` method of the `investment` object?",
        "options": [
            "The `investor` object.",
            "The `investment` object.",
            "The global window object.",
            "The `child` object."
        ],
        "answer": "The `investment` object."
    },
    {
        "question": "What will be logged when `investor.investment.investmentGrowth()` is called?",
        "options": [
            "5000",
            "5750",
            "500",
            "7500"
        ],
        "answer": "5750"
    },
    {
        "question": "What happens when `this.helloThis()` is called in the global scope?",
        "options": [
            "'Inside this function, this is [object Window]' is logged.",
            "The method throws an error.",
            "'Hello, World!' is logged.",
            "'This is undefined' is logged."
        ],
        "answer": "'Inside this function, this is [object Window]' is logged."
    },
    {
        "question": "How does `this` behave inside a method in an object?",
        "options": [
            "It refers to the window object.",
            "It refers to the object itself.",
            "It is always undefined.",
            "It refers to a specific function."
        ],
        "answer": "It refers to the object itself."
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
