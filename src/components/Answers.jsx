import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import parse from 'html-react-parser';
import Loading from './Loading';
import Button from './Button';
import { nextQuestions, scoreAction } from '../redux/actions';

const LAST_QUESTION = 5;
const ANSWER_TIME = 30;
const CORRECT = 'correct-answer';

class Answers extends Component {
  constructor() {
    super();

    this.state = {
      showButton: false,
      intervalId: 0,
      timer: ANSWER_TIME,
    };

    this.renderAnswers = this.renderAnswers.bind(this);
    this.checkedQuestions = this.checkedQuestions.bind(this);
    this.calledOnClick = this.calledOnClick.bind(this);
    this.clickNextQuestions = this.clickNextQuestions.bind(this);
    this.checkedQuestions = this.checkedQuestions.bind(this);
    this.renderTimer = this.renderTimer.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.saveScoreInSotrage = this.saveScoreInSotrage.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.sendScore = this.sendScore.bind(this);
  }

  componentDidMount() {
    this.renderTimer();
  }

  componentDidUpdate() {
    this.stopTimer();
  }

  calledOnClick() {
    const { intervalId } = this.state;
    clearInterval(intervalId);
    this.setState({ showButton: true });
    this.checkedQuestions();
    this.saveScoreInSotrage();
  }

  saveScoreInSotrage() {
    const storage = JSON.parse(localStorage.getItem('state'));
    // console.log(storage);
    const player = {
      ...storage.player,
      score: 10,
    };
    console.log(player);
  }

  clickNextQuestions() {
    const { incrementIndex } = this.props;
    this.setState({ showButton: false });
    incrementIndex();
    this.renderTimer();
    const btns = document.querySelectorAll('button');
    btns.forEach((btn) => {
      if (btn.dataset.testid !== CORRECT) {
        return btn.classList.remove('wrong');
      }
      return btn.classList.remove('correct');
    });
  }

  checkedQuestions() {
    const btns = document.querySelectorAll('button');
    btns.forEach((btn) => {
      if (btn.dataset.testid !== CORRECT) {
        return btn.classList.add('wrong');
      }
      return btn.classList.add('correct');
    });
  }

  stopTimer() {
    const { timer, intervalId } = this.state;
    if (!timer) {
      clearInterval(intervalId);
    }
  }

  decrementTimer() {
    this.setState((prevState) => ({
      timer: prevState.timer - 1,
    }));
  }

  handleScore({ target }) {
    const HARD = 3;
    const MEDIUM = 2;
    const { questions, index, calcScore } = this.props;
    const { testid } = target.dataset;
    const { timer } = this.state;

    const defaultValue = 10;
    const dify = questions[index].difficulty;
    const level = dify === 'hard' ? HARD : MEDIUM;

    if (testid === CORRECT) {
      const points = defaultValue + (timer * (dify === 'easy' ? 1 : level));
      const assertion = 1;
      calcScore(points, assertion); // manda direto pro state global
      this.sendScore(points);
    }
  }

  sendScore(n) {
    const store = JSON.parse(localStorage.getItem('state'));
    const ZERO = 0;
    if (n !== ZERO) {
      const state = {
        player: {
          ...store.player,
          score: store.player.score + n,
        },
      };
      localStorage.setItem('state', JSON.stringify(state));
    }
  }

  renderTimer() {
    const SECOND = 1000;
    this.setState({ timer: ANSWER_TIME });
    const intervalId = setInterval(this.decrementTimer, SECOND);
    this.setState({ intervalId });
  }

  renderAnswers() {
    const { questions, index } = this.props;
    const { timer } = this.state;
    const correctAnswer = questions[index].correct_answer;
    const incorrectAnswer = questions[index].incorrect_answers;
    const btnCorrect = (
      <button
        type="button"
        data-testid="correct-answer"
        onClick={ (e) => this.calledOnClick(e) }
        disabled={ !timer }
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
          onClick={ (e) => this.calledOnClick(e) }
          disabled={ !timer }
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
    const { loading } = this.props;
    const { showButton, timer } = this.state;

    if (!loading) {
      return (
        <div>
          { this.renderAnswers() }
          { (showButton) && <Button
            onClick={ this.clickNextQuestions }
          /> }
          <div>
            { `Tempo: ${timer}` }
          </div>
        </div>
      );
    } return <Loading />;
  }
}

Answers.propTypes = {
  index: PropTypes,
  loading: PropTypes,
  questions: PropTypes,
  incrementIndex: PropTypes,
  scoreAction: PropTypes,
}.isRequired;

const mapStateToProps = (state) => ({
  questions: state.questions,
  index: state.questions.index,
  loading: state.questions.loading,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  incrementIndex: () => dispatch(nextQuestions()),
  calcScore: (score, assertions) => dispatch(scoreAction(score, assertions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
