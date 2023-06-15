import startGame from './scripts/startGame.js';

const state = {
  initial: {
    width: !localStorage.getItem('width') ? 10 : Number(localStorage.getItem('width')),
    height: !localStorage.getItem('height') ? 10 : Number(localStorage.getItem('height')),
    bombsAmount: !localStorage.getItem('bombsAmount') ? 10 : Number(localStorage.getItem('bombsAmount')),
  },
  bombs: [],
  cells: [],
  closedCount: 0,
  endGame: Boolean(localStorage.getItem('endGame')),
  level: !localStorage.getItem('level') ? 'easy' : localStorage.getItem('level'),
  theme: !localStorage.getItem('theme') ? 'light' : localStorage.getItem('theme'),
  clicks: !localStorage.getItem('clicks') ? 0 : Number(localStorage.getItem('clicks')),
  time: !Number(localStorage.getItem('time')) ? 0 : Number(localStorage.getItem('time')),
  flags: 0,
  sound: Boolean(localStorage.getItem('sound')),
  result: [],
  save: '',
};

startGame(state);
