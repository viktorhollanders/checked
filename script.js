'use strict';
let todoList = [];

// CONTAINER
const containerActive = document.querySelector('.activeTodos');
const containerCompleted = document.querySelector('.completedTodos');

// BUTTONS
const btnShowCompletedTodos = document.querySelector('.btn--logged');

// USER ACTIONS
const inputUserAddTodo = document.querySelector('.addTodo__input--content');
const inputUserDate = document.querySelector('.addTodo__date');

function renderTodo(todo) {
  const todoRowHTML = `
      <form id="${todo.id}" class="form todo__row">
        <input id="${todo.id}" class="form--check addTodo__input--checkbox" type="checkbox"/>
        <p class="todo__content">${todo.text}</p>
      </form>`;

  containerActive.insertAdjacentHTML('afterbegin', todoRowHTML);
}

function createTodo(text) {
  // create todo item
  const todo = {
    text,
    id: Date.now(),
  };
  todoList.push(todo);

  // add todo to ui
  renderTodo(todo);
}

function updateLoggedCount() {
  const completedTodosCount = containerCompleted.childElementCount;
  if (completedTodosCount > 0) {
    btnShowCompletedTodos.textContent = `Show ${completedTodosCount} logged item`;
    btnShowCompletedTodos.classList.remove('hidden');
  } else {
    btnShowCompletedTodos.textContent = `Show ${completedTodosCount} logged item`;
    btnShowCompletedTodos.classList.add('hidden');
  }
}

inputUserAddTodo.addEventListener('keydown', function (e) {
  if (e.code === 'Enter') {
    e.preventDefault();
    createTodo(inputUserAddTodo.value);

    inputUserAddTodo.value = '';
    inputUserAddTodo.blur();
  }
});

// When a user checks an element log the element and status to the console

document.addEventListener('click', function (e) {
  if (
    e.target.className == 'form--check addTodo__input--checkbox' &&
    e.target.checked
  ) {
    const completedTodo = document.getElementById(`${e.target.id}`);
    containerCompleted.appendChild(completedTodo);
    completedTodo.classList.add('completed');
    updateLoggedCount();
  } else if (
    e.target.className == 'form--check addTodo__input--checkbox' &&
    !e.target.checked
  ) {
    const completedTodo = document.getElementById(`${e.target.id}`);
    containerActive.appendChild(completedTodo);
    completedTodo.classList.remove('completed');
    updateLoggedCount();
  }
});

