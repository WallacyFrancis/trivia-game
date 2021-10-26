import { SAVE_QUESTIONS, NEXT_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: [],
  index: 0,
};

const questionsRedux = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
      index: action.index,
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

export default questionsRedux;
