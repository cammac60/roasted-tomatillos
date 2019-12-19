import React from 'react';
import './App.scss';
import MoviesContainer from '../../containers/MoviesContainer/MoviesContainer';
import Header from '../Header/Header.js';
import Login from '../../containers/Login/Login';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route exact path='/' render={() =>
        <>
          <Header />
          <MoviesContainer />
        </>
      }/>
      <Route path="/login" render={() => <Login />}/>
    </div>
  );
}

export default App;
