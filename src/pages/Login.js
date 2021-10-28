import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTrivia, getId } from '../services/triviaAPI';
import { submitPlayerAction, saveQuestions } from '../redux/actions';

// Referência para setar o objeto no localStorage: https://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage

const REGEX_EMAIL = /\S+@\S+\.\S+/;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitPlayer = this.submitPlayer.bind(this);
    this.getQuestionsFromApi = this.getQuestionsFromApi.bind(this);
  }

  componentDidMount() {
    fetchTrivia();
  }

  async getQuestionsFromApi() {
    const { dispatchQuestions } = this.props;
    const token = localStorage.getItem('token');
    const response = await getId(token);
    const json = await response.json();
    dispatchQuestions(json.results);
  }

  handleChange({ target: { name, value } }) {
    const { player } = this.state;
    this.setState({
      player: {
        ...player,
        [name]: value,
      },
    }, this.validatePlayer);
  }

  validatePlayer() {
    const { player: { name, gravatarEmail } } = this.state;
    const validEmail = REGEX_EMAIL.test(gravatarEmail);

    if (name && validEmail) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  submitPlayer() {
    const { dispatchSetValue } = this.props;
    const { player } = this.state;
    localStorage.setItem('state', JSON.stringify(this.state));
    dispatchSetValue(player);
  }

  render() {
    const { disabled } = this.state;
    return (
      <form>
        <label htmlFor="name">
          Jogador:
          <input
            name="name"
            data-testid="input-player-name"
            type="text"
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <label htmlFor="gravatarEmail">
          E-mail
          <input
            name="gravatarEmail"
            data-testid="input-gravatar-email"
            type="text"
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ disabled }
            onClick={ () => {
              this.submitPlayer();
              this.getQuestionsFromApi();
            } }
          >
            Jogar
          </button>
        </Link>
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </form>
    );
  }
}

Login.propTypes = {
  dispatchSetValue: PropTypes.func.isRequired,
  dispatchQuestions: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetValue: (state) => (
    dispatch(submitPlayerAction(state))
  ),
  dispatchQuestions: (questions) => (
    dispatch(saveQuestions(questions))
  ),
});

export default connect(null, mapDispatchToProps)(Login);
