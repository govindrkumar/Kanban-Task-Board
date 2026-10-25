
document.body.classList.add("dark-mode");

console.log("JavaScript Connected!");

const todoInput = document.getElementById("todo");
const taskList = document.getElementById("task-list");
const addTaskButton = document.getElementById("add-task");

const savedData = localStorage.getItem("tasks");
const tasks = savedData ? JSON.parse(savedData) : []; // to anyone...it's a shortcut to write if else in js. you can do that too....

let i = tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0);

// need to write a stupid updatecounter.....
function updateCounters(){
    const completed = tasks.filter(function(task)
    {
        return task.completed === true;
    }).length;

    const incomplete = tasks.length - completed;

    completedCounter.textContent = "Completed : " + completed;
    incompleteCounter.textContent = "Not Completed : " + incomplete;
}

// Display all tasks
function renderTasks() {
    taskList.innerHTML = "";
    // normal h2...title...has been set with condition that if 
    // any tasks.length === 0 then it will keep showing nothing here text
    // useful feature 7/10

    if (tasks.length === 0) {
        const emptyMessage = document.createElement("h2");
        emptyMessage.textContent = "Nothing here....";
        taskList.appendChild(emptyMessage);
        updateCounters();
        return;
    }

    // each task needs the row number which can be fetched too...

    tasks.forEach(function(task, index) {
        const taskRow = document.createElement("div");
        taskRow.classList.add("task-row");

        // Task number
        // here, using span element instead of normal div element
        // yeah, I needed little freedom from boriyat (bored)
        // so, what it dowes ? we know that computer starts count from 0
        // so, here we be appending index + 1 to know the task numbers....
        const taskNumber = document.createElement("span");
        taskNumber.textContent = (index + 1) + ".";
        taskNumber.classList.add("task-number");

        // Task title
        // simple way to add task title which has been of course intered by you
        const taskTitle = document.createElement("span");
        taskTitle.textContent = task.title;
        taskTitle.classList.add("task-title");

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed || false;
        checkbox.classList.add("task-checkbox");

        // Small condition
        // if checkbox gets checked it marks completed in your local storage
        // tells css to make a cross on text looks cool
        // if its toggled to uncheck it will remove that cross. 
        // yeah...
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

        // delete button...useful ? yes....but, who completes task ?
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "🗑️";
        deleteButton.classList.add("delete-button");

        deleteButton.addEventListener("click", function (){
            const taskIndex = tasks.findIndex(function(item){
                return item.id === task.id;
            });

            if (taskIndex !== -1){
                tasks.splice(taskIndex, 1);

                localStorage.setItem(
                    "tasks",
                    JSON.stringify(tasks)
                );
                renderTasks();
            }
        });

        taskRow.appendChild(taskNumber);
        taskRow.appendChild(taskTitle);
        taskRow.appendChild(checkbox);
        taskList.appendChild(taskRow);
        taskRow.appendChild(deleteButton);
    });

    updateCounters();
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

const completedCounter = document.querySelector(".completed-task");
const incompleteCounter = document.querySelector(".incomplete-task");

