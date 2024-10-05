// Initial variables to keep track of quiz progress
let currentQuestion = 0;
let timeLeft = 25;
let timer;
let score = 0;

// Example questions array
let questions = [
    {
        "question": "What is the purpose of the 'autocomplete' widget in the form?",
        "options": ["To suggest skill names", "To validate the form", "To enable auto-filling of dates", "To sort the list of skills"],
        "answer": "To suggest skill names"
    },
    {
        "question": "Which jQuery method is used to make the skills list sortable?",
        "options": ["draggable()", "sortable()", "resizable()", "autocomplete()"],
        "answer": "sortable()"
    },
    {
        "question": "What happens when the form is submitted without filling out all fields?",
        "options": ["The form is submitted anyway", "An alert is displayed", "A message is logged in the console", "The form resets automatically"],
        "answer": "A message is logged in the console"
    },
    {
        "question": "What is concatenated with the skill name when adding it to the skills list?",
        "options": ["A comma", "The date", "An ID number", "The placeholder text"],
        "answer": "The date"
    },
    {
        "question": "What does the 'printSkills' function do?",
        "options": ["It submits the form", "It adds the skill and date to the list", "It logs the form data to the console", "It enables sorting for the skills list"],
        "answer": "It adds the skill and date to the list"
    },
    {
        "question": "Which method is used to reset the form inputs after submission?",
        "options": ["reset()", "clear()", "val('')", "empty()"],
        "answer": "val('')"
    },
    {
        "question": "What jQuery UI widget is used to allow users to select a date?",
        "options": ["datepicker", "calendar", "timepicker", "autocomplete"],
        "answer": "datepicker"
    },
    {
        "question": "How does the 'disableSelection()' method affect the skills list?",
        "options": ["It prevents items from being selected", "It disables form submission", "It prevents autocomplete from working", "It disables sorting"],
        "answer": "It prevents items from being selected"
    },
    {
        "question": "What is the class added to each skill item when it is appended to the list?",
        "options": ["list-group-item", "form-group", "sortable-item", "ui-state-highlight"],
        "answer": "list-group-item"
    },
    {
        "question": "Which jQuery method is used to capture the form submission event?",
        "options": ["on('submit')", "submit()", "preventDefault()", "autocomplete()"],
        "answer": "on('submit')"
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
