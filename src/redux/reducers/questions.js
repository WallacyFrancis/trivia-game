import { SAVE_QUESTIONS, NEXT_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  index: 0,
  questions: [],
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
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
