import React from 'react';
import './App.scss';
import MoviesContainer from '../../containers/MoviesContainer/MoviesContainer';
import Header from '../Header/Header.js';
import { Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route exact path='/' render={() =>
        <>
          <Header />
          <MoviesContainer />
        </>
      }/>
    </div>
  );
}

export default App;
