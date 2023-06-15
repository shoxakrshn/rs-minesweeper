const playEndGame = (soundName, state) => {
  if (state.sound === false) {
    return;
  }

  if (soundName === 'click') {
    const sound = new Audio('./sounds/click.mp3');
    sound.play();
  }
  if (soundName === 'bomb') {
    const sound = new Audio('./sounds/bomb.mp3');
    sound.play();
  }

  if (soundName === 'right') {
    const sound = new Audio('./sounds/right.mp3');
    sound.play();
  }

  if (soundName === 'newgame') {
    const sound = new Audio('./sounds/startgame.mp3');
    sound.play();
  }

  if (soundName === 'win') {
    const sound = new Audio('./sounds/win.mp3');
    sound.play();
  }
};

export default playEndGame;
