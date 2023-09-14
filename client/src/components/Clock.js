import React, { Component } from 'react';

class LiveClock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: this.getCurrentTime(),
    };
  }

  componentDidMount() {
    // Update the clock every second (1000 milliseconds)
    this.intervalID = setInterval(() => {
      this.setState({ time: this.getCurrentTime() });
    }, 1000);
  }

  componentWillUnmount() {
    // Clear the interval when the component is unmounted
    clearInterval(this.intervalID);
  }

  getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    let period = 'AM';

    if (hours >= 12) {
      period = 'PM';
      if (hours > 12) {
        hours -= 12;
      }
    }

    const formattedHours = hours.toString().padStart(2, '0');

    return `${formattedHours}:${minutes}:${seconds} ${period}`;
  }

  render() {
    return (
      <div id="clock">
        {this.state.time}
       </div>
    );
  }
}

export default LiveClock;
