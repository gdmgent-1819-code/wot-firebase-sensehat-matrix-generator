import React, { Component } from 'react';

/*
Libraries
*/
import { Provider } from 'react-redux';

/*
State management via Redux
*/
import store from '../../store';


import logo from '../../assets/logo.svg';
import './App.css';

import LedMatrix from '../led-matrix';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <LedMatrix nCols="8" nRows="8"></LedMatrix>
        </div>
      </Provider>
    );
  }
}

export default App;
