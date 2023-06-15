import createElement from './model/createElement.js';
import info from './components/info.js';
import level from './components/level.js';
import mine from './components/mine.js';
import theme from './components/theme.js';
import grid from './components/grid.js';
import results from './components/results.js';

const render = (state) => {
  document.body.innerHTML = '';
  document.body.classList.add(state.theme);

  const mainDiv = createElement('main', ['main']);
  const title = createElement('h1', ['title']);
  const messageDiv = createElement('div', ['message']);
  const flagsDiv = createElement('div', ['flags']);
  const themeDiv = theme();
  const soundDiv = createElement('div', ['sound']);
  const gridDiv = grid(state);
  const levelDiv = level();

  title.textContent = 'Minesweeper';
  gridDiv.classList.add(`grid_${state.level}`);
  flagsDiv.textContent = `flags: ${state.flags}`;
  soundDiv.textContent = state.sound === true ? '🔉' : '🔇';
  messageDiv.textContent = localStorage.getItem('message') ? localStorage.getItem('message') : '';

  const levelBtns = levelDiv.querySelectorAll('.level__button');
  levelBtns.forEach((btn) => {
    if (btn.textContent === state.level) {
      btn.classList.add('level_selected');
    }
  });

  const themeBtns = themeDiv.querySelectorAll('.theme__button');
  themeBtns.forEach((btn) => {
    if (btn.textContent === state.theme) {
      btn.classList.add('theme__button_selected');
    }
  });

  mainDiv.append(
    title,
    info(),
    messageDiv,
    gridDiv,
    mine(),
    flagsDiv,
    levelDiv,
    themeDiv,
    soundDiv,
    results(state),
  );

  document.body.append(mainDiv);
};

export default render;
