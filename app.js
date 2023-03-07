// Define UI Variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask)
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task events
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from localStorage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // Loop through tasks
    tasks.forEach(function(task){
        // Create li element
        const li = document.createElement('li')
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="material-icons">clear</i>';
        // Append link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
    })
}

// Add Task
function addTask(e) {
    e.preventDefault();
    if(taskInput.value === '') {
        alert('Add a task');
    }else{
        // Create li element
        const li = document.createElement('li')
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="material-icons">clear</i>';
        // Append link to li
        li.appendChild(link);
        
        // Append li to ul
        taskList.appendChild(li);
        
        // Store in LocalStorage
        storeTaskIntoLocalStorage(taskInput.value);
        
        // Clear input
        taskInput.value = '';
    }

}

// Store Task
function storeTaskIntoLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();

            // Remove from LocalStorage
            removeTaskFromLocalStorage
            (e.target.parentElement.parentElement);
        }
    }
}

// Remove from LocalStorage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
    // Using innerHTML to clear
    // taskList.innerHTML = '';

    // Using whileLoop removechild()
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // https://jsperf.com/innerhtml-vs-removechild

    // Clear from LocalStorage
    clearTasksFromLocalStorage();

    // Clear Tasks from LocalStorage
    function clearTasksFromLocalStorage() {
        localStorage.clear();
    }
}

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    // Get all list item with same class then loop through
    // querySelectorAll() returns a NodeList, so we can loop directly
    document.querySelectorAll('.collection-item').forEach
    // Function parameter task is an iterator
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}