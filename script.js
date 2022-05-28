'use strict';

const onboarding = document.querySelector('.onboarding');
const title = document.querySelector('.title');
const addTodoBtn = document.querySelector('.add-todo');

window.onload = () => {
  userHasViseted();
};

function userHasViseted() {
  const hasVisited = JSON.parse(localStorage.getItem('viseted'));
  if (hasVisited === true) {
    onboarding.style.display = 'none';
    title.style.margin = '3.75rem 0rem 0rem 5rem';
    addTodoBtn.style.top = '46rem';

    document.querySelector('.app').style.display = 'block';
  } else {
    localStorage.setItem('viseted', JSON.stringify(true));
  }
}
