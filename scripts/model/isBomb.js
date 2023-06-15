import isValidPosition from './isValidPosition.js';

export default (row, column, state) => {
  const { bombs } = state;
  const { width } = state.initial;
  if (!isValidPosition(row, column, state)) {
    return undefined;
  }

  const index = row * width + column;
  return bombs.includes(index);
};
