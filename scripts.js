
document.body.classList.add("dark-mode");

console.log("JavaScript Connected!");

const todoInput = document.getElementById("todo");
const taskList = document.getElementById("task-list");
const addTaskButton = document.getElementById("add-task");

const savedData = localStorage.getItem("tasks");
const tasks = savedData ? JSON.parse(savedData) : [];

let i = tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0);

// Display all tasks
function renderTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        const emptyMessage = document.createElement("h2");
        emptyMessage.textContent = "Nothing here....";
        taskList.appendChild(emptyMessage);
        return;
    }

    tasks.forEach(function(task, index) {
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

        // Strike through completed tasks
        if (checkbox.checked) {
            taskTitle.classList.add("completed");
        }

        checkbox.addEventListener("change", function() {
            task.completed = checkbox.checked;

            localStorage.setItem("tasks", JSON.stringify(tasks));

            taskTitle.classList.toggle(
                "completed",
                checkbox.checked
            );
        });

        taskRow.appendChild(taskNumber);
        taskRow.appendChild(taskTitle);
        taskRow.appendChild(checkbox);

        taskList.appendChild(taskRow);
    });
}

// Add a new task
addTaskButton.addEventListener("click", function() {
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

    localStorage.setItem("tasks", JSON.stringify(tasks));

    todoInput.value = "";

    renderTasks();
});

// Show saved tasks on page load
renderTasks();
