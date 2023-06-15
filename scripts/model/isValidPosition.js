export default (row, column, state) => {
  const { width, height } = state.initial;
  return row >= 0
  && row < height
  && column >= 0
  && column < width;
};
