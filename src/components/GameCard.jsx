import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import parse from 'html-react-parser'; // soluciona caracteres estranhos na resposta da API
import { Redirect } from 'react-router';
import { getId } from '../services/triviaAPI';
// import FeedbackText from './FeedbackText';
import Loading from './Loading';
import './game.css';
import Button from './Button'; // req 10
import { nextQuestions, submitPlayerAction } from '../redux/actions';
import Answers from './Answers';

const LAST_QUESTION = 5;

class GameCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: 0,
      timer: 10,
      questions: [],
      loading: true,
      // assertioanyns: 0, // Req 9
      localStorage: {
        player: {
          name: '',
          score: 0, // Req 9
          assertions: 0,
          gravatarEmail: '',
        },
      },
      showButton: false, // req 10
    };
    this.getQuestionsFromApi = this.getQuestionsFromApi.bind(this);
    // this.renderAnswers = this.renderAnswers.bind(this);
    this.renderTimer = this.renderTimer.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    // this.checkedQuestions = this.checkedQuestions.bind(this);
    this.checkPoints = this.checkPoints.bind(this); // Função para req 9
    // this.checkPlayer = this.checkPlayer.bind(this); // Função para req 9
    this.clickNextQuestions = this.clickNextQuestions.bind(this); // req 10
    this.calledOnClick = this.calledOnClick.bind(this);
  }

  componentDidMount() {
    this.getQuestionsFromApi();
    this.renderTimer();
  }

  componentDidUpdate() {
    this.stopTimer();
  }

  async getQuestionsFromApi() {
    const token = localStorage.getItem('token');
    const response = await getId(token);
    const json = await response.json();

    this.setState({
      questions: json.results,
      loading: false,
    });
  }

  checkPoints() { // tentativa requisito 9
    const { questions, timer, localStorage } = this.state;
    const { index, dispatchSetValue } = this.props;
    const { difficulty } = questions[index];
    const hard = 3;
    const sumPoints = 10;
    const level = difficulty === 'hard' ? hard : 2;
    const points = sumPoints + (timer * (difficulty === 'easy' ? 1 : level));
    console.log(index);
    console.log(points);
    this.setState((prevState) => ({
      localStorage: {
        player: {
          ...prevState.localStorage.player,
          score: prevState.localStorage.player.score + points,
        },
      },
    }));
    dispatchSetValue(localStorage);
  }

  // checkPlayer(ranking, name, score, picture) { // Função para requisito 9
  //   const checkPlayer = ranking
  //     .some(({ name: n }) => n === name);
  //   return !checkPlayer
  //     ? [...ranking, { name, score, picture }]
  //     : ranking.map((rank) => {
  //       if (rank.name !== name) { return rank; }
  //       rank.score = rank.score > score ? rank.score : score;
  //       return rank;
  //     });
  // }

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

  clickNextQuestions() { // req 10
    const { incrementIndex } = this.props;
    incrementIndex();
    this.setState({
      timer: 10,
      showButton: false,
    });
    this.renderTimer();
  }

  calledOnClick() {
    const { intervalId } = this.state;
    clearInterval(intervalId);
    this.checkPoints();
    // this.checkedQuestions();
  }

  renderQuestion() {
    const { index } = this.props;
    const { questions } = this.state;
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
    return (<Redirect to="/feedback" />); // corrigir
  }

  renderTimer() {
    const SECOND = 1000;
    const intervalId = setInterval(this.decrementTimer, SECOND);
    this.setState({ intervalId });
  }

  render() {
    const { loading, timer, showButton, questions } = this.state;

    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        { this.renderQuestion() }
        <Answers questions={ questions } />
        <div>
          { `Tempo: ${timer}` }
        </div>
        <div>
          { (showButton || !timer) && <Button
            onClick={ this.clickNextQuestions }
          /> }
        </div>
      </div>
    );
  }
}

GameCard.propTypes = {
  index: PropTypes.number.isRequired,
  incrementIndex: PropTypes.func.isRequired,
  dispatchSetValue: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  index: state.questions.index,
  assertions: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({ // req 10
  incrementIndex: () => dispatch(nextQuestions()),
  dispatchSetValue: (state) => (
    dispatch(submitPlayerAction(state))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameCard);
