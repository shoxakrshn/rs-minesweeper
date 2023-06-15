import isBomb from './isBomb.js';

export default (row, column, state) => {
  let count = 0;

  for (let i = -1; i <= 1; i += 1) {
    for (let j = -1; j <= 1; j += 1) {
      if (isBomb(row + j, column + i, state)) {
        count += 1;
      }
    }
  }
  return count;
};
