import createElement from '../model/createElement.js';

export default () => {
  const themeDiv = createElement('div', ['theme']);
  const ligthBtn = createElement('div', ['theme__button']);
  const darkBtn = createElement('div', ['theme__button']);

  ligthBtn.textContent = 'light';
  darkBtn.textContent = 'dark';

  themeDiv.append(ligthBtn, darkBtn);
  return themeDiv;
};
