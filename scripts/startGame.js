import render from './render.js';
import selectGameLevel from './model/selectGameLevel.js';
import open from './model/open.js';
import playSound from './model/sound.js';
import saveGame from './model/saveGame.js';
import bombsGenerate from './model/bombsGenerate.js';
import clearStorage from './model/clearStorage.js';

let timerId;

function startTimer(state) {
  timerId = setInterval(() => {
    state.time += 1;
    localStorage.setItem('time', state.time);
    document.querySelector('.info__time').textContent = `sec: ${state.time}`;
  }, 1000);
}

const startGame = (state) => {
  const { width, height, bombsAmount } = state.initial;
  const cellsAmount = width * height;
  state.save = !localStorage.getItem('save') ? saveGame(width) : JSON.parse(localStorage.getItem('save'));
  state.flags = !localStorage.getItem('flags') ? bombsAmount : Number(localStorage.getItem('flags'));
  state.closedCount = cellsAmount;

  state.bombs = !localStorage.getItem('bombs') ? bombsGenerate(cellsAmount, bombsAmount) : JSON.parse(localStorage.getItem('bombs'));

  localStorage.setItem('bombs', JSON.stringify(state.bombs));

  render(state);
  const grid = document.querySelector('.grid');
  const levelDiv = document.querySelector('.level');
  const clicks = document.querySelector('.info__click');
  const results = document.querySelector('.results');
  const themeDiv = document.querySelector('.theme');
  const flagsDiv = document.querySelector('.flags');
  const soundDiv = document.querySelector('.sound');
  const infoNewGame = document.querySelector('.info__new-game');

  infoNewGame.textContent = localStorage.getItem('smile') ? localStorage.getItem('smile') : '😁';

  state.cells = [...grid.children];

  const mineInput = document.querySelector('.mine__input');
  mineInput.value = state.initial.bombsAmount;

  const newGame = document.querySelector('.info__new-game');
  clicks.textContent = `click: ${state.clicks}`;

  document.querySelector('.info__time').textContent = `sec: ${state.time}`;
  if (state.clicks > 0 && !state.endGame) {
    startTimer(state);
  }

  grid.addEventListener('click', (e) => {
    if (state.endGame) {
      return;
    }

    if (!e.target.classList.contains('grid__cell')) {
      return;
    }
    playSound('click', state);
    const index = state.cells.indexOf(e.target);
    const cell = state.cells[index];

    if (cell.textContent === '🚩') {
      return;
    }

    state.clicks += 1;
    localStorage.setItem('clicks', state.clicks);

    if (state.bombs.includes(index) && state.closedCount === cellsAmount && state.clicks === 1) {
      const idx = state.bombs.indexOf(index);
      state.bombs[idx] = index + 1;
    }

    const column = index % width;
    const row = (index - column) / width;

    if (state.clicks === 1) {
      startTimer(state);
    }
    clicks.textContent = `click: ${state.clicks}`;
    state.newGame = false;
    localStorage.setItem('newGame', '');

    open(row, column, state, timerId);
  });

  grid.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    if (state.endGame) {
      return;
    }

    if (!e.target.classList.contains('grid__cell')) {
      return;
    }
    playSound('right', state);

    const index = state.cells.indexOf(e.target);
    const cell = state.cells[index];

    if (cell.disabled) {
      return;
    }

    if (!cell.disabled && !cell.textContent && state.flags > 0) {
      cell.textContent = '🚩';
      state.save[index].value = '🚩';
      localStorage.setItem('save', JSON.stringify(state.save));
      state.flags -= 1;
      localStorage.setItem('flags', state.flags);
      flagsDiv.textContent = state.flags >= 0 ? `flags: ${state.flags}` : 'flags: 0';
    } else if (!cell.disabled && cell.textContent) {
      cell.textContent = '';
      state.save[index].value = '';
      localStorage.setItem('save', JSON.stringify(state.save));
      state.flags += 1;
      localStorage.setItem('flags', state.flags);
      flagsDiv.textContent = `flags: ${state.flags}`;
    }
  });

  levelDiv.addEventListener('click', (e) => {
    if (!e.target.classList.contains('level__button')) {
      return;
    }
    grid.classList.remove(`grid_${state.level}`);
    state.level = e.target.textContent;
    selectGameLevel(state);
    localStorage.setItem('level', state.level);
    state.endGame = false;
    localStorage.setItem('endGame', '');
    state.clicks = 0;
    state.time = 0;
    localStorage.setItem('time', 0);
    playSound('newgame', state);
    clearInterval(timerId);
    localStorage.setItem('level', state.level);
    localStorage.setItem('width', state.initial.width);
    localStorage.setItem('height', state.initial.height);
    clearStorage();
    state.newGame = true;
    startGame(state);
  });

  mineInput.addEventListener('change', (e) => {
    const { value } = e.target;
    state.initial.bombsAmount = +value < 10 || +value > 99 ? 10 : +value;
    localStorage.setItem('bombsAmount', state.initial.bombsAmount);
    state.clicks = 0;
    state.time = 0;
    state.endGame = false;
    localStorage.setItem('endGame', '');
    localStorage.setItem('time', 0);
    clearInterval(timerId);
    playSound('newgame', state);
    clearStorage();
    state.newGame = true;
    startGame(state);
  });

  newGame.addEventListener('click', () => {
    state.clicks = 0;
    state.endGame = false;
    localStorage.setItem('endGame', '');
    state.time = 0;
    localStorage.setItem('time', 0);
    clearInterval(timerId);
    playSound('newgame', state);
    clearStorage();
    state.newGame = true;
    startGame(state);
  });

  results.addEventListener('click', () => {
    results.querySelector('.results__list').classList.toggle('results__list_show');
  });

  themeDiv.addEventListener('click', (e) => {
    if (!e.target.classList.contains('theme__button')) {
      return;
    }
    if (e.target.textContent === 'dark') {
      state.theme = e.target.textContent;
      localStorage.setItem('theme', state.theme);
      const selected = themeDiv.querySelector('.theme__button_selected');
      selected.classList.remove('theme__button_selected');
      e.target.classList.add('theme__button_selected');
      document.body.classList.add('dark');
    }

    if (e.target.textContent === 'light') {
      document.body.classList.remove('dark');
      const selected = themeDiv.querySelector('.theme__button_selected');
      selected.classList.remove('theme__button_selected');
      e.target.classList.add('theme__button_selected');
      state.theme = e.target.textContent;
      localStorage.setItem('theme', state.theme);
    }
  });

  soundDiv.addEventListener('click', () => {
    state.sound = !state.sound;
    soundDiv.textContent = state.sound ? '🔉' : '🔇';
    localStorage.setItem('sound', state.sound ? true : '');
  });
};

export default startGame;
