import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import parse from 'html-react-parser';

const LAST_QUESTION = 5;

class Answers extends Component {
  constructor() {
    super();
    this.renderAnswers = this.renderAnswers.bind(this);
    this.checkedQuestions = this.checkedQuestions.bind(this);
  }

  checkedQuestions() {
    const btns = document.querySelectorAll('button');
    btns.forEach((btn) => {
      if (btn.dataset.testid !== 'correct-answer') {
        return btn.classList.add('wrong');
      }
      return btn.classList.add('correct') && this.checkPoints(); // verificar execução da função checkPoints
    });
  }

  renderAnswers() {
    const { index, questions } = this.props;
    const correctAnswer = questions[index].correct_answer;
    const incorrectAnswer = questions[index].incorrect_answers;
    const btnCorrect = (
      <button
        type="button"
        data-testid="correct-answer"
        onClick={ () => this.calledOnClick() }
        // disabled={ !timer }
      >
        { parse(correctAnswer) }
      </button>
    );
    const btnIncorret = (
      incorrectAnswer.map((answer, key) => (
        <button
          type="button"
          key={ key }
          data-testid={ `wrong-answer-${key}` }
          onClick={ () => this.calledOnClick() }
          // disabled={ !timer }
        >
          { parse(answer) }
        </button>
      ))
    );
    const totalQuestions = [...btnIncorret, btnCorrect];
    if (index < LAST_QUESTION) {
      return (
        <div>
          {
            totalQuestions.sort().map((element, key) => (
              <p key={ key }>{ element }</p>
            ))
          }
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        { this.renderAnswers }
      </div>
    );
  }
}

Answers.propTypes = {
  index: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf().isRequired,
};

const mapStateToProps = (state) => ({
  index: state.questions.index,
});

export default connect(mapStateToProps)(Answers);
