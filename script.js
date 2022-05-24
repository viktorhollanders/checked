'use strict';

// ELEMENTS
const title = document.querySelector('.title');

// CONTAINERS
const containerApp = document.querySelector('.app');
const containerWelcomBanner = document.querySelector('.welcomBanner');
const containerAddTodo = document.querySelector('.addTodo');
const containerActive = document.querySelector('.activeTodos');
const containerCompleted = document.querySelector('.completedTodos');

// BUTTONS
const btnAddTodo = document.querySelector('.btn--addTodo');
const btnLogged = document.querySelector('.btn--logged');

// USER ACTIONS
const inputUserAddTodo = document.querySelector('.addTodo__input--content');
const inputUserDate = document.querySelector('.addTodo__date');

let todoList;

window.addEventListener('load', () => {
  todoList = JSON.parse(localStorage.getItem('todos')) || [];

  // add todo to ui
  renderTodo(containerActive);
  containerAddTodo.style.display = 'none';
  showHidElement(btnAddTodo, 'remove');
});

function renderTodo(container) {
  container.innerHTML = '';

  todoList.forEach(todo => {
    const todoRowHTML = `
      <form id="${todo.id}" class="form todo__row">
        <input id="${todo.id}" class="form--check todo__input--checkbox" type="checkbox"/>
        <p class="todo__content">${todo.text}</p>
        <button type="button" id="${todo.id}" class="btn--delete hidden">
         <embed src="icons/delete-icon.svg">
        </button>
        </form>`;

    if (todo.checked === false && container === containerActive) {
      containerActive.insertAdjacentHTML('afterbegin', todoRowHTML);
    }
  });
}

function createTodo(text) {
  // create todo item
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };
  todoList.push(todo);

  localStorage.setItem('todos', JSON.stringify(todoList));
}

function showHidElement(element, setClass, className = 'hidden') {
  setClass === 'add'
    ? element.classList.add(className)
    : element.classList.remove(className);
}

function toggleCheckedStatus(checkbox) {
  const todo = todoList.find(todo => todo.id == checkbox.id);
  checkbox.checked ? (todo.checked = true) : (todo.checked = false);
}

function toggleCompletTodo(element, container, setClass) {
  container.appendChild(element);
  showHidElement(element, setClass, 'completed');
}

function updateCheckedState(todo) {
  const completedTodo = document.getElementById(`${todo.id}`);
  todo.checked
    ? toggleCompletTodo(completedTodo, containerCompleted, 'add')
    : toggleCompletTodo(completedTodo, containerActive, 'remove');
}

function showHideBtnLogged() {
  const count = containerCompleted.childElementCount;
  const plural = count > 1 ? 's' : '';

  if (count > 0) {
    showHidElement(btnLogged, 'remove');
  } else {
    showHidElement(btnLogged, 'add');
    showHidElement(containerCompleted, 'add');
  }

  containerCompleted.classList.contains('hidden')
    ? (btnLogged.textContent = `Show ${count} logged item${plural}`)
    : (btnLogged.textContent = `Hide ${count} logged item${plural}`);
}

function showHideDeletButton(todo) {
  const completedTodo = document.getElementById(`${todo.id}`);

  const deleteButton = completedTodo.querySelector('button');

  if (containerCompleted.contains(completedTodo)) {
    showHidElement(deleteButton, 'remove');
  } else {
    showHidElement(deleteButton, 'add');
  }
}

function completedTodo(e) {
  const currentTodo = e.target;

  if (currentTodo.className === 'form--check todo__input--checkbox') {
    toggleCheckedStatus(currentTodo);
    updateCheckedState(currentTodo);
    showHideBtnLogged();
    showHideDeletButton(currentTodo);
  }
}

function deleteTodo(e) {
  const currentTodo = document.getElementById(`${e.target.id}`);
  if (e.target.className === 'btn--delete') {
    todoList = todoList.findIndex(n => n.id == currentTodo.id);

    localStorage.setItem('todos', JSON.stringify('todoList'));
    renderTodo();

    showHideBtnLogged();
  }
}

// EVENT LISTENERS

inputUserAddTodo.addEventListener('keydown', function (e) {
  if (e.code === 'Enter') {
    e.preventDefault();
    createTodo(inputUserAddTodo.value);

    inputUserAddTodo.value = '';
    inputUserAddTodo.blur();
  }
});

btnLogged.addEventListener('click', function () {
  if (containerCompleted.classList.contains('hidden')) {
    showHidElement(containerCompleted, 'remove');
  } else {
    showHidElement(containerCompleted, 'add');
  }
  showHideBtnLogged();
});

function renderWelcomeScreen() {
  containerWelcomBanner.style.display = 'none';
  title.style.transform = 'translatey(0)';
  title.style.margin = '50px 0 80px 0';
  btnAddTodo.style.top = '686px';
  containerApp.style.display = 'flex';
}

btnAddTodo.addEventListener('click', function () {
  if (window.getComputedStyle(containerApp).display === 'none') {
    renderWelcomeScreen();
    containerAddTodo.style.display = 'flex';
    showHidElement(btnAddTodo, 'add');
  } else {
    containerAddTodo.style.display = 'flex';
    showHidElement(btnAddTodo, 'add');
  }
});

// DOCUMENT EVENT LISTENERS

document.addEventListener('click', completedTodo);
document.addEventListener('click', deleteTodo);
