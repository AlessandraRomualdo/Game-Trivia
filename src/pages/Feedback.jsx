import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { resetAssertions } from '../redux/actions';

import '../App.css';
import '../styles/Feedback.css';

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
      <div className="page-feedback" data-testid="feedback-text">
        <Header />
        <div className="container-resultado">
          <h1>FeedBack</h1>

          <div>
            <h2 data-testid="feedback-text">{ messageFeedback }</h2>
            <h2 data-testid="feedback-total-score">{ `Score: ${score}` }</h2>
            <h2 data-testid="feedback-total-question">{ `Assertions: ${assertions}` }</h2>
          </div>

          <div className="btns-feed">
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
        </div>
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