// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { setScore } from '../redux/actions';
import quiz from '../imagens/quiz.gif'

import '../App.css';
import '../styles/Game.css';

class Game extends Component {
  state = {
    questions: [],
    isLoading: false,
    indice: 0,
    correct: 'default',
    wrong: 'default',
    isAnswered: false,
    time: 30,
    timeout: false,
    shuffledAnswers: [],
  };

  componentDidMount() {
    this.requestQuestions();
  };
  
  // componentDidUpdate() {
  //   if( this.state.time === 0 && this.intervalId) {
  //     clearInterval(this.intervalId);
  //   }
  // };
  
  // startTime = () => {
  //   this.setState({time: 10, timeout: false}, () => { this.time();});
  // };
  
  time = () => {
    const interval = 1000;
    const timeout = 30000;
    const intervalId = setInterval(() => {
      this.setState( prevstate => ({
        time: prevstate.time - 1
      }));
      const { time } = this.state;
      if(time <= 0) {
        // desabilita os btns e habilita o next
        this.setState({timeout: true, isAnswered: true});
        clearInterval(intervalId);
        
      }
    }, interval)
      
   setTimeout(() => {
    clearInterval(intervalId)
    this.setState({timeout: true, isAnswered: true,})
   },timeout ) 
  }
  
  requestQuestions = async ()  => {
    this.setState({isLoading: true});
    const erroRequisition = 3;
    const successRequest = 0;
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const URL_TRIVIA_API = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const res = await fetch(URL_TRIVIA_API);
    const data = await res.json();
    if (data.response_code === erroRequisition) {
      localStorage.removeItem('token');
      history.push('/');
    }
    console.log(data);
    
    const { indice } = this.state;
    if (data.response_code === successRequest) {
      this.setState({questions: data.results, isLoading: false, });
      console.log(indice);
      const answers = [...data.results[indice].incorrect_answers,
      data.results[indice].correct_answer];
      const mutiplier = 0.5;
      const shuffledAnswers = [...answers]
      .sort(() => Math.random() - mutiplier);
      this.setState({ shuffledAnswers });
    }
    this.time();
  };
  
  savedRanking = () => {
    const { history, score, name, email, assertions } = this.props;
    const hash = md5(email).toString();
    const imgGrav = `https://www.gravatar.com/avatar/${hash}`;
    const infos = {
      score,
      name,
      imgGrav,
      assertions,
    };
    const recoveredRanking = JSON.parse(localStorage.getItem('ranking'));
    if (!recoveredRanking || recoveredRanking.length === 0) {
      const newRanking = [];
      newRanking.push(infos);
      localStorage.setItem('ranking', JSON.stringify(newRanking));
      history.push('/feedback');
    } else {
      const newRanking = [...recoveredRanking, infos];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
      history.push('/feedback');
    }
  };

  nextQuestion = () => {
    const { indice, questions} = this.state;
    const maxLimit = 4;
    if (indice < questions.length - 1) {
      this.setState({indice: indice + 1});
    }
    if (indice < maxLimit) {
      const answers = [...questions[indice + 1].incorrect_answers,
      questions[indice + 1].correct_answer];
      const mutiplier = 0.5;
      const shuffledAnswers = [...answers]
      .sort(() => Math.random() - mutiplier);
      this.setState({ shuffledAnswers, time: 30});
    }
    this.setState({wrong: 'default', correct: 'default', isAnswered: false, timeout: false});
    this.time();
    if (maxLimit === indice) {
      this.savedRanking();
    }
  };

  toggleColor = (question, answer) => {
    this.setState({ wrong: 'wrong', correct: 'correct', isAnswered: true });
    const { time, isAnswered } = this.state;
    const { dispatch } = this.props;
    const ONE = 1;
    const TWO = 2;
    const THREE = 3;
    const TEN = 10;
    const questionValue = (difficulty) => {
      switch (difficulty) {
      case 'easy':
        return ONE;
      case 'medium':
        return TWO;
      case 'hard':
        return THREE;
      default:
        return 0;
      }
    };
    const answerMulti = questionValue(question.difficulty);
    if (question.correct_answer === answer && isAnswered === false) {
      const questionScore = TEN + (answerMulti * time);
      dispatch(setScore(questionScore));
    }
  };

  render() {
    const { questions, isLoading, indice, correct, wrong, isAnswered, time, timeout, shuffledAnswers } = this.state;

    return (
      
      <div className="page-game">
        <Header />

          <div className="container-quiz">
            <div className="time-container">
              <img src={quiz} alt="img logo quiz" />
              <h5>{`Time left: ${time}`}</h5>
              { isAnswered && <button type="button" onClick={this.nextQuestion}>{indice === 4? 'See result' : 'next question'}</button>}
            </div>

            <div className="question">
              { isLoading ? <h5> Loading...</h5> : questions && (
                <div>
                <h5 className="categoria" data-testid="question-category">{`Category: ${questions.length > 0 && questions[indice].category}`}</h5>
                <h5 className="pergunta" data-testid="question-text">{questions.length > 0 && questions[indice].question}</h5>
              
                  {shuffledAnswers.length > 0 && shuffledAnswers.map((answer, index) => (
                    <div className="btn-answer" data-testid="answer-options" key={index}>
                      {
                        <button
                        onClick={ () => this.toggleColor(questions[indice], answer) }
                        disabled={ timeout }
                        className={questions[indice].correct_answer === answer ? correct : wrong }
                        type="button"
                        data-testid={questions[indice].correct_answer === answer ? "correct-answer" : `wrong-answer-${index}`}
                        >{answer}
                        </button>}
                    </div>
                  ))}
                
              </div>
                        )}
            </div>

          </div>

      </div>

    );
  }
};

const mapStateToProps = (batata) => ({
  assertions: batata.player.assertions,
  score: batata.player.score,
  email: batata.player.email,
  name: batata.player.name,
});

export default connect(mapStateToProps)(Game);
