import createElement from '../model/createElement.js';

export default () => {
  const mineDiv = createElement('div', ['mine']);
  const mineLabel = createElement('label', ['mine__label']);
  const mineInput = createElement('input', ['mine__input']);

  mineInput.value = 10;

  mineLabel.textContent = 'Bombs amount: ';
  mineLabel.append(mineInput);
  mineDiv.append(mineLabel);

  return mineDiv;
};
