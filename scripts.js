document.body.classList.add("dark-mode");

const isTimerPage = document.getElementById("timer-display") !== null;
const isTaskPage = document.getElementById("task-list") !== null;

console.log("JavaScript Connected!");

// ==========================================
// TASK BOARD CODE....we let you add 
// ==========================================

if (isTaskPage) {
    const todoInput = document.getElementById("todo");
    const taskList = document.getElementById("task-list");
    const addTaskButton = document.getElementById("add-task");
    const completedCounter = document.querySelector(".completed-task");
    const incompleteCounter = document.querySelector(".incomplete-task");
    const savedData = localStorage.getItem("tasks");
    const tasks = savedData ? JSON.parse(savedData) : [];

    let i = tasks.reduce(
        (maxId, task) => Math.max(maxId, task.id),
        0
    );

    // Update completed and incomplete counters
    function updateCounters() {
        const completed = tasks.filter(function (task) {
            return task.completed === true;
        }).length;

        const incomplete = tasks.length - completed;

        completedCounter.textContent =
            "Completed : " + completed;

        incompleteCounter.textContent =
            "Not Completed : " + incomplete;
    }

    // Display all tasks
    function renderTasks() {
        taskList.innerHTML = "";

        if (tasks.length === 0) {
            const emptyMessage = document.createElement("h2");
            emptyMessage.textContent = "Nothing here....";
            taskList.appendChild(emptyMessage);

            updateCounters();
            return;
        }

        tasks.forEach(function (task, index) {
            const taskRow = document.createElement("div");
            taskRow.classList.add("task-row");

            // Task number
            const taskNumber = document.createElement("span");
            taskNumber.textContent = (index + 1) + ".";
            taskNumber.classList.add("task-number");

            // Task title
            const taskTitle = document.createElement("span");
            taskTitle.textContent = task.title;
            taskTitle.classList.add("task-title");

            // Checkbox
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed || false;
            checkbox.classList.add("task-checkbox");

            if (checkbox.checked) {
                taskTitle.classList.add("completed");
            }

            checkbox.addEventListener("change", function () {
                task.completed = checkbox.checked;

                localStorage.setItem(
                    "tasks",
                    JSON.stringify(tasks)
                );

                taskTitle.classList.toggle(
                    "completed",
                    checkbox.checked
                );

                updateCounters();
            });

            // Edit button
            const editButton = document.createElement("button");
            editButton.textContent = "✏️";
            editButton.classList.add("edit-button");

            editButton.addEventListener("click", function () {
                const newTitle = prompt(
                    "Edit your task:",
                    task.title
                );

                if (newTitle === null) {
                    return;
                }

                const cleanedTitle = newTitle.trim();

                if (cleanedTitle === "") {
                    return;
                }

                task.title = cleanedTitle;

                localStorage.setItem(
                    "tasks",
                    JSON.stringify(tasks)
                );

                renderTasks();
            });

            // Delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "🗑️";
            deleteButton.classList.add("delete-button");

            deleteButton.addEventListener("click", function () {
                const taskIndex = tasks.findIndex(function (item) {
                    return item.id === task.id;
                });

                if (taskIndex !== -1) {
                    tasks.splice(taskIndex, 1);

                    localStorage.setItem(
                        "tasks",
                        JSON.stringify(tasks)
                    );

                    renderTasks();
                }
            });

            // Add elements to task row
            taskRow.appendChild(taskNumber);
            taskRow.appendChild(taskTitle);
            taskRow.appendChild(checkbox);
            taskRow.appendChild(editButton);
            taskRow.appendChild(deleteButton);

            taskList.appendChild(taskRow);
        });

        updateCounters();
    }

    // Add a new task
    addTaskButton.addEventListener("click", function () {
        const taskname = todoInput.value.trim();

        if (taskname === "") {
            return;
        }

        i++;

        tasks.push({
            id: i,
            title: taskname,
            completed: false
        });

        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );

        todoInput.value = "";
        renderTasks();
    });

    // Display saved tasks on page load
    renderTasks();
}

// ==========================================
// FOCUS TIMER CODE
// ==========================================

if (isTimerPage) {
    const timerDisplay = document.getElementById("timer-display");
    const startButton = document.getElementById("start-timer");
    const pauseButton = document.getElementById("pause-timer");
    const resetButton = document.getElementById("reset-timer");
    const timerStatus = document.getElementById("timer-status");
    const modeButtons = document.querySelectorAll("[data-minutes]");

    let selectedMinutes = 25;
    let remainingSeconds = selectedMinutes * 60;
    let timerInterval = null;

    // Update countdown display
    function updateDisplay() {
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;

        timerDisplay.textContent =
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0");
    }

    // Stop the timer
    function stopTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    // Start the timer
    function startTimer() {
        if (timerInterval !== null) {
            return;
        }

        if (remainingSeconds <= 0) {
            timerStatus.textContent =
                "Choose a timer mode to restart.";
            return;
        }

        timerStatus.textContent =
            "Stay focused. You got this! (It's prank!)";

        timerInterval = setInterval(function () {
            remainingSeconds--;

            updateDisplay();

            if (remainingSeconds <= 0) {
                stopTimer();
                timerStatus.textContent =
                    "Session complete! Go to sleep! (See, if I care!)";
            }
        }, 1000);
    }

    // Reset the timer
    function resetTimer() {
        stopTimer();
        remainingSeconds = selectedMinutes * 60;
        updateDisplay();
        timerStatus.textContent = "Timer reset. Ready to hide?";
    }

    // Start button
    startButton.addEventListener("click", startTimer);

    // Pause button
    pauseButton.addEventListener("click", function () {
        stopTimer();
        timerStatus.textContent = "Timer paused... (Peekaboo!)";
    });

    // Reset button
    resetButton.addEventListener("click", resetTimer);

    // Focus, short break and long break modes
    modeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            selectedMinutes = Number(button.dataset.minutes);
            resetTimer();
            timerStatus.textContent = "Mode selected. Ready?";
        });
    });

    // Initial display
    updateDisplay();
}
