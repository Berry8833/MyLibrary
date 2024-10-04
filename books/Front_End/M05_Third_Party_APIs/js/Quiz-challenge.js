// Initial variables to keep track of quiz progress
let currentQuestion = 0;
let timeLeft = 25;
let timer;
let score = 0;

// Example questions array
let questions = [
    {
        "question": "What is the purpose of the <textarea> element inside each time block in the Workday Schedule?",
        "options": ["To display the current time", "To allow users to input their tasks", "To show the hour of the day", "To display saved tasks from localStorage"],
        "answer": "To allow users to input their tasks"
    },
    {
        "question": "What CSS property is used to give the buttons a smooth transition effect when hovering over them?",
        "options": ["background-color", "transition", "box-shadow", "padding"],
        "answer": "transition"
    },
    {
        "question": "In the CSS, what background color is assigned to the time blocks that represent the current hour?",
        "options": ["#ddd", "#5bc0de", "#198754", "#fd7e14"],
        "answer": "#5bc0de"
    },
    {
        "question": "How does the JavaScript code determine the current time to compare with the time blocks?",
        "options": ["By using today.getMinutes()", "By using new Date().getHours()", "By reading the user’s input", "By accessing the localStorage"],
        "answer": "By using new Date().getHours()"
    },
    {
        "question": "What does the updateTimeBlocks() function do?",
        "options": ["It updates the current day in the header", "It changes the color of the time blocks based on the current time", "It saves tasks to localStorage", "It deletes tasks from localStorage"],
        "answer": "It changes the color of the time blocks based on the current time"
    },
    {
        "question": "What event triggers saving a task to localStorage in the provided JavaScript code?",
        "options": ["Clicking the deleteBtn", "Clicking the saveBtn", "Typing in the textarea", "Opening the web page"],
        "answer": "Clicking the saveBtn"
    },
    {
        "question": "What does the deleteBtn do in each time block?",
        "options": ["It saves the task", "It deletes the entire time block", "It clears the task from the textarea and removes it from localStorage", "It refreshes the web page"],
        "answer": "It clears the task from the textarea and removes it from localStorage"
    },
    {
        "question": "How are saved tasks retrieved from localStorage when the page loads?",
        "options": ["By calling a function that loads tasks into a modal", "By querying localStorage.getItem() for each time block", "By fetching data from an external API", "By using the saveBtn"],
        "answer": "By querying localStorage.getItem() for each time block"
    },
    {
        "question": "How is the layout of the time blocks changed in the responsive design for mobile view?",
        "options": ["The time blocks are hidden", "The time blocks stack vertically with aligned text", "The time blocks increase in size", "The time blocks remain unchanged"],
        "answer": "The time blocks stack vertically with aligned text"
    },
    {
        "question": "Which HTML element is used to display the current day at the top of the Workday Schedule?",
        "options": ["<h1>", "<p id='currentDay'>", "<textarea>", "<header>"],
        "answer": "<p id='currentDay'>"
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
