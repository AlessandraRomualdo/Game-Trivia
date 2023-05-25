import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetAssertions } from '../redux/actions';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    this.handleRankingFromLocalStorage();
  }

  handleClickGoHome = () => {
    const { history, dispatch } = this.props;
    dispatch(resetAssertions());
    history.push('');
  };

  handleRankingFromLocalStorage = () => {
    const recoveredRanking = JSON.parse(localStorage.getItem('ranking'));
    const orderedRanking = recoveredRanking.sort((a, b) => b.score - a.score);
    this.setState({
      ranking: orderedRanking,
    });
  };

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {ranking && ranking.map((rank, index) => (
          <div key={ index }>
            <p>{`Pos: ${index + 1}`}</p>
            <p data-testid={ `player-name-${index}` }>{ rank.name }</p>
            <img src={ rank.imgGrav } alt="" />
            <p data-testid={ `player-score-${index}` }>{ rank.score }</p>
            <p>{ rank.assertions }</p>
          </div>
        ))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => this.handleClickGoHome() }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Ranking);
