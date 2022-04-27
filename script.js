'use strict';
let todoList = [];

// CONTAINER
const containerActive = document.querySelector('.activeTodos');
const containerCompleted = document.querySelector('.completedTodos');

// BUTTONS
const btnLogged = document.querySelector('.btn--logged');

// USER ACTIONS
const inputUserAddTodo = document.querySelector('.addTodo__input--content');
const inputUserDate = document.querySelector('.addTodo__date');

function renderTodo(list, container) {
  container.innerHTML = '';

  list.forEach(todo => {
    const todoRowHTML = `
      <form id="${todo.id}" class="form todo__row">
        <input id="${todo.id}" class="form--check addTodo__input--checkbox" type="checkbox"/>
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

  // add todo to ui
  renderTodo(todoList, containerActive);
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

function updateStatus(element, container, setClass) {
  container.appendChild(element);
  showHidElement(element, setClass, 'completed');
}

function updateCheckedState(todo) {
  const completedTodo = document.getElementById(`${todo.id}`);
  todo.checked
    ? updateStatus(completedTodo, containerCompleted, 'add')
    : updateStatus(completedTodo, containerActive, 'remove');
}

function updateBtnLoggedState() {
  const count = containerCompleted.childElementCount;
  const plural = count > 1 ? 's' : '';

  if (count > 0) {
    showHidElement(btnLogged, 'remove');
    // btnLogged.classList.remove('hidden');
  } else {
    // btnLogged.classList.add('hidden');
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

  if (currentTodo.className === 'form--check addTodo__input--checkbox') {
    toggleCheckedStatus(currentTodo);
    updateCheckedState(currentTodo);
    updateBtnLoggedState();
    showHideDeletButton(currentTodo);
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

function deleteTodo(e) {
  const currentTodo = document.getElementById(`${e.target.id}`);
  if (e.target.className === 'btn--delete') {
    const index = todoList.findIndex(n => n.id == currentTodo.id);

    todoList.splice(index, 1);
    currentTodo.remove();

    updateBtnLoggedState();
  }
}

document.addEventListener('click', completedTodo);

btnLogged.addEventListener('click', function () {
  if (containerCompleted.classList.contains('hidden')) {
    showHidElement(containerCompleted, 'remove');
  } else {
    showHidElement(containerCompleted, 'add');
  }
  updateBtnLoggedState();
});

document.addEventListener('click', deleteTodo);
