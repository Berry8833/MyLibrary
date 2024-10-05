// Initial variables to keep track of quiz progress
let currentQuestion = 0;
let timeLeft = 25;
let timer;
let score = 0;

// Example questions array
let questions = [
    {
        "question": "What is the purpose of the `titleCase` function?",
        "options": [
            "To convert a string to lowercase",
            "To convert each word's first letter to uppercase",
            "To reverse the string",
            "To remove spaces from the string"
        ],
        "answer": "To convert each word's first letter to uppercase"
    },
    {
        "question": "What method is used to split the input string into an array of words?",
        "options": [
            "split()",
            "join()",
            "slice()",
            "map()"
        ],
        "answer": "split()"
    },
    {
        "question": "What does the `split(' ')` function do in this code?",
        "options": [
            "It splits the string by commas",
            "It splits the string into individual letters",
            "It splits the string into an array of words",
            "It splits the string into characters"
        ],
        "answer": "It splits the string into an array of words"
    },
    {
        "question": "How does the `titleCase` function convert the first letter of each word to uppercase?",
        "options": [
            "By using `toLowerCase()`",
            "By using `slice(1)`",
            "By modifying the first character with `toUpperCase()`",
            "By using `concat()`"
        ],
        "answer": "By modifying the first character with `toUpperCase()`"
    },
    {
        "question": "Which of the following test cases is included in the provided unit tests?",
        "options": [
            "'The Brown Fox' should return 'The brown fox'",
            "'a christmas carol' should return 'A Christmas Carol'",
            "'The Lazy Dog' should return 'The Lazy dog'",
            "'the lazy dog' should return 'the lazy Dog'"
        ],
        "answer": "'a christmas carol' should return 'A Christmas Carol'"
    },
    {
        "question": "What testing framework is used in the provided code?",
        "options": [
            "Jest",
            "Mocha",
            "Jasmine",
            "QUnit"
        ],
        "answer": "Mocha"
    },
    {
        "question": "What does the `expect(result).to.eql('The Quick Brown Fox Jumped Over The Lazy Dog')` statement do?",
        "options": [
            "It checks if the result contains the word 'Fox'",
            "It compares the actual result with the expected value",
            "It sets the result to 'The Quick Brown Fox Jumped Over The Lazy Dog'",
            "It formats the string to match the expected output"
        ],
        "answer": "It compares the actual result with the expected value"
    },
    {
        "question": "What is the output of the function when the input is 'the quick brown fox jumped over the lazy dog'?",
        "options": [
            "'The quick brown fox jumped over the lazy dog'",
            "'the Quick brown Fox Jumped Over the Lazy Dog'",
            "'The Quick Brown Fox Jumped Over The Lazy Dog'",
            "'the quick brown Fox jumped over the Lazy Dog'"
        ],
        "answer": "'The Quick Brown Fox Jumped Over The Lazy Dog'"
    },
    {
        "question": "What happens in the `for` loop inside the `titleCase` function?",
        "options": [
            "It splits the string into letters and capitalizes each letter",
            "It iterates over each word and capitalizes the first letter",
            "It removes spaces between the words",
            "It converts the string to lowercase"
        ],
        "answer": "It iterates over each word and capitalizes the first letter"
    },
    {
        "question": "What library is used for assertions in the test cases?",
        "options": [
            "Mocha",
            "Jasmine",
            "Chai",
            "Jest"
        ],
        "answer": "Chai"
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
