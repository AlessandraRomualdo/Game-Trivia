
export const DADOS_PLAYER = 'DADOS_PLAYER';
export const SET_SCORE = 'SET_SCORE';
export const RESET_ASSERTIONS = 'RESET_ASSERTIONS';

export const dadosPlayer = (name, email) => ({
  type: DADOS_PLAYER,
  name,
  email,
});

export const setScore = (score) => ({
  type: SET_SCORE,
  score,
});

export const resetAssertions = () => ({
  type: RESET_ASSERTIONS,
});