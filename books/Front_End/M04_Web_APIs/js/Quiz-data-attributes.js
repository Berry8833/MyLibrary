// Initial variables to keep track of quiz progress
let currentQuestion = 0;
let timeLeft = 25;
let timer;
let score = 0;

// Example questions array
let questions = [
    {
        "question": "What is the initial value of the `data-state` attribute for each box?",
        "options": ["hidden", "visible", "none", "shown"],
        "answer": "hidden"
    },
    {
        "question": "What happens when a box with the `data-state` set to 'hidden' is clicked?",
        "options": [
            "The box number is shown, and the state changes to 'visible'.",
            "The box is removed.",
            "The background color changes.",
            "Nothing happens."
        ],
        "answer": "The box number is shown, and the state changes to 'visible'."
    },
    {
        "question": "Which element listens for the `click` event in the JavaScript code?",
        "options": [".container", ".box", "body", "h1"],
        "answer": ".container"
    },
    {
        "question": "What text is displayed inside the box when it is clicked for the first time?",
        "options": ["Its data-number value", "Its data-state value", "The word 'hidden'", "No text"],
        "answer": "Its data-number value"
    },
    {
        "question": "What is the background color of each box initially?",
        "options": ["saddlebrown", "aqua", "green", "burlywood"],
        "answer": "saddlebrown"
    },
    {
        "question": "What font size is applied to the numbers inside each box?",
        "options": ["150px", "100px", "50px", "200px"],
        "answer": "150px"
    },
    {
        "question": "How wide is each box in the `.container` for screens wider than 740px?",
        "options": ["31%", "48%", "50%", "25%"],
        "answer": "31%"
    },
    {
        "question": "What media query is used to adjust the width of the boxes for smaller screens?",
        "options": ["(max-width: 740px)", "(max-width: 768px)", "(min-width: 640px)", "(max-width: 720px)"],
        "answer": "(max-width: 740px)"
    },
    {
        "question": "What happens to the text inside the box when its `data-state` is changed back to 'hidden'?",
        "options": [
            "The text is cleared.",
            "The number is shown again.",
            "The background color changes.",
            "The font size increases."
        ],
        "answer": "The text is cleared."
    },
    {
        "question": "What color is used for the text (numbers) displayed inside each box?",
        "options": ["aqua", "green", "yellow", "blue"],
        "answer": "aqua"
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
