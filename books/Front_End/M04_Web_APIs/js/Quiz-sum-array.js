// Initial variables to keep track of quiz progress
let currentQuestion = 0;
let timeLeft = 25;
let timer;
let score = 0;

// Example questions array
let questions = [
    {
        "question": "What is the purpose of the `sumArray` function in this code?",
        "options": ["To find the largest number in an array", "To sum all the numbers in an array", "To return the smallest number in an array", "To count the number of elements in the array"],
        "answer": "To sum all the numbers in an array"
    },
    {
        "question": "What is the initial value of the `sum` variable in the `sumArray` function?",
        "options": ["0", "The first element of the array", "1", "The length of the array"],
        "answer": "0"
    },
    {
        "question": "How does the `sumArray` function calculate the total sum of the array?",
        "options": ["It multiplies all the numbers in the array", "It adds each number in the array to a running total (`sum`)", "It subtracts each number from the sum", "It counts how many numbers are in the array"],
        "answer": "It adds each number in the array to a running total (`sum`)"
    },
    {
        "question": "Which method is used to iterate through the array in the `sumArray` function?",
        "options": ["forEach", "for loop", "while loop", "map"],
        "answer": "for loop"
    },
    {
        "question": "What will `sumArray([3, 1, 5, 6])` return when logged to the console?",
        "options": ["10", "15", "5", "20"],
        "answer": "15"
    },
    {
        "question": "In the `sumArray` function, what does `arr.length` represent?",
        "options": ["The sum of the numbers in the array", "The number of elements in the array", "The first element in the array", "The last element in the array"],
        "answer": "The number of elements in the array"
    },
    {
        "question": "What library is used in this code for testing the `sumArray` function?",
        "options": ["Jasmine", "Mocha and Chai", "Jest", "JUnit"],
        "answer": "Mocha and Chai"
    },
    {
        "question": "In the test case, what is expected when passing `[4, 8, 15, 16, 23, 42]` to `sumArray`?",
        "options": ["108", "99", "42", "50"],
        "answer": "108"
    },
    {
        "question": "Which testing framework is responsible for setting up the test environment in this code?",
        "options": ["Chai", "Mocha", "QUnit", "Cypress"],
        "answer": "Mocha"
    },
    {
        "question": "What assertion style is used in this test to compare the result of the `sumArray` function?",
        "options": ["expect(result).to.eql()", "assert(result).equal()", "should(result).equal()", "expect(result).to.be.true()"],
        "answer": "expect(result).to.eql()"
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
