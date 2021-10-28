import PropTypes from 'prop-types';
import React from 'react';

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

    if (numberHits < numberMinHits) {
      this.setState({ message: 'Podia ser melhor...' });
    } else {
      this.setState({ message: 'Mandou bem!' });
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

export default FeedbackText;
