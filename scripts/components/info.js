import createElement from '../model/createElement.js';

export default () => {
  const info = createElement('div', ['info']);
  const infoClick = createElement('div', ['info__click']);
  const infoNewGame = createElement('div', ['info__new-game']);
  const infoTime = createElement('div', ['info__time']);

  infoClick.textContent = 'click: 0';
  infoNewGame.textContent = '😁';
  infoTime.textContent = 'sec: 0';
  info.append(infoClick, infoNewGame, infoTime);
  return info;
};
