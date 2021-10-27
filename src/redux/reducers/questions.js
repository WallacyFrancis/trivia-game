import { SAVE_QUESTIONS, NEXT_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  index: 0,
  loading: true,
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return {
      ...state,
      ...action.questions,
      loading: false,
    };
  case NEXT_QUESTIONS:
    return {
      ...state,
      index: state.index + 1,
    };
  default:
    return state;
  }
};

export default questions;
