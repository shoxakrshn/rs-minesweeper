import createElement from '../model/createElement.js';
import changeColor from '../model/changeColor.js';

export default (state) => {
  const gridDiv = createElement('div', ['grid']);
  state.save.forEach((cell) => {
    const button = createElement('button', ['grid__cell', `grid__cell_${state.level}`]);
    button.disabled = cell.disabled;
    button.textContent = cell.value;
    changeColor(+cell.value, button);
    gridDiv.append(button);
  });
  return gridDiv;
};
