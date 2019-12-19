import React from 'react';
import './App.scss';
import MoviesContainer from '../../containers/MoviesContainer/MoviesContainer';
import Header from '../Header/Header.js';
import MovieInfoComponent from '../MovieInfoComponent/MovieInfoComponent';
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
      <Route path="/login" render={() => <div color="white">Temporary text</div>}/>
      <Route path="/movies/:id" render={( { match } ) => <MovieInfoComponent id={match.params.id}></MovieInfoComponent>}/>
    </div>
  );
}

export default App;
