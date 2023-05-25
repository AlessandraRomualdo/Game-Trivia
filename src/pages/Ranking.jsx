import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetAssertions } from '../redux/actions';
import Header from '../components/Header';

import '../App.css';
import '../styles/Ranking.css';

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
      <div className="page-ranking">
        <Header />
        <div className="container-info-rank">
          <h1 data-testid="ranking-title">Ranking</h1>
          <div className="container-rank">
            {ranking && ranking.map((rank, index) => (
              <div className="card-placar" key={ index }>
                <p className="placing">{index + 1}</p>
                <img src={ rank.imgGrav } alt="avatar player" />

                <div className="placar">
                  <p data-testid={ `player-name-${index}` }>{ rank.name }</p>
                  <p data-testid={ `player-score-${index}` }>{ `Score: ${rank.score}` }</p>
                  <p>{ `Assertions: ${rank.assertions}` }</p>
                </div>
              </div>
            ))}
          </div>
          
          <button
          className="btn-playagain"
            type="button"
            data-testid="btn-go-home"
            onClick={ () => this.handleClickGoHome() }
          >
            Play Again
          </button>
        </div>
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
