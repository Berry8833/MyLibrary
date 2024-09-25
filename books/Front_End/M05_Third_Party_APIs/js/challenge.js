// Display the current date
const currentDayElement = document.getElementById("currentDay");
const today = new Date();
currentDayElement.textContent = today.toDateString();

// Time-based color change for time blocks
const timeBlocks = document.querySelectorAll(".time-block");

function updateTimeBlocks() {
    const currentHour = today.getHours();

    timeBlocks.forEach(block => {
        const blockHour = parseInt(block.querySelector(".hour").textContent);

        // Remove all classes
        block.classList.remove("past", "present", "future");

        // Add appropriate class based on the time
        if (blockHour < currentHour) {
            block.classList.add("past");
        } else if (blockHour === currentHour) {
            block.classList.add("present");
        } else {
            block.classList.add("future");
        }
    });
}

// Save task to localStorage
const saveButtons = document.querySelectorAll(".saveBtn");

saveButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        const task = button.previousElementSibling.value;
        localStorage.setItem(`task${index}`, task);
    });
});

// Load saved tasks from localStorage
timeBlocks.forEach((block, index) => {
    const savedTask = localStorage.getItem(`task${index}`);
    if (savedTask) {
        block.querySelector(".description").value = savedTask;
    }
});

// Delete task and remove from localStorage
const deleteButtons = document.querySelectorAll(".deleteBtn");

deleteButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        // Clear the textarea
        button.previousElementSibling.previousElementSibling.value = '';

        // Remove from localStorage
        localStorage.removeItem(`task${index}`);
    });
});

// Update the time block colors on load
updateTimeBlocks();
