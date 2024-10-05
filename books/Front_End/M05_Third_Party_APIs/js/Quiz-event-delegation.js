// Initial variables to keep track of quiz progress
let currentQuestion = 0;
let timeLeft = 25;
let timer;
let score = 0;

// Example questions array
let questions = [
    {
        "question": "What is the purpose of the <form> element in this HTML document?",
        "options": ["To handle form submission", "To add an item to the list", "To display a list of shopping items", "To style the list"],
        "answer": "To handle form submission"
    },
    {
        "question": "Which element is used to display the shopping list on the page?",
        "options": ["<h1> element", "<ul> element", "<form> element", "<input> element"],
        "answer": "<ul> element"
    },
    {
        "question": "What does the handleFormSubmit() function do when the form is submitted?",
        "options": ["It adds a shopping item to the list", "It resets the form input", "It prevents the form from refreshing the page", "All of the above"],
        "answer": "All of the above"
    },
    {
        "question": "What happens if the shoppingItem variable is empty when the form is submitted?",
        "options": ["An error message is displayed", "The form is reset", "A log message is printed to the console", "A default item is added to the list"],
        "answer": "A log message is printed to the console"
    },
    {
        "question": "Which jQuery function is used to append a shopping item to the shopping list?",
        "options": ["text()", "append()", "val()", "submit()"],
        "answer": "append()"
    },
    {
        "question": "What is the purpose of the button inside each shopping list item?",
        "options": ["To add more items", "To remove the item from the list", "To edit the item", "To highlight the item"],
        "answer": "To remove the item from the list"
    },
    {
        "question": "Which jQuery method is used to clear the form input after adding an item?",
        "options": ["text()", "append()", "val('')", "submit()"],
        "answer": "val('')"
    },
    {
        "question": "What does event.preventDefault() do in the handleFormSubmit() function?",
        "options": ["Prevents the form from submitting", "Stops the button from being clicked", "Disables the submit button", "Hides the form"],
        "answer": "Prevents the form from submitting"
    },
    {
        "question": "In handleRemoveItem(), what does $(event.target) refer to?",
        "options": ["The clicked button", "The shopping list", "The form", "The shopping item text"],
        "answer": "The clicked button"
    },
    {
        "question": "How does the handleRemoveItem() function remove a shopping list item?",
        "options": ["It hides the list item", "It deletes the input value", "It removes the parent <li> of the clicked button", "It disables the button"],
        "answer": "It removes the parent <li> of the clicked button"
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
