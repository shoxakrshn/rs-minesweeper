import isValidPosition from './isValidPosition.js';
import isBomb from './isBomb.js';
import getBombsCount from './getBombsCount.js';
import changeColor from './changeColor.js';
import playSound from './sound.js';

const open = (row, column, state, timerId) => {
  const { cells, bombs } = state;
  const { width } = state.initial;
  const message = document.querySelector('.message');
  if (!isValidPosition(row, column, state)) {
    return;
  }

  const index = row * width + column;
  const cell = cells[index];
  if (cell.disabled === true) {
    return;
  }

  cell.disabled = true;
  state.save[index].disabled = true;

  if (cell.textContent === '🚩') {
    cell.disabled = false;
    state.save[index].disabled = false;
    return;
  }

  if (isBomb(row, column, state)) {
    cell.textContent = '💣';
    cell.disabled = false;
    playSound('bomb', state);
    message.textContent = 'Game over. Try again';
    localStorage.setItem('message', message.textContent);
    clearInterval(timerId);
    state.result.push({ result: 'lose', time: state.time });
    state.time = 0;
    state.save[index].value = '💣';
    state.save[index].disabled = false;
    localStorage.setItem('save', JSON.stringify(state.save));
    localStorage.setItem('results', JSON.stringify(state.result));
    state.endGame = true;
    localStorage.setItem('endGame', true);
    document.querySelector('.info__new-game').textContent = '😵';
    localStorage.setItem('smile', '😵');
    bombs.forEach((bomb) => {
      if (cells[bomb].textContent === '🚩') {
        cells[bomb].textContent = '💢';
        state.save[bomb].value = '💢';
        state.save[bomb].disabled = false;
        localStorage.setItem('save', JSON.stringify(state.save));
      } else {
        cells[bomb].textContent = '💣';
        state.save[bomb].value = '💣';
        state.save[bomb].disabled = false;
        localStorage.setItem('save', JSON.stringify(state.save));
      }
    });

    cells.forEach((cellItem, idx) => {
      //  cellItem.disabled = true;
      if (cellItem.textContent === '🚩') {
        cellItem.textContent = '';
        state.save[idx].value = '';
        localStorage.setItem('save', JSON.stringify(state.save));
      }
    });
    return;
  }

  state.closedCount -= 1;

  if (state.closedCount === bombs.length) {
    message.textContent = `Hooray! You found all mines in ${state.time} seconds and ${state.clicks} moves`;
    localStorage.setItem('message', message.textContent);
    clearInterval(timerId);
    state.result.push({ result: 'win', time: state.time });
    state.time = 0;
    localStorage.setItem('results', JSON.stringify(state.result));
    playSound('win', state);
    state.endGame = true;
    localStorage.setItem('endGame', true);
    return;
  }

  const count = getBombsCount(row, column, state, timerId);

  if (count !== 0) {
    cell.textContent = count;
    state.save[index].value = count;
    localStorage.setItem('save', JSON.stringify(state.save));
    changeColor(count, cell);
    return;
  }

  cell.textContent = '';

  for (let i = -1; i <= 1; i += 1) {
    for (let j = -1; j <= 1; j += 1) {
      open(row + j, column + i, state, timerId);
    }
  }
};

export default open;
