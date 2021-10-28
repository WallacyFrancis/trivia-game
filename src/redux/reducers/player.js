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
      gravatarEmail: action.state.gravatarEmail,
    };
  case SCORE_ACTION:
    return ({
      ...state,
      score: state.score + action.points,
      assertions: state.assertions + action.assertion,
    }
    // localStorage.setItem(('state', JSON.stringify(state)))
    );
  default:
    return state;
  }
};

export default player;
