import React from 'react';
import './App.scss';
import MoviesContainer from '../../containers/MoviesContainer/MoviesContainer';
import Header from '../Header/Header.js';

function App() {
  return (
    <div className="App">
      <Header />
      <MoviesContainer />
    </div>
  );
}

export default App;
