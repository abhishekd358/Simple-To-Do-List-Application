const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

// function to add a new task
const addTask = (task) => {
    // create a new list item
    const li = document.createElement('li');
    li.innerHTML = `<span>${task}</span><button class="delete">Delete</button>`;
    // add event listener to delete button
    li.querySelector('.delete').addEventListener('click', () => {
        li.remove();
    });
    // add list item to the list
    todoList.appendChild(li);
};

// add event listener to the form
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const task = todoInput.value;
    addTask(task);
    todoInput.value = '';
});
