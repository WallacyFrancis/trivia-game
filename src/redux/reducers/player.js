import { SUBMIT_PLAYER, SCORE_ACTION } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_PLAYER:
    return {
      ...state,
      name: action.state.name,
      assertions: action.state.assertion,
      score: action.state.score,
      gravatarEmail: action.state.gravatarEmail,
    };
  case SCORE_ACTION:
    return {
      ...state,
      score: state.score + action.points,
      assertions: state.assertions + action.assertion,
    };
  default:
    return state;
  }
};

export default player;
