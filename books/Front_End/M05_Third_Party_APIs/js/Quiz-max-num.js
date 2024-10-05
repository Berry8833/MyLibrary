// Initial variables to keep track of quiz progress
let currentQuestion = 0;
let timeLeft = 25;
let timer;
let score = 0;

// Example questions array
let questions = [
    {
        "question": "What is the purpose of the `maxNum` function?",
        "options": ["To find the minimum number in an array", "To find the largest number in an array", "To sort the array in descending order", "To calculate the sum of an array"],
        "answer": "To find the largest number in an array"
    },
    {
        "question": "In the `maxNum` function, what is the initial value of `max`?",
        "options": ["The last element in the array", "The sum of the array elements", "The first element in the array", "The middle element in the array"],
        "answer": "The first element in the array"
    },
    {
        "question": "What does the for loop in the `maxNum` function do?",
        "options": ["Compares each element with the minimum value", "Prints all the elements of the array", "Iterates through the array to find the maximum number", "Swaps the first and last elements of the array"],
        "answer": "Iterates through the array to find the maximum number"
    },
    {
        "question": "In the Mocha test, what array is being tested in the `it` block?",
        "options": ["[1, 2, 3, 4, 5]", "[2, 3, -2, 99, 100, 5000, 321]", "[5, 10, 15]", "[-5, -10, -15]"],
        "answer": "[2, 3, -2, 99, 100, 5000, 321]"
    },
    {
        "question": "What is the expected output of the `maxNum` function for the test array?",
        "options": ["99", "5000", "100", "-2"],
        "answer": "5000"
    },
    {
        "question": "What does the `expect(result).to.eql(5000)` statement do?",
        "options": ["It checks if the result matches the expected output", "It logs the result to the console", "It changes the value of the array", "It sorts the array in descending order"],
        "answer": "It checks if the result matches the expected output"
    },
    {
        "question": "Which testing framework is used to write the test for `maxNum`?",
        "options": ["Jasmine", "QUnit", "Mocha", "Jest"],
        "answer": "Mocha"
    },
    {
        "question": "Which assertion library is being used in the test?",
        "options": ["Assert.js", "Chai", "Sinon", "TestNG"],
        "answer": "Chai"
    },
    {
        "question": "What does the `describe` block in the Mocha test do?",
        "options": ["Defines a series of tests", "Sets up the environment", "Runs the function", "Logs the test results"],
        "answer": "Defines a series of tests"
    },
    {
        "question": ,
        "options": ,
        "answer": 
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
