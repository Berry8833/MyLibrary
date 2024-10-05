// Initial variables to keep track of quiz progress
let currentQuestion = 0;
let timeLeft = 25;
let timer;
let score = 0;

// Example questions array
let questions = [
    {
        "question": "What is the purpose of the createTask function?",
        "options": ["To delete tasks", "To create new tasks", "To edit tasks", "To mark tasks as completed"],
        "answer": "To create new tasks"
    },
    {
        "question": "How are tasks saved and retrieved in the script?",
        "options": ["From a database", "From a file", "Using localStorage", "Using cookies"],
        "answer": "Using localStorage"
    },
    {
        "question": "What does the auditTask function do?",
        "options": ["Deletes tasks", "Saves tasks", "Checks the due date of tasks and updates their appearance", "Moves tasks between lists"],
        "answer": "Checks the due date of tasks and updates their appearance"
    },
    {
        "question": "How is the sortable feature enabled for the task lists?",
        "options": ["Using jQuery's sortable method", "Using CSS only", "By dragging manually", "With the date picker"],
        "answer": "Using jQuery's sortable method"
    },
    {
        "question": "What modal appears when the 'Add Task' button is clicked?",
        "options": ["Edit Task Modal", "Delete Task Modal", "Task Form Modal", "Task Completion Modal"],
        "answer": "Task Form Modal"
    },
    {
        "question": "How does the script handle editing a task's text?",
        "options": ["By deleting the task", "By replacing the text with a textarea for editing", "By opening a new page", "By dragging the task to a different list"],
        "answer": "By replacing the text with a textarea for editing"
    },
    {
        "question": "How can a task's due date be updated?",
        "options": ["By clicking the task description", "By dragging the task", "By clicking the date badge and using a date picker", "By saving the task again"],
        "answer": "By clicking the date badge and using a date picker"
    },
    {
        "question": "What happens when the 'Delete All Tasks' button is clicked?",
        "options": ["It moves all tasks to 'Done'", "It deletes all tasks from the lists and localStorage", "It marks all tasks as completed", "It clears only the 'To Do' list"],
        "answer": "It deletes all tasks from the lists and localStorage"
    },
    {
        "question": "How often does the script audit task due dates?",
        "options": ["Every 30 minutes", "Every 5 minutes", "Once a day", "Every time a task is created"],
        "answer": "Every 30 minutes"
    },
    {
        "question": "Which external libraries are used in this project?",
        "options": ["jQuery, Bootstrap, Moment.js", "React, Angular, Vue", "Django, Flask, Pyramid", "Node.js, Express, MongoDB"],
        "answer": "jQuery, Bootstrap, Moment.js"
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
