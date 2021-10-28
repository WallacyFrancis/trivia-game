import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import parse from 'html-react-parser'; // soluciona caracteres estranhos na resposta da API
import { Redirect } from 'react-router';
import Answers from './Answers';
import Loading from './Loading';
import './game.css';
import { submitPlayerAction } from '../redux/actions';

const LAST_QUESTION = 5;

class GameCard extends Component {
  constructor() {
    super();

    this.renderQuestion = this.renderQuestion.bind(this);
    // this.saveScore = this.saveScore.bind(this);
  }

  // saveScore() {
  //   const { score } = this.props;
  //   const prevStateLocalStorage = JSON.parse(localStorage.getItem('state'));
  //   const { player }
  //   const state = {
  //     ...prevStateLocalStorage,
  //     player: {
  //       score,
  //     },
  //   };
  //   console.log(state);
  // }

  renderQuestion() {
    const { questions, index } = this.props;
    // this.saveScore();
    if (index < LAST_QUESTION) {
      return (
        <div>
          <h1 data-testid="question-text">
            { parse(questions[index].question) }
          </h1>
          <h2 data-testid="question-category">
            { parse(questions[index].category) }
          </h2>
        </div>
      );
    }
    return (<Redirect to="/feedback" />);
  }

  render() {
    const { loading } = this.props;
    if (!loading) {
      return (
        <div>
          { this.renderQuestion() }
          <Answers />
        </div>
      );
    } return <Loading />;
  }
}

GameCard.propTypes = {
  index: PropTypes,
  questions: PropTypes,
  loading: PropTypes,
  score: PropTypes,
}.isRequired;

const mapStateToProps = (state) => ({
  index: state.questions.index,
  loading: state.questions.loading,
  assertions: state.player.assertions,
  questions: state.questions,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({ // req 10
  dispatchSetValue: (state) => (
    dispatch(submitPlayerAction(state))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameCard);
