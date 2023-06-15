import createElement from '../model/createElement.js';

export default () => {
  const levelDiv = createElement('div', ['level']);
  const easyBtn = createElement('div', ['level__button']);
  const mediumBtn = createElement('div', ['level__button']);
  const hardBtn = createElement('div', ['level__button']);

  easyBtn.textContent = 'easy';
  mediumBtn.textContent = 'medium';
  hardBtn.textContent = 'hard';

  levelDiv.append(easyBtn, mediumBtn, hardBtn);
  return levelDiv;
};
