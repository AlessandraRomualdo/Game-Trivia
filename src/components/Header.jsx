// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import  trivia  from '../trivia.png';


import '../App.css';
import '../styles/Header.css';

class Header extends Component {

  state = {imgProfile: '',};

  componentDidMount() {
    this.recoverImgPlayer()
  }

  recoverImgPlayer = () => {
    const { email } = this.props;
    const hash = md5(email).toString();
    const URL_GRAVATAR = `https://www.gravatar.com/avatar/${hash}`;
 
    this.setState({ imgProfile: URL_GRAVATAR });

  };

  // https://www.gravatar.com/avatar/4675ee57486c6ab9507d64d763ffd4f3


  render() {
    const { imgProfile} = this.state;
    const { name, score } = this.props
    return (
      <div className="header-container">
        <img className="logo logo-header"  src={trivia} alt="Logo" />
          <div className="container-info-player">
            <h5 data-testid="header-player-name">{name}</h5>
            <div className="container-score-header">
              <h6>Score:</h6>
              <h6 data-testid="header-score">{score}</h6>
            </div>
          </div>

          <div className="container-header-img">
            <img data-testid="header-profile-picture" src={imgProfile} alt={`avatar de ${name}`}/>
            </div>

      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  email: state.player.email,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header)