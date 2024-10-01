// Initial variables to keep track of quiz progress
let currentQuestion = 0;
let timeLeft = 25;
let timer;
let score = 0;

// Example questions array
let questions = [
    {
        "question": "What is the initial value of the `shout` variable?",
        "options": [
            "'Sing'",
            "'Shout'",
            "'Tigers'",
            "'Lions'"
        ],
        "answer": "'Shout'"
    },
    {
        "question": "What does the `justShout` function log to the console?",
        "options": [
            "'Shout it all out!'",
            "'Shout, Shout'",
            "'Tigers!'",
            "'Bears! OH MY!'"
        ],
        "answer": "'Shout, Shout'"
    },
    {
        "question": "What will the `sayTigers` function log when called?",
        "options": [
            "'and Tigers and'",
            "'Lions!'",
            "'Bears! OH MY!'",
            "'Shout, Shout'"
        ],
        "answer": "'and Tigers and'"
    },
    {
        "question": "What will the `sayBears` function log when called?",
        "options": [
            "'Bears! OH MY!'",
            "'Pandas! OH MY!'",
            "'Tigers!'",
            "'Lions!'"
        ],
        "answer": "'Pandas! OH MY!'"
    },
    {
        "question": "What does the `singAlong` function do?",
        "options": [
            "Declares the variable 'shout'",
            "Logs 'Sing,' and then calls another function to log 'Sing a Song.'",
            "Logs 'Shout' twice",
            "Returns 'Tigers!'"
        ],
        "answer": "Logs 'Sing,' and then calls another function to log 'Sing a Song.'"
    },
    {
        "question": "What is the output of the second `justShout` function where `shout` is set to 'good vibes'?",
        "options": [
            "'good vibes, good vibes.'",
            "'Shout, Shout'",
            "'Sing, Sing.'",
            "'Bears! OH MY!'"
        ],
        "answer": "'good vibes, good vibes.'"
    },
    {
        "question": "What is the purpose of the `getName` function?",
        "options": [
            "To return the string 'Berry'",
            "To return the string 'K'",
            "To display 'Berry K'",
            "To log 'Shout' twice"
        ],
        "answer": "To return the string 'Berry'"
    },
    {
        "question": "What does the `displayFullName` function return?",
        "options": [
            "'Berry K'",
            "'Berry'",
            "'Shout'",
            "'Pandas! OH MY!'"
        ],
        "answer": "'Berry K'"
    },
    {
        "question": "What is the lexical scope of the `lastName` variable?",
        "options": [
            "Within the `showlastName` function",
            "Global scope",
            "Inside the `singAlong` function",
            "Inside the `getName` function"
        ],
        "answer": "Within the `showlastName` function"
    },
    {
        "question": "What is the scope of the `animal` variable when it is first declared?",
        "options": [
            "Global scope",
            "Local scope inside `sayLions`",
            "Local scope inside `sayTigers`",
            "Block scope"
        ],
        "answer": "Global scope"
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
