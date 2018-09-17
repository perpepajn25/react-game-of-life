import React, { Component } from 'react';
import Board from './components/Board'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className='banner'>
          <h1> Game of life </h1>
        </div>
        <Board />
      </div>
    );
  }
}

export default App;
