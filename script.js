'use strict';

const title = document.querySelector('.title');
const onboardingContainer = document.querySelector('.onboarding');
const appContainer = document.querySelector('.app');
const addTodoBtn = document.querySelector('.add-todo');

window.onload = () => {
  userHasViseted();
};

function enterSite() {
  onboardingContainer.style.display = 'none';
  title.style.transform = 'translatey(0)';
  title.style.margin = '50px 0 80px 0';
  addTodoBtn.style.top = '46rem';
  appContainer.style.display = 'block';
  appContainer.style.opacity = '1';
}

function userHasViseted() {
  const hasVisited = JSON.parse(localStorage.getItem('viseted'));
  if (hasVisited === true) {
    enterSite();
  } else {
    localStorage.setItem('viseted', JSON.stringify(true));
  }
}

addTodoBtn.addEventListener('click', function () {
  enterSite();
});
