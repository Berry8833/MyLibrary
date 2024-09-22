const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks Text Mode Language"],
        answer: 1
    },
    {
        question: "Which HTML element is used to define the largest heading?",
        options: ["<h1>", "<heading>", "<h6>", "<head>"],
        answer: 0
    },
    {
        question: "How can you make a numbered list in HTML?",
        options: ["<list>", "<ul>", "<ol>", "<li>"],
        answer: 2
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        options: ["<lb>", "<br>", "<break>", "<hr>"],
        answer: 1
    },
    {
        question: "Which CSS property is used to change the text color?",
        options: ["text-color", "color", "font-color", "background-color"],
        answer: 1
    },
    {
        question: "How do you add a background color for all <h1> elements in CSS?",
        options: ["h1 {background-color: blue;}", "h1.all {background: blue;}", "h1 {color: blue;}", "h1 {bg-color: blue;}"],
        answer: 0
    },
    {
        question: "Which CSS property controls the size of the text?",
        options: ["font-style", "text-size", "font-size", "size"],
        answer: 2
    },
    {
        question: "How do you make the text bold in CSS?",
        options: ["font-weight: bold;", "font-style: bold;", "text-style: bold;", "font-bold: true;"],
        answer: 0
    },
    {
        question: "What is the correct syntax for referring to an external CSS file in HTML?",
        options: ["<stylesheet>mystyle.css</stylesheet>", "<style src='mystyle.css'>", "<link rel='stylesheet' href='mystyle.css'>", "<css link='mystyle.css'>"],
        answer: 2
    },
    {
        question: "Which CSS property is used to create space around elements, outside of any defined borders?",
        options: ["padding", "spacing", "margin", "border-spacing"],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
const timeLimit = 15; // Set the time limit for each question in seconds

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");

function showQuestion() {
    clearTimeout(timer); // Clear any existing timer
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";  // Clear previous options

    // Create buttons for options
    q.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => selectAnswer(index);  // Attach click event to check answer
        button.classList.add("option-btn");
        optionsEl.appendChild(button);
    });

    resultEl.innerHTML = "";  // Clear the result area

    // Start the timer
    startTimer(timeLimit);
}

function startTimer(seconds) {
    let timeLeft = seconds;
    const timerDisplay = document.createElement("div");
    timerDisplay.id = "timer";
    timerDisplay.textContent = `Time left: ${timeLeft} seconds`;
    optionsEl.prepend(timerDisplay); // Add timer above the options

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time left: ${timeLeft} seconds`;

        if (timeLeft <= 0) {
            clearInterval(timer); // Stop the timer
            selectAnswer(-1); // Automatically select an answer (no answer selected)
        }
    }, 1000);
}

function selectAnswer(selected) {
    clearTimeout(timer); // Stop the timer when an answer is selected
    const q = questions[currentQuestion];
    const optionButtons = document.querySelectorAll('.option-btn');

    // Disable all options once an answer is selected
    optionButtons.forEach(button => button.disabled = true);

    // Check if the selected answer is correct
    if (selected === q.answer) {
        score++;  // Increment score for correct answers
    }

    // Move to the next question after a short delay
    currentQuestion++;

    if (currentQuestion < questions.length) {
        setTimeout(showQuestion, 1000);  // Wait 1 second before showing the next question
    } else {
        setTimeout(endQuiz, 1000);  // End the quiz after the last question
    }
}

function endQuiz() {
    questionEl.textContent = "Quiz Completed!";
    optionsEl.innerHTML = "";  // Clear the options
    resultEl.innerHTML = `You scored ${score} out of ${questions.length}!`;  // Display the final score
}

// Start the quiz
showQuestion();
