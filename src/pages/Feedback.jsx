import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { resetAssertions } from '../redux/actions';

class Feedback extends Component {
  handleResults() {
    const { assertions } = this.props;
    const THREE = 3;
    if (assertions < THREE) {
      return 'Could be better...';
    }
    return 'Well Done!';
  }

  handleClickPlayAgain = () => {
    const { history, dispatch } = this.props;
    dispatch(resetAssertions());
    history.push('/');
  };

  handleClickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const messageFeedback = this.handleResults();
    const { assertions, score } = this.props;
    return (
      <div data-testid="feedback-text">
        <Header />
        <h1>Feedback</h1>
        <h2 data-testid="feedback-text">{ messageFeedback }</h2>
        <h2 data-testid="feedback-total-score">{ score }</h2>
        <h2 data-testid="feedback-total-question">{ assertions }</h2>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => this.handleClickPlayAgain() }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => this.handleClickRanking() }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  dispatch: PropTypes.func.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (batata) => ({
  assertions: batata.player.assertions,
  score: batata.player.score,
});

export default connect(mapStateToProps)(Feedback);