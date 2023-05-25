import { DADOS_PLAYER, RESET_ASSERTIONS, SET_SCORE } from "../actions";

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  assertions: 0,
}

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DADOS_PLAYER: {
      return {
        ...state,
        name: action.name,
        email: action.email,
      }
    }
    case SET_SCORE:
      return {
        ...state,
        score: state.score + action.score,
        assertions: state.assertions + 1,
      };
    case RESET_ASSERTIONS:
      return {
        name: '',
        email: '',
        score: 0,
        assertions: 0,
      };
    default:
      return state;
  }
};

export default player;