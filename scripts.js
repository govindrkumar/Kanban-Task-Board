document.body.classList.add("dark-mode");

// DOM elements
console.log("JavaScript Connected!");

const todoInput = document.getElementById("todo");
const taskList = document.getElementById("task-list");
const addTaskButton = document.getElementById("add-task");

// Load existing tasks from LocalStorage
const savedData = localStorage.getItem("tasks");

const tasks = savedData ? JSON.parse(savedData) : [];

// Set the ID counter based on existing tasks
let i = tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0);

// Check loaded data
console.log("Existing tasks:", tasks);

// Add a new task when the button is clicked
addTaskButton.addEventListener("click", function () {

    // Read input
    const taskname = todoInput.value.trim();

    // Don't allow empty tasks
    if (taskname === "") {
        console.log("Please enter a task!");
        return;
    }

    // Create and add a new task
    i++;

    tasks.push({
        id: i,
        title: taskname
    });

    // Save updated array to LocalStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Show updated data in console
    console.log("Updated tasks:", tasks);
    console.log(
        "Saved tasks:",
        JSON.parse(localStorage.getItem("tasks"))
    );

    // Clear the input field
    todoInput.value = "";
});
