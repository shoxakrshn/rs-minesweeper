const selectGameLevel = (state) => {
  switch (state.level) {
    case 'easy':
      state.initial.width = 10;
      state.initial.height = 10;
      break;

    case 'medium':
      state.initial.width = 15;
      state.initial.height = 15;
      break;

    case 'hard':
      state.initial.width = 25;
      state.initial.height = 25;
      break;

    default:
      break;
  }
};

export default selectGameLevel;
