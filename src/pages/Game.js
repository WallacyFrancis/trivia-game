import PropTypes from 'prop-types';
import React, { Component } from 'react';
import GameCard from '../components/GameCard';
import Header from '../components/Header';

class Game extends Component {
  render() {
    const { score } = this.props;
    return (
      <div>
        <Header score={ score } />
        <GameCard />
      </div>
    );
  }
}

Game.propTypes = {
  score: PropTypes.isRequired,
};

export default Game;
