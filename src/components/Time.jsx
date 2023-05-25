import React from 'react';

class Timer extends React.Component {
    state = {
      seconds: 30
    };
  
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(prevState => ({
        seconds: prevState.seconds - 1
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidUpdate() {
    if (this.state.seconds === 0) {
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <div>
        <h1>Timer: {this.state.seconds}</h1>
      </div>
    );
  }
}

export default Timer;


// timer = () => {
//   const initialInterval = 1000;
//   const setTimer = 30000;

//   const intervalId = setInterval(() => {
//     this.setState((prevState) => ({
//       initalTime: prevState.initalTime - 1,
//     }));
//     const { initalTime } = this.state;
//     if (initalTime <= 0) {
//       clearInterval(intervalId);
//     }
//   }, initialInterval);

//   setTimeout(() => {
//     clearInterval(intervalId);
//   }, setTimer);
// };