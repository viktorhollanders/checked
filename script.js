'use strict';
let todoList = [];
let completedTodosCount;

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
  const count = containerCompleted.childElementCount;
  completedTodosCount = count;
  if (completedTodosCount > 0) {
    btnShowCompletedTodos.classList.remove('hidden');
    btnShowCompletedTodos.textContent = `Show ${count} logged items`;
  } else {
    completedTodosCount = containerCompleted.childElementCount;
    btnShowCompletedTodos.classList.add('hidden');
    containerCompleted.style.display = 'none';
    btnShowCompletedTodos.textContent = `Show ${count} logged items`;
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
    console.log(completedTodosCount);
  } else if (
    e.target.className == 'form--check addTodo__input--checkbox' &&
    !e.target.checked
  ) {
    const completedTodo = document.getElementById(`${e.target.id}`);
    containerActive.appendChild(completedTodo);
    completedTodo.classList.remove('completed');
    updateLoggedCount();
    console.log(completedTodosCount);
  }
});

btnShowCompletedTodos.addEventListener('click', function () {
  if (containerCompleted.style.display === 'block') {
    containerCompleted.style.display = 'none';
    btnShowCompletedTodos.textContent = `Show ${completedTodosCount} logged items`;
  } else {
    containerCompleted.style.display = 'block';
    btnShowCompletedTodos.textContent = `Hide ${completedTodosCount} logged items`;
  }
});
