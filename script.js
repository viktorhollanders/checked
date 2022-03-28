'use strict';
let todoList = [];
let completedTodosCount;

// CONTAINER
const containerActive = document.querySelector('.activeTodos');
const containerCompleted = document.querySelector('.completedTodos');

// BUTTONS
const btnShowCompletedTodos = document.querySelector('.btn--logged');
const btnDelet = document.querySelector('.btn--delete');

// USER ACTIONS
const inputUserAddTodo = document.querySelector('.addTodo__input--content');
const inputUserDate = document.querySelector('.addTodo__date');

function renderTodo(todo) {
  const todoRowHTML = `
      <form id="${todo.id}" class="form todo__row">
        <input id="${todo.id}" class="form--check addTodo__input--checkbox" type="checkbox"/>
        <p class="todo__content">${todo.text}</p>
        <input id="${todo.id}" class="todo__selected" type="radio">
      </form>`;

  containerActive.insertAdjacentHTML('afterbegin', todoRowHTML);
}

function createTodo(text) {
  // create todo item
  const todo = {
    text,
    checked: false,
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

function updateStatus(element, container, setClass) {
  container.appendChild(element);
  if (setClass === 'add') element.classList.add('completed');
  if (setClass === 'remove') element.classList.remove('completed');
  updateLoggedCount();
}

function updateCheckedState(e) {
  const completedTodo = document.getElementById(`${e.target.id}`);

  if (e.target.className == 'form--check addTodo__input--checkbox') {
    e.target.checked
      ? updateStatus(completedTodo, containerCompleted, 'add')
      : updateStatus(completedTodo, containerActive, 'remove');
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

document.addEventListener('click', updateCheckedState);

btnShowCompletedTodos.addEventListener('click', function () {
  if (containerCompleted.style.display === 'block') {
    containerCompleted.style.display = 'none';
    btnShowCompletedTodos.textContent = `Show ${completedTodosCount} logged items`;
  } else {
    containerCompleted.style.display = 'block';
    btnShowCompletedTodos.textContent = `Hide ${completedTodosCount} logged items`;
  }
});

// if input rado is checked and todo is in completed section remove item from DOM and from todos array.

btnDelet.addEventListener('click', function () {
  console.log(todoList);
});
