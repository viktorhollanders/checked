'use strict';
let todoList = [];

// CONTAINER
const containerActive = document.querySelector('.activeTodos');
const containerCompleted = document.querySelector('.completedTodos');

// USER ACTIONS
const inputUserAddTodo = document.querySelector('.addTodo__input--content');

function createTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };
  todoList.push(todo);
}

function updateTodoList(list) {
  const item = list.slice(-1);

  const todoRowHTML = `
    <form class="form todo__row" >
    <input id="${item[0].id}" class="form--check addTodo__input--checkbox" type="checkbox" />
    <p class="todo__content">${item[0].text}</p>
    </form>`;

  containerActive.insertAdjacentHTML('afterbegin', todoRowHTML);
}

inputUserAddTodo.addEventListener('keydown', function (e) {
  if (e.code === 'Enter') {
    e.preventDefault();
    createTodo(inputUserAddTodo.value);

    inputUserAddTodo.value = '';
    inputUserAddTodo.blur();
    updateTodoList(todoList);
  }
});
