import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FeedbackText from '../components/FeedbackText';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <FeedbackText numberHits={ 2 } />
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
