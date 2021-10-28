export const SUBMIT_PLAYER = 'SUBMIT_PLAYER';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const NEXT_QUESTIONS = 'NEXT_QUESTIONS';
export const SCORE_ACTION = 'SCORE_ACTION';

export const submitPlayerAction = (state) => ({
  type: SUBMIT_PLAYER,
  state,
});

export const saveQuestions = (questions) => ({
  type: SAVE_QUESTIONS,
  questions,
});

export const nextQuestions = () => ({
  type: NEXT_QUESTIONS,
});

export const scoreAction = (score, assertions) => ({
  type: SCORE_ACTION,
  score,
  assertions,
});
