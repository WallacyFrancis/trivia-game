import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class FeedbackText extends React.Component {
  constructor() {
    super();

    this.state = {
      message: '',
    };

    this.setMessageInState = this.setMessageInState.bind(this);
  }

  componentDidMount() {
    this.setMessageInState();
  }

  setMessageInState() {
    const numberMinHits = 3;
    const { numberHits } = this.props;

    if (numberHits >= numberMinHits) {
      this.setState({ message: 'Mandou bem!' });
    } else {
      this.setState({ message: 'Podia ser melhor...' });
    }
  }

  render() {
    const { message } = this.state;
    return <h4 data-testid="feedback-text">{`FeedBack ${message}`}</h4>;
  }
}

FeedbackText.propTypes = {
  numberHits: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  numberHits: state.player.assertions,
});

export default connect(mapStateToProps)(FeedbackText);
