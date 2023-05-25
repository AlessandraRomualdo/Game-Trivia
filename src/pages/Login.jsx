// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dadosPlayer } from '../redux/actions';
import  trivia  from '../trivia.png';

import '../App.css';
import '../styles/Login.css';

class Login extends Component {
  state = {
    disabled: true,
    name: '',
    email: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,

    }, this.validFields);
  };

  validFields = () => {
    const { name, email } = this.state;
    const minValue = 3;
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const nameValido = name.length >= minValue;
    this.setState({ disabled: !(emailValido && nameValido) });
  };


  fetchAPI = async () => {
    const URL_API = 'https://opentdb.com/api_token.php?command=request';
    const res = await fetch(URL_API);
    const data = await res.json();
    localStorage.setItem('token', data.token);
  };

  playGame = async () => {
    const { dispatch, history } = this.props;
    const { name, email } = this.state;
    dispatch(dadosPlayer(name, email));
    await this.fetchAPI();
    history.push('/game');
  };

  redirectSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { disabled, name, email } = this.state;
    return (
      <div className="page-login">
        <div className="container-login">
          <img className="logo"  src={trivia} alt="Logo" />
          <div className="form-container">
            <input
              type="text"
              name="name"
              value={ name }
              placeholder="Digite seu nome"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
            <input
              type="email"
              name="email"
              value={ email }
              placeholder="Digite seu email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
              </div>
            <div className="btns-login">
              <button
              className="
              p-4 bg-blue-500 cursor-pointer rounded-lg
              hover:bg-blue-600 text-white font-bold text-xl"
                data-testid="btn-play"
                type="button"
                disabled={ disabled }
                onClick={ this.playGame }
              >
                Play
              </button>
              <button
              className="
              p-4 bg-blue-500 cursor-pointer rounded-lg
              hover:bg-blue-600 text-white font-bold text-xl"
              type="button"
              data-testid="btn-settings"
              onClick={ this.redirectSettings }
              >
                Settings
              </button>
            </div>
        </div>
      </div>
    );
  }
}

export default connect()(Login);
