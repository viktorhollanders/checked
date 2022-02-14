'use strict';

const containerApp = document.querySelector('.app');
const containerActiveTodods = document.querySelector('.activeTodo');
const containerCompletedTodo = document.querySelector('.completedTodo');

const btnLogged = document.querySelector('.btn--logged');

const inputAddTodo = document.querySelector('.addTodo__input--todo');
const inputCheckBox = document.querySelector('.addTodo__input--cheskbox');

inputAddTodo.addEventListener('keydown', function (e) {
  if (e.code === 'Enter') {
    e.preventDefault();

    const newTodoHTML = `
         <div class="todo__row">
          <input class="form--check" type="checkbox" />
          <p class="todo__content">${inputAddTodo.value}</p>
         </div>`;

    containerActiveTodods.insertAdjacentHTML('afterbegin', newTodoHTML);

    inputAddTodo.value = '';
    inputAddTodo.blur();
  }
});

inputCheckBox.addEventListener('click', function (e) {
  if (inputCheckBox.checked) {
  }
});
