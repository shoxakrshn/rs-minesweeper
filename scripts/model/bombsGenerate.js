export default (cells, bombs) => ([...Array(cells).keys()]
  .sort(() => Math.random() - 0.5)
  .slice(0, bombs)
);
