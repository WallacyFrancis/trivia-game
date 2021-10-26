export const SUBMIT_PLAYER = 'SUBMIT_PLAYER';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const NEXT_QUESTIONS = 'NEXT_QUESTIONS'; //

export const submitPlayerAction = (state) => ({
  type: SUBMIT_PLAYER,
  state,
});

export const saveQuestions = (state) => ({
  type: SAVE_QUESTIONS,
  state,
});

export const nextQuestions = () => ({
  type: NEXT_QUESTIONS,
});
